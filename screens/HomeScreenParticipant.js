import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { auth } from "../firebase";
//screen
import EnCour from "./activiter/EnCour";
import Terminer from "./activiter/Terminer";
export default class HomeScreenParticipant extends Component {
  constructor(props) {
    super(props);
  }

  sinscrire = () => {
    this.props.navigation.navigate("Sinscrire");
  };
  deconnection = () => {
    auth.signOut();
  };
  render() {
    return (
      <ImageBackground
        source={require("../assets/Images/carte.png")}
        resizeMode="cover"
        style={Styles.imageBackground}
      >
        <TouchableOpacity onPress={this.deconnection}>
          <Image
            source={require("../assets/Images/logout.png")}
            style={Styles.logoLogout}
          />
        </TouchableOpacity>
        <Text style={[Styles.textActiviter, { marginTop: 10 }]}>
          Activiter en cour
        </Text>
        <EnCour navigation={this.props.navigation} />
        <Text style={Styles.textActiviter}>Activiter terminer</Text>
        <Terminer navigation={this.props.navigation} />
      </ImageBackground>
    );
  }
}
const Styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  logoLogout: {
    marginTop: 30,
    height: 40,
    width: 40,
  },
  textActiviter: {
    color: "#FB7445",
    fontSize: 20,
    marginTop: 10,
  },
});
