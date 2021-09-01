import { Status } from './types';

export const STATUS_NAME = {
  TODO: '할 것',
  IN_PROGRESS: '진행중인것',
  DONE: '다한 것',
};

export const listOfStatus = [
  STATUS_NAME[Status.TODO],
  STATUS_NAME[Status.IN_PROGRESS],
  STATUS_NAME[Status.DONE],
];
