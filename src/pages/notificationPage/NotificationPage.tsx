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
import React, { useEffect, useMemo, useState } from "react";
import { SubTitle } from "components/Text/StyledTitles";
import styled from "styled-components";
import { Image } from "@vygruppen/spor-react";
import axios from "axios";

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
        <h4 style={{ color: 'black' }}>Notification Page</h4>
        <div className="Table">
          <Table variant='outline' colorScheme="green" size="lg">
            <Thead>
              <Tr>
                <Th>Fra</Th>
                <Th>Til</Th>
                <Th isNumeric>Avgang</Th>
                <Th isNumeric>Ankomst</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Oslo bussterminal</Td>
                <Td>Kristiansand rutebilstasjon</Td>
                <Td isNumeric>10:30</Td>
                <Td isNumeric>14:48</Td>
              </Tr>
              <Tr>
                <Td>Oslo bussterminal</Td>
                <Td>Arendal stasjon</Td>
                <Td isNumeric>11:00</Td>
                <Td isNumeric>14:40</Td>
              </Tr>
              <Tr>
                <Td>Oslo S</Td>
                <Td>Drammen stasjon</Td>
                <Td isNumeric>12:09</Td>
                <Td isNumeric>12:42</Td>
              </Tr>
            </Tbody>
          </Table>
        </div>
      </div>
    </ErrorBoundary>
  );
};
