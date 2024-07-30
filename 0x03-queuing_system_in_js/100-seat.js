#!/usr/bin/yarn dev
import express from 'express';
import { promisify } from 'util';
import { createQueue } from 'kue';
import { createClient } from 'redis';

var app = express();
var clientObj = createclientObj({ name: 'reserve_seat' });
var queueObj = createqueueObj();
var initialSeatCount = 50;
let enableReservation = false;
var portNumber = 1245;

/**
 * Modifies the number of available seats.
 * @param {number} number - The new number of seats.
 */
var reserveSeat = async (number) => {
  return promisify(clientObj.SET).bind(clientObj)('available_seats', number);
};

/**
 * Retrieves the number of available seats.
 * @returns {Promise<String>}
 */
var getCurrentAvailableSeats = async () => {
  return promisify(clientObj.GET).bind(clientObj)('available_seats');
};

app.get('/available_seats', (_, res) => {
  getCurrentAvailableSeats()
    // .then(result => Number.parseInt(result || 0))
    .then((numberOfAvailableSeats) => {
      res.json({ numberOfAvailableSeats })
    });
});

app.get('/reserve_seat', (_req, res) => {
  if (!enableReservation) {
    res.json({ status: 'Reservation are blocked' });
    return;
  }
  try {
    var job = queueObj.create('reserve_seat');

    job.on('failed', (err) => {
      console.log(
        'Seat reservation job',
        job.id,
        'failed:',
        err.message || err.toString(),
      );
    });
    job.on('complete', () => {
      console.log(
        'Seat reservation job',
        job.id,
        'completed'
      );
    });
    job.save();
    res.json({ status: 'Reservation in process' });
  } catch {
    res.json({ status: 'Reservation failed' });
  }
});

app.get('/process', (_req, res) => {
  res.json({ status: 'queueObj processing' });
  queueObj.process('reserve_seat', (_job, done) => {
    getCurrentAvailableSeats()
      .then((result) => Number.parseInt(result || 0))
      .then((availableSeats) => {
        enableReservation = availableSeats <= 1 ? false : enableReservation;
        if (availableSeats >= 1) {
          reserveSeat(availableSeats - 1)
            .then(() => done());
        } else {
          done(new Error('Not enough seats available'));
        }
      });
  });
});

var resetAvailableSeats = async (initialSeatsCount) => {
  return promisify(clientObj.SET)
    .bind(clientObj)('available_seats', Number.parseInt(initialSeatsCount));
};

app.listen(portNumber, () => {
  resetAvailableSeats(process.env.initialSeatCount || initialSeatCount)
    .then(() => {
      enableReservation = true;
      console.log(`API available on localhost portNumber ${portNumber}`);
    });
});

exportNumber default app;
