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
  Td,
  Tabs,
  TabList,
  Tab
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
        vehicleId: 2309,
        blockId: 26101,
        tripRouteId: 256,
        tripStartPointName: "Verket ferjekai",
        tripEndPointName: "Sætre bussterminal",
        plannedArrival:  new Date('09 August 2022 16:57 UTC').toISOString(), // "15:07",
        estimatedArrival: new Date('09 August 2022 17:10 UTC').toISOString(), // "15:22",
        estimatedDelay: 13,
        tripTimeStart: new Date('09 August 2022 15:43 UTC').toISOString(), // "15:07",
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

    //DataStore.delete(Notification, not => not.tripStartPointName("eq", "Sætre bussterminal"));
    return () => subscription.unsubscribe();
    }, [])

  return (
    <ErrorBoundary>
      <div className="NotificationPage">
      <header className="App-header">
        <div className="flex">
          <img src={logo} className="App-logo" alt="logo" />
          <Tabs variant="square" colorScheme="dark" size="lg" className="switchPageButton" onChange={() => setHandledPage(!handledPage)}>
            <TabList>
              <Tab  >Aktive varsler</Tab>
              <Tab >Håndterte varsler</Tab>
            </TabList>
          </Tabs>
        </div>
      </header>
        {handledPage ? <Heading textStyle="md" >Her vises turer estimert forsinket mer enn 10 minutter</Heading>
         : <Heading textStyle="md" >Her vises håndterte forsinkelser estimert større enn 10 minutter</Heading> }
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
                          <Th>Planlagt avreise</Th>
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
                          <Td>{element.tripTimeStart?.slice(11,16) }</Td>
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
