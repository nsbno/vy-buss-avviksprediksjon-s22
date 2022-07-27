import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type NotificationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Notification {
  readonly id: string;
  readonly type?: string | null;
  readonly vehicleId?: number | null;
  readonly blockId?: number | null;
  readonly tripRouteId?: number | null;
  readonly tripRouteName?: string | null;
  readonly plannedArrival?: string | null;
  readonly estimatedArrival?: string | null;
  readonly estimatedDelay?: number | null;
  readonly status?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Notification, NotificationMetaData>);
  static copyOf(source: Notification, mutator: (draft: MutableModel<Notification, NotificationMetaData>) => MutableModel<Notification, NotificationMetaData> | void): Notification;
}