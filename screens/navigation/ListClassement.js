import React, { Linking } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
let route;
const _renderItem = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.item[0]}</Text>
      <Text style={styles.text}>tour N° {props.item[1]}</Text>
      <Text style={styles.text}>
        {props.item[2]}:{props.item[3]}.{props.item[4]}
      </Text>
    </View>
  );
};

const ListClassement = (props) => {
  return (
    <FlatList
      data={props.data}
      renderItem={_renderItem}
      style={{ color: "#fff" }}
    />
  );
};

export default ListClassement;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
  },
  text: {
    color: "#fff",
    width: 120,
    textAlign: "center",
  },
});
