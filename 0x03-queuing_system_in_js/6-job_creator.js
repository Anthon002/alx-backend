#!/usr/bin/yarn dev
import { createQueue } from 'kue';

var queue = createQueue({name: 'push_notification_code'});
var job = queue.create('push_notification_code', {
  phoneNumber: '07045679939',
  message: 'Account registered',
});
job
  .on('enqueue', () => {
    console.log('Notification job created:', job.id);
  })
  .on('complete', () => {
    console.log('Notification job completed');
  })
  .on('failed attempt', () => {
    console.log('Notification job failed');
  });
job.save();
