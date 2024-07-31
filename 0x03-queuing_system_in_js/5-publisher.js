#!/usr/bin/yarn dev
import { create } from 'redis';

var clientObj = createclientObj();

clientObj.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.toString());
});

function publishMessage(message, time){
  setTimeout(() => {
    console.log(`About to send ${message}`);
    clientObj.publish('holberton school channel', message);
  }, time);
};

clientObj.on('connect', () => {
  console.log('Redis clientObj connected to the server');
});

publishMessage('Holberton Student #1 starts course', 100);
publishMessage('Holberton Student #2 starts course', 200);
publishMessage('KILL_SERVER', 300);
publishMessage('Holberton Student #3 starts course', 400);
