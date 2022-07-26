// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const NotificationType = {
  "ACCIDENT": "ACCIDENT",
  "TRAFFICK": "TRAFFICK",
  "LATELOGIN": "LATELOGIN"
};

const { Notification } = initSchema(schema);

export {
  Notification,
  NotificationType
};