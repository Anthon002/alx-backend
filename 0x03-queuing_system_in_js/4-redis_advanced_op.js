#!/usr/bin/yarn dev
import { createClient, print } from 'redis';

var clientObj = createClient();

clientObj.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.toString());
});

function updateHash(hashName, fieldName, fieldValue){
  clientObj.HSET(hashName, fieldName, fieldValue, print);
};

function printHash(hashName){
  clientObj.HGETALL(hashName, (_err, reply) => console.log(reply));
};

function main() {
  var hashObj = {
    Portland: 50,
    Seattle: 80,
    'New York': 20,
    Bogota: 20,
    Cali: 40,
    Paris: 2,
  };
  for (var [field, value] of Object.entries(hashObj)) {
    updateHash('HolbertonSchools', field, value);
  }
  printHash('HolbertonSchools');
}

clientObj.on('connect', () => {
  console.log('Redis client connected to the server');
  main();
});
