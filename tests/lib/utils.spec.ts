jest.mock('node:os', () => ({
  networkInterfaces: jest.fn(),
}));
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
    const networkInterfaces = {
      lo: [
        {
          address: '127.0.0.1',
          netmask: '255.0.0.0',
          family: 'IPv4',
          mac: '00:00:00:00:00:00',
          internal: true,
          cidr: '127.0.0.1/8'
        },
        {
          address: '::1',
          netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
          family: 'IPv6',
          mac: '00:00:00:00:00:00',
          scopeid: 0,
          internal: true,
          cidr: '::1/128'
        }
      ],
      eth0: [
        {
          address: '192.168.1.108',
          netmask: '255.255.255.0',
          family: 'IPv4',
          mac: '01:02:03:0a:0b:0c',
          internal: false,
          cidr: '192.168.1.108/24'
        },
        {
          address: 'fe80::a00:27ff:fe4e:66a1',
          netmask: 'ffff:ffff:ffff:ffff::',
          family: 'IPv6',
          mac: '01:02:03:0a:0b:0c',
          scopeid: 1,
          internal: false,
          cidr: 'fe80::a00:27ff:fe4e:66a1/64'
        }
      ]
    };
    os.networkInterfaces.mockReturnValueOnce(networkInterfaces);
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