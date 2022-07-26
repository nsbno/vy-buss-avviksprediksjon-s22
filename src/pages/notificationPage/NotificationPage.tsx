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
  Tr
} from "@vygruppen/spor-react";
import React, { ReactComponentElement, useEffect, useMemo, useState } from "react";
import { SubTitle } from "components/Text/StyledTitles";
import styled from "styled-components";
import { Image } from "@vygruppen/spor-react";
import axios from "axios";
import { DataStore, Predicates } from 'aws-amplify';
import { Notification, NotificationType } from "models";
import { table } from "console";
import { createdNotification } from "graphql/subscriptions";

export const NotificationPage = () => {

  //CREATE NOTIFICATION
  const createNotification = async () => {
    try {
      await DataStore.save(new Notification ({
        type: NotificationType.ACCIDENT,
        vehicleNumber: "NY",
        tripRouteNumber: "48566",
        estimatedDelay: "17",
        estimatedArrival: "12:55"
      })
      );
      console.log("Created a notification")
    } catch (error) {
      console.log("Error creating Notification", error)
    }
  }

  //GET NOTIFICATION METHOD
  const getNotifications = async () => {
    try {
      let response = await DataStore.query(Notification);
      /*await DataStore.save(
        Notification.copyOf(original, updated => {
          updated.vehicleNumber = newVehicleNumber
        })
      )*/
      console.log("Notification retrieved successfully!", JSON.stringify(response, null, 2));
      setNotifications(response);
    } catch (error) {
      console.log("Error retrieving notifications", error);
    }
  }
  const [notifications, setNotifications] = useState<Notification[]>();
  useEffect(() => {
    const subscription = DataStore.observeQuery(Notification).subscribe(({ items }) => {
      console.log(items)
      setNotifications(items)
    })
    //createNotification();
    //DataStore.delete(Notification, not => not.vehicleNumber("eq", "NY"));
    return () => subscription.unsubscribe();
    }, [])

    //PER NÅ: HENTER ENDRINGER GJORT FRA FRONTEND (IKKE ENDRINGER SOM GJØRES I DATABASEN MEN JEG TROR DET ER FORDI DE IKKE ER GJORT VIA 
    // APPSYNC APIet SÅ HVIS MAN GJØR DET SENERE (IRL) SÅ GÅR DET KANSKJE BRA)
    //Settes til deleted=true backend, så tror det funker! 

  return (
    <ErrorBoundary>
      <div className="NotificationPage">
        <h4 style={{ color: 'black' }}>Varsler</h4>
        <div className="Table">
          <Table variant='outline' colorScheme="green" size="lg">
            <Thead>
              <Tr>
                <Th>Buss</Th>
                <Th>Rute</Th>
                <Th isNumeric>Estimert forsinkelse</Th>
                <Th isNumeric>Estimert ankomst</Th>
              </Tr>
            </Thead>
            <Tbody>
            {notifications ? notifications.map((element) => { 
                return <Tr>  
                    <Td>{element.vehicleNumber}</Td> 
                    <Td>{element.tripRouteNumber}</Td> 
                    <Td>{element.estimatedDelay}</Td> 
                    <Td>{element.estimatedArrival}</Td> 
                       </Tr> 
                }) : <Tr><Td>Oslo S</Td> 
                <Td>Drammen stasjon</Td> 
                <Td isNumeric>12:09</Td> 
                <Td isNumeric>12:42</Td></Tr>} 
            </Tbody>
          </Table>
        </div>
      </div>
    </ErrorBoundary>
  );
};
