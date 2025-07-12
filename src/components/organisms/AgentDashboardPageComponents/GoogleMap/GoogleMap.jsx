import React from "react";
import GoogleMapReact from "google-map-react";
import { GoogleMapApiKey } from "../../../../utils/Common";

const GoogleMap = (props) => {
  const { lat, lng, name } = props;
  const latitude = Number(lat);
  const longitude = Number(lng);

  const renderMarkers = (map, maps) => {
    let marker = new maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      title: name,
    });
    return marker;
  };

  return (
    <div style={{ height: "30vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GoogleMapApiKey }}
        defaultCenter={{ lat: latitude, lng: longitude }}
        defaultZoom={11}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
      ></GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
