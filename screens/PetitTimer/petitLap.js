import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { NbrTourSelectService } from "../_services/NbrTourSelect.service";

export default class laps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tour: 0,
    };
  }

  render() {
    return (
      <View>
        <Text style={styles.NbrTour}>Tour N° {this.props.number}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  NbrTour: {
    color: "#FFF",
  },
});
