import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum NotificationType {
  ACCIDENT = "ACCIDENT",
  TRAFFICK = "TRAFFICK",
  LATELOGIN = "LATELOGIN"
}



type NotificationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Notification {
  readonly id: string;
  readonly type?: NotificationType | keyof typeof NotificationType | null;
  readonly vehicleNumber: string;
  readonly blockNumber: string;
  readonly tripRouteNumber: string;
  readonly tripRouteName: string;
  readonly plannedArrival: string;
  readonly estimatedArrival: string;
  readonly estimatedDelay: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Notification, NotificationMetaData>);
  static copyOf(source: Notification, mutator: (draft: MutableModel<Notification, NotificationMetaData>) => MutableModel<Notification, NotificationMetaData> | void): Notification;
}