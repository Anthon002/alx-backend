#!/usr/bin/yarn dev
import { createClient } from 'redis';

var clientObj = createClient();
var EXIT_MSG = 'KILL_SERVER';

clientObj.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.toString());
});

clientObj.on('connect', () => {
  console.log('Redis client connected to the server');
});

clientObj.subscribe('holberton school channel');

clientObj.on('message', (_err, msg) => {
  console.log(msg);
  if (msg === EXIT_MSG) {
    clientObj.unsubscribe();
    clientObj.quit();
  }
});
