import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  Text,
} from "react-native";
import { startService } from "../_services/start.service";
import { stopService } from "../_services/stop.service";
import { participantService } from "../_services/participant.service";
//Screen
import Timer from "./Timer";
import ButtonsRow from "./ButtonsRow";
import RoundButton from "./RoundButton";
import Popup from "../../screens/Popup";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      now: 0,
      laps: [],
      participant: 0,
    };
  }

  componentDidMount() {
    this.subscription = participantService
      .getparticipant()
      .subscribe((message) => {
        if (message) {
          this.setState({
            participant: 1,
          });
        }
      });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  start = () => {
    const now = new Date().getTime();
    this.setState({
      start: now,
      now,
      laps: [0],
    });
    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime() });
    }, 100);
    startService.sendstart("Go");
    stopService.clearstop();
  };

  lap = () => {
    const timestamp = new Date().getTime();
    const { laps, now, start } = this.state;
    const [firstLap, ...other] = laps;
    this.setState({
      laps: [0, firstLap + now - start, ...other],
      start: timestamp,
      now: timestamp,
    });
  };

  stop = () => {
    clearInterval(this.timer);
    const { laps, now, start } = this.state;
    const [firstLap, ...other] = laps;
    this.setState({
      laps: [firstLap + now - start, ...other],
      start: 0,
      now: 0,
    });
    stopService.sendstop("end");
    startService.clearstart();
  };
  reset = () => {
    this.setState({
      laps: [],
      start: 0,
      now: 0,
    });
  };
  resume = () => {
    const now = new Date().getTime();
    this.setState({
      start: now,
      now,
    });
    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime() });
    }, 100);
  };
  render() {
    const { now, start, laps, startTotal, participant } = this.state;
    const timer = now - start;
    return (
      <View style={styles.container}>
        <Popup prenom={this.props.prenom} nav={this.props.nav} />
        <Timer
          interval={laps.reduce((total, curr) => total + curr, 0) + timer}
        />
        {laps.length === 0 && participant === 1 && (
          <ButtonsRow>
            <RoundButton title="TOUR" color="#FFF" background="#151515" />
            <RoundButton
              title="Start"
              color="#FFF"
              background="#FB7445"
              onPress={this.start}
            />
          </ButtonsRow>
        )}
        {start > 0 && (
          <ButtonsRow>
            <RoundButton
              title="TOUR"
              color="#FFF"
              background="#FB7445"
              onPress={this.lap}
            />
            <RoundButton
              title="Stop"
              color="#FFF"
              background="#d40b0e"
              onPress={this.stop}
            />
          </ButtonsRow>
        )}
        {laps.length > 0 && start === 0 && (
          <ButtonsRow>
            <TouchableHighlight onPress={this.reset}>
              <Image
                source={require("../../assets/Images/rezet.png")}
                style={styles.logo_rezet}
              />
            </TouchableHighlight>
            <RoundButton
              title="restart"
              color="#FFF"
              background="#d40b0e"
              onPress={this.resume}
            />
          </ButtonsRow>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo_rezet: {
    height: 40,
    width: 40,
    marginTop: 170,
    marginLeft: 160,
  },
});
