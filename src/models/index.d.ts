import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum NotificationType {
  ACCIDENT = "ACCIDENT",
  TRAFFICK = "TRAFFICK",
  LATELOGIN = "LATELOGIN"
}

export enum Status {
  UNHANDLED = "UNHANDLED",
  HANDLED = "HANDLED"
}



type NotificationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type VarselMetaData = {
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
  readonly status?: Status | keyof typeof Status | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Notification, NotificationMetaData>);
  static copyOf(source: Notification, mutator: (draft: MutableModel<Notification, NotificationMetaData>) => MutableModel<Notification, NotificationMetaData> | void): Notification;
}

export declare class Varsel {
  readonly id: string;
  readonly type?: NotificationType | keyof typeof NotificationType | null;
  readonly vehicleId: string;
  readonly blockId: string;
  readonly tripRouteNumber: string;
  readonly plannedArrival: string;
  readonly estimatedArrival: string;
  readonly estimatedDelay: number;
  readonly status?: Status | keyof typeof Status | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Varsel, VarselMetaData>);
  static copyOf(source: Varsel, mutator: (draft: MutableModel<Varsel, VarselMetaData>) => MutableModel<Varsel, VarselMetaData> | void): Varsel;
}