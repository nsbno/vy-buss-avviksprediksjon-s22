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
import { DataStore } from 'aws-amplify';
import { Notification, NotificationType } from "models";
import { table } from "console";

const useAxiosPost = (url: string, payload: any) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(
          url,
          payload
        );
        setData(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);
  return { data, error, loaded };
};

export const NotificationPage = () => {

  /*const createNotification = async () => {
    try {
      await DataStore.save(new Notification ({
        type: NotificationType.ACCIDENT,
        vehicleNumber: "45645",
        tripRouteNumber: "485",
        estimatedDelay: "11",
        estimatedArrival: "12:45"
      })
      );
      console.log("Created a notification")
    } catch (error) {
      console.log("Error creatign Notification", error)
    }
  }
  createNotification();*/


  const [notifications, setNotifications] = useState<Notification[]>();
  useEffect(() => {
    const getNotifications = async () => {
      try {
        let response = await DataStore.query(Notification);
        console.log("Notification retrieved successfully!", JSON.stringify(response, null, 2));
        setNotifications(response);
      } catch (error) {
        console.log("Error retrieving notifications", error);
      }
    }
    getNotifications();
    }, [])

  // const { data, error, loaded } = useAxiosPost(
  //   "https://rf8tw7t1j4.execute-api.eu-central-1.amazonaws.com/daDelayPredictionTest",
  //   {
  //     "busId": "123",
  //     "trips": "3",
  //     "stops": "12",
  //     "tripTimeStart": "08:30"
  //   }
  // );
  // const stringifiedData = useMemo(() => {
  //   return JSON.stringify(data || {});
  // }, [data]);
  // if (loaded) {
  //   return error ? (
  //     <span>Error: {error}</span>
  //   ) : (
  //     <div>
  //       <p>{stringifiedData}</p>
  //       <p>DATA: {data}</p>
  //     </div>
  //   );
  // }
  // return <span>Loading...</span>;

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
