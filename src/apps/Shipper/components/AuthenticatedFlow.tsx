// import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import CreateTrip from "./CreateTrip";
// import { StackScreenProps } from "@react-navigation/stack";
// import ShipperPersonProfile from "./ShipperPersonProfile";
// import ShipperCompanyProfile from "./ShipperCompanyProfile";
// import ShipperHome from "./ShipperHome";
// // eslint-disable-next-line @typescript-eslint/prefer-interface
// export type RootStackParamList = {
//   CreateProfile: undefined;
//   PersonProfile: undefined;
//   CompanyProfile: undefined;
//   CreateTrip: undefined;
//   ShipperHome: undefined;
// };

// const Stack = createStackNavigator<RootStackParamList>();
// type CreateTripProps = StackScreenProps<RootStackParamList, "CreateTrip">;

// const AuthenticatedFlow = () => {
//   return (
//     <Stack.Navigator initialRouteName="ShipperHome">
//       <Stack.Screen name="ShipperHome" component={ShipperHome} />
//       <Stack.Screen name="PersonProfile" component={ShipperPersonProfile} />
//       <Stack.Screen name="CompanyProfile" component={ShipperCompanyProfile} />
//       <Stack.Screen
//         name="CreateTrip"
//         component={(props: CreateTripProps) => (
//           <CreateTrip
//             createTripCallback={() => props.navigation.navigate("ShipperHome")}
//           />
//         )}
//         options={{ title: "Create Trip" }}
//       />
//     </Stack.Navigator>
//   );
// };

// export default AuthenticatedFlow;
