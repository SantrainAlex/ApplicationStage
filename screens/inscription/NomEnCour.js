import React, { Component, useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { auth, db } from "../../firebase";
//screen
import ListName from "./ListName";

let listEnCour = [];
let key = 0;
export default class NomEnCour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 0,
    };
  }
  async UNSAFE_componentWillMount() {
    const query = await db
      .collection("Activités")
      .orderBy("Date", "desc")
      .where("finish", "==", "false");

    query.onSnapshot(
      (querySnapshot) => {
        key = `${querySnapshot.size}`;
        listEnCour = [];
        querySnapshot.forEach((doc) => {
          listEnCour.push(doc.data().Nom);
        });
        this.setState({
          test: 1,
        });
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );
  }

  render() {
    return (
      <View>
        <ListName data={listEnCour} navigation={this.props} />
      </View>
    );
  }
}
