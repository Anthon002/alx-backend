#!/usr/bin/yarn dev
import { createClient, print } from 'redis';

var clientObj = createClient();

clientObj.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.toString());
});

clientObj.on('connect', () => {
  console.log('Redis client connected to the server');
});

var setNewSchool = (schoolName, value) => {
  clientObj.SET(schoolName, value, print);
};

var displaySchoolValue = (schoolName) => {
  clientObj.GET(schoolName, (_err, reply) => {
    console.log(reply);
  });
};

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
