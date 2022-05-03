import React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";

let route;

const _renderItem = (props) => {
  return (
    <TouchableOpacity
      onPress={() =>
        route.navigation.navigate("TimerScreen", {
          otherParams: props.item.Nom,
        })
      }
    >
      <Text style={{ color: "#FFF", fontSize: 20 }}>
        {props.item.Nom} le {props.item.Date} {props.item.nbrKM}
      </Text>
    </TouchableOpacity>
  );
};
export default List = (props) => {
  route = props.navigation;
  return (
    <FlatList
      data={props.data}
      renderItem={_renderItem}
      style={{ color: "#FFF" }}
    />
  );
};
