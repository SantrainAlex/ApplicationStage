import React, { useState } from "react";
import { View, Picker, StyleSheet } from "react-native";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const Picker_sport = () => {
  const [selectedValue, setSelectedValue] = useState("");
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={styles.Picker_select}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="course à pied" />
        <Picker.Item label="marche" />
        <Picker.Item label="VTT" />
        <Picker.Item label="velo de route" />
        <Picker.Item label="Natation" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center",
  },
  Picker_select: {
    width: 159,
    color: "#fff",
  },
});

export default Picker_sport;
