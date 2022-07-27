/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
      id
      type
      vehicleNumber
      blockNumber
      tripRouteNumber
      tripRouteName
      plannedArrival
      estimatedArrival
      estimatedDelay
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
      id
      type
      vehicleNumber
      blockNumber
      tripRouteNumber
      tripRouteName
      plannedArrival
      estimatedArrival
      estimatedDelay
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
      id
      type
      vehicleNumber
      blockNumber
      tripRouteNumber
      tripRouteName
      plannedArrival
      estimatedArrival
      estimatedDelay
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createVarsel = /* GraphQL */ `
  mutation CreateVarsel(
    $input: CreateVarselInput!
    $condition: ModelVarselConditionInput
  ) {
    createVarsel(input: $input, condition: $condition) {
      id
      type
      vehicleId
      blockId
      tripRouteNumber
      plannedArrival
      estimatedArrival
      estimatedDelay
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateVarsel = /* GraphQL */ `
  mutation UpdateVarsel(
    $input: UpdateVarselInput!
    $condition: ModelVarselConditionInput
  ) {
    updateVarsel(input: $input, condition: $condition) {
      id
      type
      vehicleId
      blockId
      tripRouteNumber
      plannedArrival
      estimatedArrival
      estimatedDelay
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteVarsel = /* GraphQL */ `
  mutation DeleteVarsel(
    $input: DeleteVarselInput!
    $condition: ModelVarselConditionInput
  ) {
    deleteVarsel(input: $input, condition: $condition) {
      id
      type
      vehicleId
      blockId
      tripRouteNumber
      plannedArrival
      estimatedArrival
      estimatedDelay
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
