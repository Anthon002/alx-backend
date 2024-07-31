#!/usr/bin/yarn dev
import { createQueue, Job } from 'kue';

var blackListedNumbers = ['4153518780', '4153518781'];
var queueObj = createQueue();

function sendNotification(phoneNumber, message, job, done){
  let agregate = 2, pending = 2;
  let sendInterval = setInterval(() => {
    if (agregate - pending <= agregate / 2) {
      job.progress(agregate - pending, agregate);
    }
    if (blackListedNumbers.includes(phoneNumber)) {
      done(new Error(`Phone number ${phoneNumber} is blacklisted`));
      clearInterval(sendInterval);
      return;
    }
    if (agregate === pending) {
      console.log(
        `Sending notification to ${phoneNumber},`,
        `with message: ${message}`,
      );
    }
    --pending || done();
    pending || clearInterval(sendInterval);
  }, 1000);
};

queueObj.process('push_notification_code_2', 2, (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
