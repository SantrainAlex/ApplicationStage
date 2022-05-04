import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { auth, db } from "../firebase";

//Screen
import BarreNav from "./navigation/BarreNav";
import TimerContaine from "./GrandTimer/timerContaine";
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arg: 0,
    };
  }
  deconnection = () => {
    auth.signOut(); // Undefined
  };
  render() {
    return (
      <ImageBackground
        source={require("../assets/Images/carte.png")}
        resizeMode="cover"
        style={Styles.image}
      >
        <TouchableOpacity onPress={this.deconnection}>
          <Image
            source={require("../assets/Images/carte.png")}
            style={Styles.logo_logout}
          />
        </TouchableOpacity>
        <View style={{ height: 250 }}>
          <TimerContaine />
        </View>
        <BarreNav nom={this.props.route.params.otherParams} />
      </ImageBackground>
    );
  }
}

HomeScreen;

const Styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  logo_rezet_time: {
    marginTop: 25,
    marginRight: 20,
    height: 20,
    width: 20,
  },
  logo_logout: {
    flexDirection: "row",
    height: 40,
    width: 40,
  },
});
