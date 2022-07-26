export const schema = {
    "models": {
        "Notification": {
            "name": "Notification",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": {
                        "enum": "NotificationType"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "vehicleNumber": {
                    "name": "vehicleNumber",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "blockNumber": {
                    "name": "blockNumber",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "tripRouteNumber": {
                    "name": "tripRouteNumber",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "tripRouteName": {
                    "name": "tripRouteName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "plannedArrival": {
                    "name": "plannedArrival",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "estimatedArrival": {
                    "name": "estimatedArrival",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "estimatedDelay": {
                    "name": "estimatedDelay",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Notifications",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                }
            ]
        }
    },
    "enums": {
        "NotificationType": {
            "name": "NotificationType",
            "values": [
                "ACCIDENT",
                "TRAFFICK",
                "LATELOGIN"
            ]
        }
    },
    "nonModels": {},
    "version": "ab02d3b7449ee8705225c515b3716841"
};