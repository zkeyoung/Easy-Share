import crypto from 'node:crypto';
import os from 'node:os';


function randomString(len: number) {
  const literal = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
  let res = '';
  for (let i = 0; i < len; i++) {
    res += literal[crypto.randomInt(literal.length)];
  }
  return res;
}

function getServerAddress() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (const identity in interfaces) {
    const networks = interfaces[identity];
    networks.forEach(network => {
      if (network.family === 'IPv4' && !network.internal) {
        addresses.push(network.address);
      }
    });
  }
  return addresses;
}

export {
  randomString,
  getServerAddress,
};