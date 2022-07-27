/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
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
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncNotifications = /* GraphQL */ `
  query SyncNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNotifications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
