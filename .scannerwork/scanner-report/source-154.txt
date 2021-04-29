export const cityLatLongs = {
  bangalore: {
    name: "Bangalore",
    latitude: 12.971599,
    longitude: 77.594563
  },
  mumbai: {
    name: "Mumbai",
    latitude: 19.075984,
    longitude: 72.877656
  },
  delhi: {
    name: "Delhi",
    latitude: 28.704059,
    longitude: 77.10249
  },
  kolkata: {
    name: "Kolkata",
    latitude: 22.572646,
    longitude: 88.363895
  }
};

export const currentLocations = {
  bangalore_mumbai: {
    latitude: 15.367404, //Hubli
    longitude: 75.125114,
    name: "Hubli",
    time: "Today, 12:33 PM",
    delay: "ON-TIME"
  },
  mumbai_bangalore: {
    latitude: 15.367404, //Hubli
    longitude: 75.125114,
    name: "Hubli",
    time: "Today, 12:33 PM",
    delay: "ON-TIME"
  },
  delhi_bangalore: {
    name: "Delhi",
    latitude: 28.704059,
    longitude: 77.10249
  },
  bangalore_kolkata: {
    name: "Bangalore",
    latitude: 12.971599,
    longitude: 77.594563
  }
};

export const hops = {
  bangalore_mumbai: [
    {
      latitude: 15.367404, //Hubli
      longitude: 75.125114,
      name: "Hubli",
      time: "Today, 12:33 PM",
      delay: "ON-TIME"
    },
    {
      latitude: 14.467945, //Davanagere
      longitude: 75.902855,
      name: "Davanagere",
      time: "Today, 12:33 PM",
      delay: "ON-TIME"
    },
    {
      latitude: 13.349029, //Tumakuru
      longitude: 77.111042,
      name: "Tumakuru",
      time: "Today, 12:33 PM",
      delay: "ON-TIME"
    },
    {
      latitude: 12.974629, //Banagalore
      longitude: 77.694147,
      name: "Bangalore",
      time: "Today, 12:33 PM",
      delay: "ON-TIME"
    }
  ],
  mumbai_bangalore: [
    {
      latitude: 15.367404, //Hubli
      longitude: 75.125114,
      name: "Hubli",
      time: "Today, 12:33 PM",
      delay: "ON-TIME"
    },
    {
      latitude: 17.669318, //Satara
      longitude: 74.025283,
      name: "Satara",
      time: "Today, 12:33 PM",
      delay: "ON-TIME"
    },
    {
      latitude: 18.539277, //Pune
      longitude: 73.86387,
      name: "Pune",
      time: "Today, 12:33 PM",
      delay: "ON-TIME"
    },
    {
      latitude: 19.082778, //Mumbai
      longitude: 72.870451,
      name: "Mumbai",
      time: "Today, 12:33 PM",
      delay: "ON-TIME"
    }
  ],
  delhi_bangalore: [],
  bangalore_kolkata: []
};
