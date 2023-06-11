require('dotenv').config();
export const { ENVIRONMENT, SLACK_API_URL, SLACK_API_TOKEN } = process.env;
export const HTTP_TIMEOUT = +process.env.HTTP_TIMEOUT || 10000;
export const PROVIDERS = {
  SLACK: 'Slack',
};
