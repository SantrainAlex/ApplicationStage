import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { auth, db } from "./firebase";
// screen
import LoginScreen from "./screens/sessions/LoginScreen";
import SignUpScreen from "./screens/sessions/SignUpScreen";
import HomeScreenParticipant from "./screens/HomeScreenParticipant";

const Stack = createStackNavigator();

export default function App() {
  const [signIn, setSigneIn] = useState(false);
  const [user, setUser] = useState(false);
  const [og, setOg] = useState(false);

  //check if the user is in the database
  auth.onAuthStateChanged((user) => {
    if (user) {
      const userRef = db.collection("User");
      const snapshot = userRef.where(
        "email",
        "==",
        user.email.trim().toLowerCase()
      );
      //control of the user role
      snapshot.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().role == "Utilisateur") {
            setUser(true);
          }
          if (doc.data().role == "OG") {
            setOg(true);
          }
        });
      });
      setSigneIn(true);
    } else {
      setSigneIn(false);
      setUser(false);
      setOg(false);
    }
  });
  return (
    <NavigationContainer>
      {signIn ? (
        user ? (
          <Stack.Navigator mode="card">
            <Stack.Screen
              name="HomeScreenParticipant"
              component={HomeScreenParticipant}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : (
          <></>
        )
      ) : (
        <>
          <Stack.Navigator mode="card">
            <Stack.Screen
              name="signIn"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
}
