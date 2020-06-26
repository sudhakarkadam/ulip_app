import React from "react";
import { Component } from "react";
import { TripStamp } from "../../../components/TripStamp";

export default class App extends Component {
  render() {
    return (
      <TripStamp
        places={[
          { name: "Bangalore", state: "Karnataka", relativeDistance: 0 },
          {
            name: "Mumbai",
            state: "Maharashtra",
            relativeDistance: 1239,
            address:
              "ICC Chambers, Saki Bihar Rd, Muranjan Wadi, Marol, Andheri East, Mumbai, Maharashtra 40072"
          },
          { name: "Phi Phi", state: "Heaven", relativeDistance: 4532 }
        ]}
      />
    );
  }
}
