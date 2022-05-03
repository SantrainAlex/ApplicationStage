import react from "react";
import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

//screen

import ParticipantsScreen from "./ParticipantsScreen";
import InformationsScreen from "../navigation/InformationsScreen";
import TourScreen from "../navigation/TourScreen";

//Screen names
const participantsName = "Participants";
const tourScreenName = "Tour";
const InformationsName = "Informations";

const Tab = createMaterialTopTabNavigator();
const MyTheme = {
  dark: false,
  colors: {
    primary: "#FB7445",
  },
};
const BarreNav = (props) => {
  return (
    <NavigationContainer theme={MyTheme} independent={true}>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: "transparent" }}
        initialRouteName={participantsName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === participantsName) {
              iconName = "man";
              size = 15;
            } else if (rn === tourScreenName) {
              iconName = "flag";
              size = 15;
            } else if (rn === InformationsName) {
              iconName = "information-outline";
              size = 25;
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#FB7445",
          ItabBarnactiveTintColor: "#000",
          tabBarLabelStyle: {
            paddingBottom: 10,

            fontSize: 10,
          },
          tabBarStyle: {
            backgroundColor: "transparent",
            padding: 5,
            height: 70,
            marginTop: 20,
          },
        })}
      >
        <Tab.Screen
          name={participantsName}
          component={ParticipantsScreen}
          initialParams={{ prenom: props.prenom }}
        />
        <Tab.Screen name={tourScreenName} component={TourScreen} />
        <Tab.Screen
          name={InformationsName}
          component={InformationsScreen}
          initialParams={{ prenom: props.prenom }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default BarreNav;
