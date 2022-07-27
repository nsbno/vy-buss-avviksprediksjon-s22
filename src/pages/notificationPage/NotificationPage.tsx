import { ErrorBoundary } from "components/ErrorBoundary/ErrorBoundary";
import logo from "vy-logo-white.svg";
import "./notificationPage.css";
import {
  Box,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Heading, 
  Stack, 
} from "@vygruppen/spor-react";
import React, { ReactComponentElement, useEffect, useMemo, useState } from "react";
import { IoIosWarning } from "react-icons/io";
import { SubTitle } from "components/Text/StyledTitles";
import styled from "styled-components";
import { Image } from "@vygruppen/spor-react";
import { Card } from "@vygruppen/spor-react";
import axios from "axios";
import { DataStore, Predicates } from 'aws-amplify';
import { Notification /*, NotificationType */} from "models";
import { table } from "console";
//import { createdNotification } from "graphql/subscriptions";

export const NotificationPage = () => {

  //CREATE NOTIFICATION
  const createNotification = async () => {
    console.log("inni create")
    try {
      console.log("inside try")
      await DataStore.save(new Notification ({
        type: "accident",
        vehicleId: 7623487,
        blockId: 5500,
        tripRouteId: 470,
        tripRouteName: "Bjørkelangen - Eidslia",
        plannedArrival:  new Date(2022, 8, 20, 25, 7).toISOString(), // "15:07",
        estimatedArrival: new Date(2022, 8, 20, 25, 22).toISOString(), // "15:22",
        estimatedDelay: 15
      })
      );
      console.log("Created a notification")
    } catch (error) {
      console.log("Error creating Notification", error)
    }
    console.log("etter create")
  }

  //GET NOTIFICATION METHOD
  const getNotifications = async () => {
    try {
      console.log("tries get")
      let response = await DataStore.query(Notification);

      console.log("Notification retrieved successfully!", JSON.stringify(response, null, 2));
      setNotifications(response);
    } catch (error) {
      console.log("Error retrieving notifications", error);
    }
  }
  const [notifications, setNotifications] = useState<Notification[]>();
  useEffect(() => {
    DataStore.start();
    const subscription = DataStore.observeQuery(Notification).subscribe(({ items }) => {
      console.log("items. ", items)
      setNotifications(items)
    })
    console.log(subscription)
    //createNotification();

    //DataStore.delete(Notification, not => not.vehicleId("eq", 7623487));
    return () => subscription.unsubscribe();
    }, [])

  return (
    <ErrorBoundary>
      <div className="NotificationPage">
        <Heading textStyle="xl-display" padding="100">
          Varsler
        </Heading>
        <div className="notificationCard">
          {notifications ? notifications.map((element) => {
            return <Stack>
              <Card variant="elevated" as="a" padding="100" margin="5">
                <Heading textStyle="lg">Buss {element.vehicleId} er forsinket med {element.estimatedDelay} minutter.</Heading>
                <Heading textStyle="sm">Linje {element.tripRouteId} {element.tripRouteName} er forsinket på grunn av {element.type?.toLowerCase()}.</Heading>
              </Card>
            </Stack>
          }) : <Card variant="elevated">Empty card</Card>}
        </div>
      </div>
    </ErrorBoundary>
  );
};
