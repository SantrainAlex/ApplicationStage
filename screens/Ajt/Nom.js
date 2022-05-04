import React, { Component, useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { auth, db } from "../../firebase";
//screen
import ListName from "./ListName";

export default NomEnCour = (props) => {
  let listEnCour = [
    "course à pied",
    "marche",
    "VTT",
    "velo de route",
    "Natation",
  ];
  return (
    <View>
      <ListName data={listEnCour} navigation={props} />
    </View>
  );
};
