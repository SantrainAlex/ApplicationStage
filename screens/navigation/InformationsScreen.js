import react, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { auth, db } from "../../firebase";

export default class InformationsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      Nom: "",
      nbrKM: "",
      AltiMax: "",
      AltiMoyenne: "",
      AltiMin: "",
    };
  }

  async UNSAFE_componentWillMount() {
    const query = db
      .collection("Activités")
      .where("Nom", "==", this.props.route.params.prenom);

    await query.onSnapshot(
      (querySnapshot) => {
        id = "";
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          this.setState({
            date: doc.data().Date,
            Nom: doc.data().Nom,
            nbrKM: doc.data().nbrKM,
            AltiMax: doc.data().AltiMax,
            AltiMoyenne: doc.data().AltiMoyenne,
            AltiMin: doc.data().AltiMin,
          });
        });
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Nom: {this.state.Nom}</Text>
        <Text style={styles.text}>Date: {this.state.date}</Text>
        <Text style={styles.text}>Nombre de Km: {this.state.nbrKM}</Text>
        <Text style={styles.text}>Altitude Max : {this.state.AltiMax}</Text>
        <Text style={styles.text}>
          Altitude Moyenne : {this.state.AltiMoyenne}
        </Text>
        <Text style={styles.text}>Altitude Min : {this.state.AltiMin}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 25,
  },
});
