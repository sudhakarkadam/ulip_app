import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountsPage from "./AccountsPage";
import { HeaderOptions } from "./@styled/BaseElements";
import { I18nContext } from "./InternationalisationProvider";

const Stack = createStackNavigator();

const AccountsStack = () => {
  const { translate } = useContext(I18nContext);
  return (
    <Stack.Navigator
      initialRouteName="AccountsPage"
      screenOptions={HeaderOptions}
    >
      <Stack.Screen
        name="AccountsPage"
        component={() => <AccountsPage persona="SHIPPER" />}
        options={{
          title: translate("accounts")
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountsStack;
