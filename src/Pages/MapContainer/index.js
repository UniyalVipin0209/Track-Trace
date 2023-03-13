import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import { AiFillSave, AiOutlineTransaction } from "react-icons/ai";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  SkeletonText,
  Button,
  Text,
} from "@chakra-ui/react";

import { FaTimes, FaChair } from "react-icons/fa";

import { useHistory } from "react-router";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

const center = { lat: 48.8584, lng: 2.2945 };

const MapContainer = ({ record }) => {
  const [initialRecord, setInitialRecord] = useState(record);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [mapFinal, setMapFinal] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [estimatedEmmision, setEstimatedEmmision] = useState("");
  const [zoomval, setZoomVal] = useState(10);

  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPKEY,
    //googleMapsApiKey: "AIzaSyAMHmvxTgc0IucoQkMM-NTjnrtJYDDOX3Y",
    libraries,
  });

  const calculateRoute = async () => {
    // console.log("CalculateRoute....", precord);

    const precord = initialRecord;
    console.log("CalculateRoute....", precord);
    try {
      if (precord.originLocation === "" || precord.distretailLocation === "") {
        return;
      }

      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();

      const results = await directionsService.route({
        origin: precord.originLocation,
        destination: precord.distretailLocation,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });
      console.log("Results ", results);
      setDirectionsResponse(results);
      let customZoom = calculateZoomLevel(precord.distanceInKms);
      setZoomVal(customZoom);
      setDistance(precord.distanceInKms);
      setEstimatedEmmision(precord.distretailLocation);
    } catch (e) {
      //console.log("Error ", thor);
      throw e;
    }
  };

  //map
  if (!isLoaded) {
    return <SkeletonText />;
  }

  //

  function calculateZoomLevel(distance) {
    let customZoom;
    if (distance > 0 && distance < 450) customZoom = 15;
    else if (distance > 450 && distance < 750) customZoom = 14;
    else if (distance > 750 && distance < 1200) customZoom = 12;
    else if (distance > 1200 && distance < 1700) customZoom = 10;
    else if (distance > 1700 && distance < 2100) customZoom = 8;
    else if (distance > 2100 && distance < 2600) customZoom = 8;
    else customZoom = 6;
    console.log("customzoom ", customZoom);
    return customZoom;
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    setZoomVal(10);
  }
  return (
    <div className="mainbox">
      <Button onClick={calculateRoute}></Button>
      <Flex
        position="relative"
        flexDirection="column"
        alignItems="center"
        h="74.5vh"
        w="73.8vw"
      >
        <Box position="absolute" left={0} top={0} h="97%" w="96.5%">
          <GoogleMap
            center={center}
            zoom={8}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map) => setMap(map)}
          >
            <Marker position={center} />
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
          <HStack mt={5} spacing={5} justifyContent="space-between">
            <Text ml={4}>Distance: {distance} </Text>
            <Text>Duration: {duration} </Text>
            <Text style={{ color: "Green" }}>
              Estimated Emmision(Co2): {estimatedEmmision}{" "}
            </Text>
          </HStack>
        </Box>
      </Flex>
    </div>
  );
};

export default MapContainer;
