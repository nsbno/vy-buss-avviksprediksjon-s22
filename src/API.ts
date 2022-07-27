/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateNotificationInput = {
  id?: string | null,
  type?: NotificationType | null,
  vehicleNumber: string,
  blockNumber: string,
  tripRouteNumber: string,
  tripRouteName: string,
  plannedArrival: string,
  estimatedArrival: string,
  estimatedDelay: string,
  status?: Status | null,
  _version?: number | null,
};

export enum NotificationType {
  ACCIDENT = "ACCIDENT",
  TRAFFICK = "TRAFFICK",
  LATELOGIN = "LATELOGIN",
}


export enum Status {
  UNHANDLED = "UNHANDLED",
  HANDLED = "HANDLED",
}


export type ModelNotificationConditionInput = {
  type?: ModelNotificationTypeInput | null,
  vehicleNumber?: ModelStringInput | null,
  blockNumber?: ModelStringInput | null,
  tripRouteNumber?: ModelStringInput | null,
  tripRouteName?: ModelStringInput | null,
  plannedArrival?: ModelStringInput | null,
  estimatedArrival?: ModelStringInput | null,
  estimatedDelay?: ModelStringInput | null,
  status?: ModelStatusInput | null,
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

export type ModelStatusInput = {
  eq?: Status | null,
  ne?: Status | null,
};

export type Notification = {
  __typename: "Notification",
  id: string,
  type?: NotificationType | null,
  vehicleNumber: string,
  blockNumber: string,
  tripRouteNumber: string,
  tripRouteName: string,
  plannedArrival: string,
  estimatedArrival: string,
  estimatedDelay: string,
  status?: Status | null,
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
  blockNumber?: string | null,
  tripRouteNumber?: string | null,
  tripRouteName?: string | null,
  plannedArrival?: string | null,
  estimatedArrival?: string | null,
  estimatedDelay?: string | null,
  status?: Status | null,
  _version?: number | null,
};

export type DeleteNotificationInput = {
  id: string,
  _version?: number | null,
};

export type CreateVarselInput = {
  id?: string | null,
  type?: NotificationType | null,
  vehicleId: string,
  blockId: string,
  tripRouteNumber: string,
  plannedArrival: string,
  estimatedArrival: string,
  estimatedDelay: number,
  status?: Status | null,
  _version?: number | null,
};

export type ModelVarselConditionInput = {
  type?: ModelNotificationTypeInput | null,
  vehicleId?: ModelStringInput | null,
  blockId?: ModelStringInput | null,
  tripRouteNumber?: ModelStringInput | null,
  plannedArrival?: ModelStringInput | null,
  estimatedArrival?: ModelStringInput | null,
  estimatedDelay?: ModelFloatInput | null,
  status?: ModelStatusInput | null,
  and?: Array< ModelVarselConditionInput | null > | null,
  or?: Array< ModelVarselConditionInput | null > | null,
  not?: ModelVarselConditionInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Varsel = {
  __typename: "Varsel",
  id: string,
  type?: NotificationType | null,
  vehicleId: string,
  blockId: string,
  tripRouteNumber: string,
  plannedArrival: string,
  estimatedArrival: string,
  estimatedDelay: number,
  status?: Status | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateVarselInput = {
  id: string,
  type?: NotificationType | null,
  vehicleId?: string | null,
  blockId?: string | null,
  tripRouteNumber?: string | null,
  plannedArrival?: string | null,
  estimatedArrival?: string | null,
  estimatedDelay?: number | null,
  status?: Status | null,
  _version?: number | null,
};

export type DeleteVarselInput = {
  id: string,
  _version?: number | null,
};

export type ModelNotificationFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelNotificationTypeInput | null,
  vehicleNumber?: ModelStringInput | null,
  blockNumber?: ModelStringInput | null,
  tripRouteNumber?: ModelStringInput | null,
  tripRouteName?: ModelStringInput | null,
  plannedArrival?: ModelStringInput | null,
  estimatedArrival?: ModelStringInput | null,
  estimatedDelay?: ModelStringInput | null,
  status?: ModelStatusInput | null,
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

export type ModelVarselFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelNotificationTypeInput | null,
  vehicleId?: ModelStringInput | null,
  blockId?: ModelStringInput | null,
  tripRouteNumber?: ModelStringInput | null,
  plannedArrival?: ModelStringInput | null,
  estimatedArrival?: ModelStringInput | null,
  estimatedDelay?: ModelFloatInput | null,
  status?: ModelStatusInput | null,
  and?: Array< ModelVarselFilterInput | null > | null,
  or?: Array< ModelVarselFilterInput | null > | null,
  not?: ModelVarselFilterInput | null,
};

export type ModelVarselConnection = {
  __typename: "ModelVarselConnection",
  items:  Array<Varsel | null >,
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
    blockNumber: string,
    tripRouteNumber: string,
    tripRouteName: string,
    plannedArrival: string,
    estimatedArrival: string,
    estimatedDelay: string,
    status?: Status | null,
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
    blockNumber: string,
    tripRouteNumber: string,
    tripRouteName: string,
    plannedArrival: string,
    estimatedArrival: string,
    estimatedDelay: string,
    status?: Status | null,
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
    blockNumber: string,
    tripRouteNumber: string,
    tripRouteName: string,
    plannedArrival: string,
    estimatedArrival: string,
    estimatedDelay: string,
    status?: Status | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateVarselMutationVariables = {
  input: CreateVarselInput,
  condition?: ModelVarselConditionInput | null,
};

export type CreateVarselMutation = {
  createVarsel?:  {
    __typename: "Varsel",
    id: string,
    type?: NotificationType | null,
    vehicleId: string,
    blockId: string,
    tripRouteNumber: string,
    plannedArrival: string,
    estimatedArrival: string,
    estimatedDelay: number,
    status?: Status | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateVarselMutationVariables = {
  input: UpdateVarselInput,
  condition?: ModelVarselConditionInput | null,
};

export type UpdateVarselMutation = {
  updateVarsel?:  {
    __typename: "Varsel",
    id: string,
    type?: NotificationType | null,
    vehicleId: string,
    blockId: string,
    tripRouteNumber: string,
    plannedArrival: string,
    estimatedArrival: string,
    estimatedDelay: number,
    status?: Status | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteVarselMutationVariables = {
  input: DeleteVarselInput,
  condition?: ModelVarselConditionInput | null,
};

export type DeleteVarselMutation = {
  deleteVarsel?:  {
    __typename: "Varsel",
    id: string,
    type?: NotificationType | null,
    vehicleId: string,
    blockId: string,
    tripRouteNumber: string,
    plannedArrival: string,
    estimatedArrival: string,
    estimatedDelay: number,
    status?: Status | null,
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
    blockNumber: string,
    tripRouteNumber: string,
    tripRouteName: string,
    plannedArrival: string,
    estimatedArrival: string,
    estimatedDelay: string,
    status?: Status | null,
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
      blockNumber: string,
      tripRouteNumber: string,
      tripRouteName: string,
      plannedArrival: string,
      estimatedArrival: string,
      estimatedDelay: string,
      status?: Status | null,
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
      blockNumber: string,
      tripRouteNumber: string,
      tripRouteName: string,
      plannedArrival: string,
      estimatedArrival: string,
      estimatedDelay: string,
      status?: Status | null,
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

export type GetVarselQueryVariables = {
  id: string,
};

export type GetVarselQuery = {
  getVarsel?:  {
    __typename: "Varsel",
    id: string,
    type?: NotificationType | null,
    vehicleId: string,
    blockId: string,
    tripRouteNumber: string,
    plannedArrival: string,
    estimatedArrival: string,
    estimatedDelay: number,
    status?: Status | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListVarselsQueryVariables = {
  filter?: ModelVarselFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListVarselsQuery = {
  listVarsels?:  {
    __typename: "ModelVarselConnection",
    items:  Array< {
      __typename: "Varsel",
      id: string,
      type?: NotificationType | null,
      vehicleId: string,
      blockId: string,
      tripRouteNumber: string,
      plannedArrival: string,
      estimatedArrival: string,
      estimatedDelay: number,
      status?: Status | null,
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

export type SyncVarselsQueryVariables = {
  filter?: ModelVarselFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncVarselsQuery = {
  syncVarsels?:  {
    __typename: "ModelVarselConnection",
    items:  Array< {
      __typename: "Varsel",
      id: string,
      type?: NotificationType | null,
      vehicleId: string,
      blockId: string,
      tripRouteNumber: string,
      plannedArrival: string,
      estimatedArrival: string,
      estimatedDelay: number,
      status?: Status | null,
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
    blockNumber: string,
    tripRouteNumber: string,
    tripRouteName: string,
    plannedArrival: string,
    estimatedArrival: string,
    estimatedDelay: string,
    status?: Status | null,
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
    blockNumber: string,
    tripRouteNumber: string,
    tripRouteName: string,
    plannedArrival: string,
    estimatedArrival: string,
    estimatedDelay: string,
    status?: Status | null,
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
    blockNumber: string,
    tripRouteNumber: string,
    tripRouteName: string,
    plannedArrival: string,
    estimatedArrival: string,
    estimatedDelay: string,
    status?: Status | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreatedVarselSubscription = {
  createdVarsel?:  {
    __typename: "Varsel",
    id: string,
    type?: NotificationType | null,
    vehicleId: string,
    blockId: string,
    tripRouteNumber: string,
    plannedArrival: string,
    estimatedArrival: string,
    estimatedDelay: number,
    status?: Status | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeletedVarselSubscription = {
  deletedVarsel?:  {
    __typename: "Varsel",
    id: string,
    type?: NotificationType | null,
    vehicleId: string,
    blockId: string,
    tripRouteNumber: string,
    plannedArrival: string,
    estimatedArrival: string,
    estimatedDelay: number,
    status?: Status | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdatedVarselSubscription = {
  updatedVarsel?:  {
    __typename: "Varsel",
    id: string,
    type?: NotificationType | null,
    vehicleId: string,
    blockId: string,
    tripRouteNumber: string,
    plannedArrival: string,
    estimatedArrival: string,
    estimatedDelay: number,
    status?: Status | null,
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
    blockNumber: string,
    tripRouteNumber: string,
    tripRouteName: string,
    plannedArrival: string,
    estimatedArrival: string,
    estimatedDelay: string,
    status?: Status | null,
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
    blockNumber: string,
    tripRouteNumber: string,
    tripRouteName: string,
    plannedArrival: string,
    estimatedArrival: string,
    estimatedDelay: string,
    status?: Status | null,
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
    blockNumber: string,
    tripRouteNumber: string,
    tripRouteName: string,
    plannedArrival: string,
    estimatedArrival: string,
    estimatedDelay: string,
    status?: Status | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateVarselSubscription = {
  onCreateVarsel?:  {
    __typename: "Varsel",
    id: string,
    type?: NotificationType | null,
    vehicleId: string,
    blockId: string,
    tripRouteNumber: string,
    plannedArrival: string,
    estimatedArrival: string,
    estimatedDelay: number,
    status?: Status | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateVarselSubscription = {
  onUpdateVarsel?:  {
    __typename: "Varsel",
    id: string,
    type?: NotificationType | null,
    vehicleId: string,
    blockId: string,
    tripRouteNumber: string,
    plannedArrival: string,
    estimatedArrival: string,
    estimatedDelay: number,
    status?: Status | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteVarselSubscription = {
  onDeleteVarsel?:  {
    __typename: "Varsel",
    id: string,
    type?: NotificationType | null,
    vehicleId: string,
    blockId: string,
    tripRouteNumber: string,
    plannedArrival: string,
    estimatedArrival: string,
    estimatedDelay: number,
    status?: Status | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};