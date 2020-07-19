import React from "react";

const MapmyIndia = require("mmi-widget");

const TripTracking = () => {
  const TrackingComponent = MapmyIndia.default.MapmyIndiaULIPTrip;
  return (
    <TrackingComponent
      style={{ flex: 1 }}
      requestType="2"
      vehicalType="truck"
      destinationLat={19.07609}
      destinationLng={72.877426}
      refreshInterVal={5000}
    />
  );
};

export default TripTracking;
