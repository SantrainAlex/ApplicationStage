import react from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import moment from "moment";

const RoundButtonRight = (props) => {
  return (
    <TouchableOpacity
      onPress={() => !props.disabled && props.onPress()}
      style={[styles.button, { backgroundColor: props.background }]}
      activeOpacity={props.disabled ? 1.0 : 0.7}
    >
      <View>
        <Text style={[styles.buttonTitle, props.color]}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 220,
  },
  buttonTitle: {
    fontSize: 18,
  },
});
export default RoundButtonRight;
