import React, { useState } from "react";
import { View, Picker, StyleSheet } from "react-native";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const ButtonsRow = ({ children }) => {
  return <View style={styles.buttonsRow}>{children}</View>;
};

const styles = StyleSheet.create({
  buttonsRow: {
    flexDirection: "row",
  },
});

export default ButtonsRow;
