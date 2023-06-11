import {
  CacheClientPort,
  LoggerClientPort,
  MessageRepositoryPort,
} from '@application/ports';
import { SlackApiPort } from '@application/ports/slack-api.port';

export const loggerClientPortMock = {} as LoggerClientPort;
loggerClientPortMock.error = jest.fn();
loggerClientPortMock.info = jest.fn();
loggerClientPortMock.warn = jest.fn();

export const cacheClientPortMock = {} as CacheClientPort;
cacheClientPortMock.get = jest.fn();
cacheClientPortMock.set = jest.fn();

export const slackApiPortMock = {} as SlackApiPort;
slackApiPortMock.getMessage = jest.fn();
slackApiPortMock.attachFile = jest.fn();
slackApiPortMock.sendMessage = jest.fn();

export const messageRepositoryPort = {} as MessageRepositoryPort;
messageRepositoryPort.add = jest.fn();
