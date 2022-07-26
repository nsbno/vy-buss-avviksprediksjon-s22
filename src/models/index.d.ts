import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum NotificationType {
  ACCIDENT = "ACCIDENT",
  RUSH = "RUSH",
  LATELOGIN = "LATELOGIN"
}



type NotificationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Notification {
  readonly id: string;
  readonly type?: NotificationType | keyof typeof NotificationType | null;
  readonly vehicleNumber: string;
  readonly tripRouteNumber: string;
  readonly estimatedDelay: string;
  readonly estimatedArrival: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Notification, NotificationMetaData>);
  static copyOf(source: Notification, mutator: (draft: MutableModel<Notification, NotificationMetaData>) => MutableModel<Notification, NotificationMetaData> | void): Notification;
}