import { utils } from '../mocks/utils';
jest.mock('../../src/lib/utils', () => utils);
import { getIntranet } from '../../src/ipc/net';

describe('getIntranet()', () => {
  it('success', async () => {
    const ips = ['192.168.1.1', '192.168.2.1'];
    utils.getServerAddress.mockReturnValue(ips);
    const { code, msg, data: addresses } = await getIntranet();
    expect(code).toBe(0);
    expect(typeof msg).toBe('string');
    expect(addresses).toEqual(ips);
  });
});