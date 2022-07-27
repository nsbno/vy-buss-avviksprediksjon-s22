// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const NotificationType = {
  "ACCIDENT": "ACCIDENT",
  "TRAFFICK": "TRAFFICK",
  "LATELOGIN": "LATELOGIN"
};

const Status = {
  "UNHANDLED": "UNHANDLED",
  "HANDLED": "HANDLED"
};

const { Notification, Varsel } = initSchema(schema);

export {
  Notification,
  Varsel,
  NotificationType,
  Status
};