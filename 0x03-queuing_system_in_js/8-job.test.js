#!/usr/bin/yarn test
import sinon from 'sinon';
import { expect } from 'chai';
import { createQueue } from 'kue';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
  var _spy = sinon.spy(console);
  var queueObj = createQueue({ name: 'push_notification_code_test' });

  before(() => {
    queueObj.testMode.enter(true);
  });

  after(() => {
    queueObj.testMode.clear();
    queueObj.testMode.exit();
  });

  afterEach(() => {
    _spy.log.resetHistory();
  });

  it('displays an error message if jobs is not an array', () => {
    expect(
      createPushNotificationsJobs.bind(createPushNotificationsJobs, {}, queueObj)
    ).to.throw('Jobs is not an array');
  });

  it('adds jobs to the queueObj with the correct type', (done) => {
    expect(queueObj.testMode.jobs.length).to.equal(0);
    var jobInfos = [
      {
        phoneNumber: '44556677889',
        message: 'Use the code 1982 to verify your account',
      },
      {
        phoneNumber: '98877665544',
        message: 'Use the code 1738 to verify your account',
      },
    ];
    createPushNotificationsJobs(jobInfos, queueObj);
    expect(queueObj.testMode.jobs.length).to.equal(2);
    expect(queueObj.testMode.jobs[0].data).to.deep.equal(jobInfos[0]);
    expect(queueObj.testMode.jobs[0].type).to.equal('push_notification_code_3');
    queueObj.process('push_notification_code_3', () => {
      expect(
        _spy.log
          .calledWith('Notification job created:', queueObj.testMode.jobs[0].id)
      ).to.be.true;
      done();
    });
  });

  it('registers the progress event handler for a job', (done) => {
    queueObj.testMode.jobs[0].addListener('progress', () => {
      expect(
        _spy.log
          .calledWith('Notification job', queueObj.testMode.jobs[0].id, '25% complete')
      ).to.be.true;
      done();
    });
    queueObj.testMode.jobs[0].emit('progress', 25);
  });

  it('registers the failed event handler for a job', (done) => {
    queueObj.testMode.jobs[0].addListener('failed', () => {
      expect(
        _spy.log
          .calledWith('Notification job', queueObj.testMode.jobs[0].id, 'failed:', 'Failed to send')
      ).to.be.true;
      done();
    });
    queueObj.testMode.jobs[0].emit('failed', new Error('Failed to send'));
  });

  it('registers the complete event handler for a job', (done) => {
    queueObj.testMode.jobs[0].addListener('complete', () => {
      expect(
        _spy.log
          .calledWith('Notification job', queueObj.testMode.jobs[0].id, 'completed')
      ).to.be.true;
      done();
    });
    queueObj.testMode.jobs[0].emit('complete');
  });
});
