/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateNotificationInput = {
  id?: string | null,
  type?: NotificationType | null,
  vehicleNumber: string,
  tripRouteNumber: string,
  estimatedDelay: string,
  estimatedArrival: string,
  _version?: number | null,
};

export enum NotificationType {
  ACCIDENT = "ACCIDENT",
  RUSH = "RUSH",
  LATELOGIN = "LATELOGIN",
}


export type ModelNotificationConditionInput = {
  type?: ModelNotificationTypeInput | null,
  vehicleNumber?: ModelStringInput | null,
  tripRouteNumber?: ModelStringInput | null,
  estimatedDelay?: ModelStringInput | null,
  estimatedArrival?: ModelStringInput | null,
  and?: Array< ModelNotificationConditionInput | null > | null,
  or?: Array< ModelNotificationConditionInput | null > | null,
  not?: ModelNotificationConditionInput | null,
};

export type ModelNotificationTypeInput = {
  eq?: NotificationType | null,
  ne?: NotificationType | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Notification = {
  __typename: "Notification",
  id: string,
  type?: NotificationType | null,
  vehicleNumber: string,
  tripRouteNumber: string,
  estimatedDelay: string,
  estimatedArrival: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateNotificationInput = {
  id: string,
  type?: NotificationType | null,
  vehicleNumber?: string | null,
  tripRouteNumber?: string | null,
  estimatedDelay?: string | null,
  estimatedArrival?: string | null,
  _version?: number | null,
};

export type DeleteNotificationInput = {
  id: string,
  _version?: number | null,
};

export type ModelNotificationFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelNotificationTypeInput | null,
  vehicleNumber?: ModelStringInput | null,
  tripRouteNumber?: ModelStringInput | null,
  estimatedDelay?: ModelStringInput | null,
  estimatedArrival?: ModelStringInput | null,
  and?: Array< ModelNotificationFilterInput | null > | null,
  or?: Array< ModelNotificationFilterInput | null > | null,
  not?: ModelNotificationFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelNotificationConnection = {
  __typename: "ModelNotificationConnection",
  items:  Array<Notification | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type CreateNotificationMutationVariables = {
  input: CreateNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type CreateNotificationMutation = {
  createNotification?:  {
    __typename: "Notification",
    id: string,
    type?: NotificationType | null,
    vehicleNumber: string,
    tripRouteNumber: string,
    estimatedDelay: string,
    estimatedArrival: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateNotificationMutationVariables = {
  input: UpdateNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type UpdateNotificationMutation = {
  updateNotification?:  {
    __typename: "Notification",
    id: string,
    type?: NotificationType | null,
    vehicleNumber: string,
    tripRouteNumber: string,
    estimatedDelay: string,
    estimatedArrival: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteNotificationMutationVariables = {
  input: DeleteNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type DeleteNotificationMutation = {
  deleteNotification?:  {
    __typename: "Notification",
    id: string,
    type?: NotificationType | null,
    vehicleNumber: string,
    tripRouteNumber: string,
    estimatedDelay: string,
    estimatedArrival: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetNotificationQueryVariables = {
  id: string,
};

export type GetNotificationQuery = {
  getNotification?:  {
    __typename: "Notification",
    id: string,
    type?: NotificationType | null,
    vehicleNumber: string,
    tripRouteNumber: string,
    estimatedDelay: string,
    estimatedArrival: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListNotificationsQueryVariables = {
  filter?: ModelNotificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNotificationsQuery = {
  listNotifications?:  {
    __typename: "ModelNotificationConnection",
    items:  Array< {
      __typename: "Notification",
      id: string,
      type?: NotificationType | null,
      vehicleNumber: string,
      tripRouteNumber: string,
      estimatedDelay: string,
      estimatedArrival: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncNotificationsQueryVariables = {
  filter?: ModelNotificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncNotificationsQuery = {
  syncNotifications?:  {
    __typename: "ModelNotificationConnection",
    items:  Array< {
      __typename: "Notification",
      id: string,
      type?: NotificationType | null,
      vehicleNumber: string,
      tripRouteNumber: string,
      estimatedDelay: string,
      estimatedArrival: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type CreatedNotificationSubscription = {
  createdNotification?:  {
    __typename: "Notification",
    id: string,
    type?: NotificationType | null,
    vehicleNumber: string,
    tripRouteNumber: string,
    estimatedDelay: string,
    estimatedArrival: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeletedNotificationSubscription = {
  deletedNotification?:  {
    __typename: "Notification",
    id: string,
    type?: NotificationType | null,
    vehicleNumber: string,
    tripRouteNumber: string,
    estimatedDelay: string,
    estimatedArrival: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdatedNotificationSubscription = {
  updatedNotification?:  {
    __typename: "Notification",
    id: string,
    type?: NotificationType | null,
    vehicleNumber: string,
    tripRouteNumber: string,
    estimatedDelay: string,
    estimatedArrival: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateNotificationSubscription = {
  onCreateNotification?:  {
    __typename: "Notification",
    id: string,
    type?: NotificationType | null,
    vehicleNumber: string,
    tripRouteNumber: string,
    estimatedDelay: string,
    estimatedArrival: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateNotificationSubscription = {
  onUpdateNotification?:  {
    __typename: "Notification",
    id: string,
    type?: NotificationType | null,
    vehicleNumber: string,
    tripRouteNumber: string,
    estimatedDelay: string,
    estimatedArrival: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteNotificationSubscription = {
  onDeleteNotification?:  {
    __typename: "Notification",
    id: string,
    type?: NotificationType | null,
    vehicleNumber: string,
    tripRouteNumber: string,
    estimatedDelay: string,
    estimatedArrival: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
