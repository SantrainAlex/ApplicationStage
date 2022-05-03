import React, { Component } from "react";
import { View } from "react-native";
import { db } from "../../firebase";
//screen
import List from "./List";

let listEnCour = [];
let key = 0;
export default class EnCour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arg: 0,
    };
  }

  async UNSAFE_componentWillMount() {
    const query = await db
      .collection("Activités")
      .orderBy("Date", "desc")
      .where("finish", "==", "false");

    query.onSnapshot((querySnapshot) => {
      key = `${querySnapshot.size}`;
      listEnCour = [];
      querySnapshot.forEach((doc) => {
        listEnCour.push(doc.data());
      });
      this.setState({
        arg: 1,
      });
    });
  }
  render() {
    return (
      <View>
        <List data={listEnCour} navigation={this.props} />
      </View>
    );
  }
}
