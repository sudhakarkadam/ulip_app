/* eslint-disable react/display-name */
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Flex } from "./@styled/BaseElements";
import { PrimaryText, LightText } from "./@styled/Text";

const Tab = createBottomTabNavigator();

interface TabConfig {
  name: string;
  label: string;
  component: React.ComponentType<any>;
  activeImage: any;
  inActiveImage: any;
}

interface IOwnProps {
  tabs: TabConfig[];
}

const UlipBottomTab: React.FC<IOwnProps> = ({ tabs }) => {
  return (
    <Tab.Navigator initialRouteName={tabs[0].name}>
      {tabs.map(tab => {
        return (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <Flex marginTop={3}>
                    {focused ? <tab.activeImage /> : <tab.inActiveImage />}
                  </Flex>
                );
              },
              tabBarLabel: ({ focused }) =>
                focused ? (
                  <PrimaryText>{tab.label}</PrimaryText>
                ) : (
                  <LightText>{tab.label}</LightText>
                )
            }}
          ></Tab.Screen>
        );
      })}
    </Tab.Navigator>
  );
};

export default UlipBottomTab;
