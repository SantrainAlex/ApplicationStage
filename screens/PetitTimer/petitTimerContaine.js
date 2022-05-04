import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { startService } from "../_services";
import { stopService } from "../_services/stop.service";
// screnne
import PetitTimer from "../PetitTimer/petitTimer";
import RoundButton from "../PetitTimer/petitRoundButton";
import RoundButtonRight from "../PetitTimer/petitRoundButtonRight";
import Lap from "../PetitTimer/petitLap";
import ButtonsRow from "../PetitTimer/petitButtonsRow";
import { NbrTourSelectService } from "../_services/NbrTourSelect.service";
import moment from "moment";

const MyTheme = {
  dark: false,
  colors: {
    primary: "#FB7445",
  },
};
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      now: 0,
      laps: [],
    };
  }

  componentDidMount() {
    this.subscription = startService.getstart().subscribe((message) => {
      if (message) {
        this.start();
      }
    });
    this.subscription = stopService.getstop().subscribe((message) => {
      if (message) {
        this.stop();
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.subscription.unsubscribe();
  }

  start = () => {
    const now = new Date().getTime();
    const nows = new Date().getTime();
    this.setState({
      left: 0,
      start: now,
      now,
      laps: [0],
    });
    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime() });
    }, 100);
  };
  tour = () => {
    const calcul = this.state.now - this.state.start;
    const pad = (n) => (n < 10 ? "0" + n : n);
    const duration = moment.duration(calcul);
    const centiseconds = Math.floor(duration.milliseconds() / 10);

    NbrTourSelectService.clearNbrTourSelectService();
    NbrTourSelectService.sendNbrTourKmSelectService([
      [
        this.props.participant,
        this.state.laps.length,
        pad(duration.minutes()),
        pad(duration.seconds()),
        pad(centiseconds),
      ],
    ]);
    this.lap();
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
    const { laps, now, start, timerTotal } = this.state;
    const [firstLap, ...other] = laps;
    // this.setState({
    //   laps: [firstLap + now - start, ...other],
    //   start: 0,
    //   now: 0,
    // });
  };
  reset = () => {
    clearInterval(this.timer);
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
    const { now, start, laps } = this.state;
    const timer = now - start;
    return (
      <View style={styles.container}>
        <PetitTimer interval={timer} />
        <View style={styles.containerLaps}>
          <Lap number={laps.length} participant={this.props.participant} />
        </View>
        {laps.length === 0 && (
          <ButtonsRow>
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
              onPress={this.tour}
            />
            <RoundButtonRight
              title="Stop"
              color="#FFF"
              background="#d40b0e"
              onPress={this.stop}
            />
          </ButtonsRow>
        )}
        {laps.length > 0 && start === 0 && (
          <ButtonsRow>
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
  containerLaps: {
    width: 58,
    flexDirection: "row",
    marginLeft: 70,
    position: "absolute",
  },
});
