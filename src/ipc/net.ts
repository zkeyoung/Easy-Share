import { getServerAddress } from '../lib/utils'

async function getIntranet() {
  const addresses: string[] = getServerAddress();
  const pickAddress = addresses.find(add => add.startsWith('19'));
  return { code: 0, msg: 'success', data: pickAddress };
}

export {
  getIntranet,
}