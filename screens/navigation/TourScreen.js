import react, { Component } from "react";
import { View, ScrollView } from "react-native";
import { NbrTourSelectService } from "../_services/NbrTourSelect.service";
import ListClassement from "./ListClassement";
let list = [];
let obj = {
  foo: "bar",
  baz: 42,
};
let prenom;
export default class TourScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 0,
    };
  }

  async UNSAFE_componentWillMount() {
    NbrTourSelectService.getNbrTourSelectService().subscribe((message) => {
      if (message) {
        list.push([
          message.km[0][0],
          message.km[0][1],
          message.km[0][2],
          message.km[0][3],
          message.km[0][4],
        ]);

        this.setState({
          test: 1,
        });
      }
    });
  }

  render() {
    return (
      <ScrollView>
        <ListClassement data={list} />
      </ScrollView>
    );
  }
}
