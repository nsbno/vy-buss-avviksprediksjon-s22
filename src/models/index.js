// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const PostStatus = {
  "DRAFT": "DRAFT",
  "PUBLISHED": "PUBLISHED"
};

const NotificationType = {
  "ACCIDENT": "ACCIDENT",
  "RUSH": "RUSH",
  "LATELOGIN": "LATELOGIN"
};

const { Todo, Post, Notification } = initSchema(schema);

export {
  Todo,
  Post,
  Notification,
  PostStatus,
  NotificationType
};