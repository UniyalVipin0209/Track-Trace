import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";

export const MapContainer = ({ record }) => {
  //distretailLocation,distretailPinCode,distlatitude,distlongitude,
  //originAddress,originLatitude,originLongitude,originPincode
  console.log("record1 ", record);
  console.log("Api key ", process.env.REACT_APP_MAPKEY);
  const {
    productName,
    quantity,
    distretailName,
    distretailLocation,
    distretailPinCode,
    distretailLatitude,
    distretailLongitude,

    originAddress,
    originLatitude,
    originLongitude,
    originPincode,
  } = record;
  console.log(
    distretailLocation,

    distretailLatitude,
    distretailLongitude,
    originAddress,
    originLatitude,
    originLongitude,
    originPincode
  );
  const location = {
    lat: 20.7679,
    lng: 78.8718,
  };
  return (
    <>
      <div className="row">
        <span style={{ color: "Red", fontStyle: "normal", fontWeight: "bold" }}>
          {productName}{" "}
          <span
            style={{
              color: "gray",
            }}
          >
            {"    "}
            {quantity} Units
          </span>
        </span>
      </div>
      <section
        style={{
          maxWidth: "70vw",
          maxHeight: "40vh",
          marginRight: "10px",
          marginBottom: "20px",
        }}
      >
        <Map
          google={window.google}
          zoom={6}
          title={distretailLocation}
          style={{ width: "68%", height: "47%" }}
          initialCenter={location}
        >
          <Marker
            title={distretailName + ", " + distretailLocation}
            name={distretailPinCode}
            position={{
              lat: parseInt(distretailLatitude),
              lng: parseInt(distretailLongitude),
            }}
          />
          <Marker
            title={originAddress + ", " + originPincode}
            name={originPincode}
            position={{
              lat: parseInt(originLatitude),
              lng: parseInt(originLongitude),
            }}
          ></Marker>
          <Marker
            name={distretailName + ", " + distretailLocation}
            position={{
              lat: parseInt(originLatitude),
              lng: parseInt(originLongitude),
            }}
          />
          <style jsx>{`
            .mapContainerWrapper {
              position: relative !important;
            }
            .mapContainerWrapper div:first-child {
              position: relative !important;
            }
          `}</style>
        </Map>
      </section>
    </>
  );
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyAMHmvxTgc0IucoQkMM-NTjnrtJYDDOX3Y",
})(MapContainer);
