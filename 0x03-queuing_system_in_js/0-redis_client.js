#!/usr/bin/yarn dev
import { createclientObj } from 'redis';

var clientObj = createclientObj();

clientObj.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.toString());
});

clientObj.on('connect', () => {
  console.log('Redis client connected to the server');
});
