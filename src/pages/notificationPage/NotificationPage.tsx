import { ErrorBoundary } from "components/ErrorBoundary/ErrorBoundary";
import logo from "./vy-logo-white.svg";
import "./notificationPage.css";
import {
  Button,
  Heading, 
  Stack, 
  Card,
  WarningOutline30Icon,
  SuccessOutline30Icon,
  DeleteCircleOutline30Icon,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td
} from "@vygruppen/spor-react";
import React, { useEffect, useState } from "react";
import { DataStore } from 'aws-amplify';
import { Notification /*, NotificationType */} from "models";

export const NotificationPage = () => {

  const [handledPage, setHandledPage] = useState(true);

  //CREATE NOTIFICATION
  const createNotification = async () => {
    console.log("inni create")
    try {
      await DataStore.save(new Notification ({
        type: "accident",
        vehicleId: 7623487,
        blockId: 5500,
        tripRouteId: 470,
        tripStartPointName: "Oslo bussterminal",
        tripEndPointName: "Bjørklia",
        plannedArrival:  new Date(2022, 8, 20, 25, 7).toISOString(), // "15:07",
        estimatedArrival: new Date(2022, 8, 20, 25, 22).toISOString(), // "15:22",
        estimatedDelay: 15,
        tripTimeStart: new Date(2022, 8, 20, 25, 7).toISOString(), // "15:07",
        hasPublicTransportationLane: true,
        status: "UNHANDLED"

      })
      );
      console.log("Created a notification")
    } catch (error) {
      console.log("Error creating Notification", error)
    }
  }

  
  async function updateNotificationStatus(notification: Notification) {
    const original: any = await DataStore.query(Notification, notification.id);
    await DataStore.save(
      Notification.copyOf(original, updated => {
        if (notification.status == "HANDLED") {
          updated.status = "UNHANDLED"
        } else {
          updated.status = "HANDLED"
        }
      })
    );
  }

  console.log(handledPage)
  const [notifications, setNotifications] = useState<Notification[]>();
  useEffect(() => {
    const subscription = DataStore.observeQuery(Notification).subscribe(({ items, isSynced }) => {
      console.log("items. ", items)
      const sortedItems: Notification[] = []
      for (var i = items.length-1; i >= 0; i--) {
        sortedItems.push(items[i])
      }
      setNotifications(sortedItems)
    })
    //createNotification();

    //DataStore.delete(Notification, not => not.id("eq", "d2055792-d398-4d20-9a04-20606edc780b"));
    return () => subscription.unsubscribe();
    }, [])

  return (
    <ErrorBoundary>
      <div className="NotificationPage">
      <header className="App-header">
        <div className="flex">
          <img src={logo} className="App-logo" alt="logo" />
            <Button className="switchPageButton" variant="control" onClick={() => setHandledPage(!handledPage)}> {handledPage ? "Se håndterte varsler" : "Tilbake til varsler"}</Button>
        </div>
      </header>
        {handledPage ? <div>
        <Heading textStyle="xl-display" padding="50" align="center">Varsler</Heading>
        <Heading textStyle="md">Her vises forsinkelser estimert større enn 10 minutter</Heading>
        </div>
         : <Heading textStyle="xl-display" padding="50">Håndterte varsler</Heading>}
          <div className="notificationCard">
            {notifications ? notifications
            .map((element) => {
              if (element.status == "UNHANDLED" && handledPage) {
                return <div>
                <Stack>
                  <Card variant="elevated" as="a" padding="50" margin="5">
                    <div id="card-header">
                      <Heading id = "card-header-header" textStyle="lg" rightIcon={WarningOutline30Icon}>Buss {element.vehicleId} er estimert forsinket med {element.estimatedDelay} minutter</Heading>
                      <div id="card-header-button" >
                        <Button id="card-header-button"  variant="tertiary" leftIcon={<SuccessOutline30Icon/>} onClick={() => updateNotificationStatus(element)}>Marker varsel som håndtert</Button>    
                      </div>
                    </div>
                    {element.hasPublicTransportationLane ?
                    <Heading leftIcon={<WarningOutline30Icon />} paddingTop="2" textStyle="sm">OBS: Linjen har kollektivfelt på deler av strekningen og forsinkelsen kan være mindre enn estimert </Heading> : <div></div>}
                    <Table variant='simple' padding-top="5">
                      <Thead>
                        <Tr>
                          <Th>Vognløp</Th>
                          <Th>Buss</Th>
                          <Th>Linje</Th>
                          <Th>Planlagt ankomst ved endestopp</Th>
                          <Th>Estimert ankomst ved endestopp</Th>
                          <Th>Estimert forsinkelse</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                      <Tr>
                          <Td>{element.blockId}</Td>
                          <Td>{element.vehicleId}</Td>
                          <Td>{element.tripRouteId} {element.tripStartPointName} - {element.tripEndPointName}</Td>
                          <Td>{element.plannedArrival?.slice(11,16)}</Td>
                          <Td>{element.estimatedArrival?.slice(11,16)}</Td>
                          <Td>{element.estimatedDelay} min</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </Card>
                </Stack>
              </div>
              } else if (element.status=="HANDLED" && !handledPage) {
                return <Stack>
                  <Card variant="elevated" as="a" padding="50" margin="5">
                    <div id="card-header">
                      <Heading id = "card-header-header" textStyle="lg" rightIcon={WarningOutline30Icon}>Dette varselet er håndtert</Heading>
                      <div id="card-header-button" >
                        <Button id="card-header-button" variant="tertiary" leftIcon={<DeleteCircleOutline30Icon/>} onClick={() => updateNotificationStatus(element)}>Flytt varsel tilbake til varslingssiden</Button>    
                      </div>
                    </div>
                    {element.hasPublicTransportationLane ?  <Heading paddingTop="2" textStyle="sm">OBS: Linjen har kollektivfelt på deler av strekningen og forsinkelsen kan være mindre enn estimert </Heading> : <div></div>}
                    <Table variant='simple' padding-top="5">
                      <Thead>
                        <Tr>
                          <Th>Vognløp</Th>
                          <Th>Buss</Th>
                          <Th>Linje</Th>
                          <Th>Planlagt ankomst ved endestopp</Th>
                          <Th>Estimert ankomst ved endestopp</Th>
                          <Th>Estimert forsinkelse</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                      <Tr>
                          <Td>{element.blockId}</Td>
                          <Td>{element.vehicleId}</Td>
                          <Td>{element.tripRouteId} {element.tripStartPointName} - {element.tripEndPointName}</Td>
                          <Td>{element.plannedArrival?.slice(11,16)}</Td>
                          <Td>{element.estimatedArrival?.slice(11,16)}</Td>
                          <Td>{element.estimatedDelay} min</Td>
                        </Tr>
                      </Tbody>
                    </Table>          
                  </Card>
                </Stack>
              }
              }) : <Heading>Ingen nye varsler</Heading>}

          </div>
      </div>
    </ErrorBoundary>
  );
};
