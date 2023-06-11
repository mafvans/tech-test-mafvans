import { LoggerInput } from '@application/ports';
import { LoggerClientAdapter } from '@infra/adapters/logger/logger-client.adapter';
import { LoggerProvider } from '@infra/adapters/logger';

describe('ADAPTER | Logger Client', () => {
  let logger: LoggerClientAdapter;

  beforeEach(() => {
    logger = new LoggerClientAdapter();
    jest.restoreAllMocks();
  });
  const input: LoggerInput = {
    action: 'GetMessage',
    useCase: 'an useCase',
    msg: '',
  };

  it('Should log info', async () => {
    const spy = jest.spyOn(LoggerProvider.prototype, 'log');
    logger.info(input);
    expect(spy).toBeCalledWith(input);
  });

  it('Should log warn', async () => {
    const spy = jest.spyOn(LoggerProvider.prototype, 'warn');
    logger.warn(input);
    expect(spy).toBeCalledWith(input);
  });

  it('Should log error', async () => {
    const spy = jest.spyOn(LoggerProvider.prototype, 'error');
    logger.error(input);
    expect(spy).toBeCalledWith(input);
  });
});
