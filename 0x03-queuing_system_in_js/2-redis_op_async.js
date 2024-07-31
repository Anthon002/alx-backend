#!/usr/bin/yarn dev
import { promisify } from 'util';
import { createClient, print } from 'redis';

var clientObj = createClient();

clientObj.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.toString());
});

function setNewSchool(schoolName, value){
  clientObj.SET(schoolName, value, print);
};

var displaySchoolValue = async (schoolName) => {
  console.log(await promisify(clientObj.GET).bind(clientObj)(schoolName));
};

async function main() {
  await displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
}

clientObj.on('connect', async () => {
  console.log('Redis client connected to the server');
  await main();
});
