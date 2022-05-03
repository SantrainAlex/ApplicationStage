import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
const petitTimer = (props) => {
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
    marginLeft: 160,
    position: "absolute",
    left: 10,
  },
  timer: {
    color: "#FFFFFF",
  },
});

export default petitTimer;
