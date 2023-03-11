import { getServerAddress } from '../lib/utils'

async function getIntranet() {
  const addresses: string[] = getServerAddress();
  return { code: 0, msg: 'success', data: addresses };
}

export {
  getIntranet,
}