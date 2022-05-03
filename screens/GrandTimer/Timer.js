import react from "react";
import { View, Text, StyleSheet } from "react-native";

import moment from "moment";
const Timer = (props) => {
  const pad = (n) => (n < 10 ? "0" + n : n);
  const duration = moment.duration(props.interval);
  const centiseconds = Math.floor(duration.milliseconds() / 10);
  return (
    <View style={styles.timerTourContainer}>
      <Text style={styles.timer}>{pad(duration.minutes())}:</Text>
      <Text style={styles.timer}>{pad(duration.seconds())}.</Text>
      <Text style={styles.timer}>{pad(centiseconds)}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  timerTourContainer: {
    flexDirection: "row",
    height: 100,
    position: "absolute",
    right: 10,
  },
  timer: {
    color: "#FFFFFF",
    fontSize: 70,
  },
});
export default Timer;
