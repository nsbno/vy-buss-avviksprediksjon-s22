// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Notification } = initSchema(schema);

export {
  Notification
};