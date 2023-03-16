import { networkInterfaces, os } from '../mocks/os';
jest.mock('node:os', () => os);
import { randomString, getServerAddress } from '../../src/lib/utils';

describe('randomString()', () => {

  it('should return spec length string', () => {
    const str = randomString(6);
    expect(typeof str).toBe('string');
    expect(str).toHaveLength(6);
    expect(str).toMatch(/^[0-9a-zA-Z]{6}$/);
  });

});

describe('getServerAddress()', () => {
  
  const os: { networkInterfaces: jest.Mock } = require('node:os');
  it('should return spec ip array', () => {
    const addresses: string[] = getServerAddress();
    expect(addresses instanceof Array).toBe(true);
    expect(addresses[0]).toBe(networkInterfaces.eth0[0].address);
  });

  it('should return enmpty array', () => {
    os.networkInterfaces.mockReturnValueOnce({});
    const addresses: string[] = getServerAddress();
    expect(addresses.length).toBe(0);
  });

});