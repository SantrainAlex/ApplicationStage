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
export default class HomeScreenOg extends Component {
  constructor(props) {
    super(props);
  }

  sinscrire = () => {
    this.props.navigation.navigate("Ajt");
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
        <TouchableOpacity style={Styles.btnAdd} onPress={this.sinscrire}>
          <Text style={Styles.textBtn}>ajouter une activiter</Text>
        </TouchableOpacity>
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
  btnAdd: {
    backgroundColor: "#FB7445",
    height: 20,
    width: "100%",
    fontSize: 50,
    borderRadius: 20,
    position: "absolute",
    bottom: 10,
  },
  textBtn: {
    textAlign: "center",
    color: "#fff",
  },
});
