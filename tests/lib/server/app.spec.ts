import { express, createApplication } from '../../mocks/server/app';
import { response } from '../../mocks/server/res';

jest.mock('express', () => createApplication);
const router = jest.fn();
jest.mock('../../../src/lib/server/router', () => router);

import '../../../src/lib/server/app';

describe('run', () => {
  it('success', () => {
    express.run();
    expect(router).toHaveBeenCalled();
    expect(response.sendStatus).toHaveBeenCalled();
  });
});