import react, { useEffect, useState, Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import PetitminiTimer from "../PetitTimer/petitTimerContaine";
import { participantService } from "../_services/participant.service";
import { auth, db } from "../../firebase";
import Popup from "../PetitTimer/PopupNom";
import { NewPrenomSelectService } from "../_services/Newprenom";
let participant = [];
let nombre = 1;
export default class ParticipantsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 0,
    };
  }

  componentDidMount() {
    this.setState({
      test: 1,
    });
  }

  add = () => {
    nombre = participant.length;
    participant.push(this.randomRgb(participant.length));
    this.sendparticipant();
    this.setState({
      test: 1,
    });
  };
  randomRgb = (test) => {
    if (test == null) {
      let nombre = 1;
    } else {
      nombre++;
    }

    return `${nombre}`;
  };

  sendparticipant = () => {
    participantService.sendparticipant("go");
  };

  render() {
    NewPrenomSelectService.getNewPrenomSelectService().subscribe((message) => {
      if (message) {
        if (participant.includes(message.Nom) == false) {
          participant.pop();
          participant.push(message.Nom);
          this.add();
          participant.pop();
        }
        //participant.push(message.Nom);
      }
    });
    return (
      <View style={{ height: 390 }}>
        <TouchableOpacity style={Styles.Button_add} onPress={this.add}>
          <Text style={Styles.Text_Button_add}>Ajouter un Participant</Text>
        </TouchableOpacity>
        <FlatList
          keyExtractor={(item) => item}
          data={participant}
          renderItem={({ item }) => {
            return (
              <View style={{ height: 50, marginTop: 5 }}>
                <Popup item={item} />

                <PetitminiTimer participant={item} />
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  Button_add: {
    backgroundColor: "#FB7445",
    height: 20,
    fontSize: 50,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  Text_Button_add: {
    textAlign: "center",
    color: "#fff",
  },
});
