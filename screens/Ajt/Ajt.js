import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";

import { TextInput } from "react-native-paper";

import { db } from "../../firebase";
import { LinearGradient } from "expo-linear-gradient";
//services
import { NomAjtSelectService } from "../_services/NomPourAjt.service";
//screen
import NomAjt from "./Nom";

const Ajt = ({ navigation }) => {
  const { control, handleSubmit, errors, watch, register } = useForm();
  let Nom;
  NomAjtSelectService.getNomAjtSelectService().subscribe((message) => {
    if (message) {
      Nom = message.Nom;
    }
  });

  const onSubmit = (data) => {
    //contoler si il et dans la db
    const { nbrKM } = data;

    const utilisateursRef = db.collection("Activités");

    const snapshot = utilisateursRef.where(
      "Nom",
      "==",
      Nom.trim().toLowerCase()
    );
    var Date = moment().utcOffset("+01:00").format("YYYY-MM-DD ");

    snapshot.get().then((snapshot) => {
      if (snapshot.empty) {
        const userdata = {
          Nom: Nom,
          nbrKM: nbrKM + " KM",
          Date: Date,
          finish: "false",
        };
        db.collection("Activités").add(userdata);
        navigation.goBack();
      }
      snapshot.forEach((doc) => {
        navigation.goBack();
      });
    });
    //
  };
  return (
    <ImageBackground
      source={require("../../assets/Images/carte.png")}
      resizeMode="cover"
      style={styles.ImageBackground}
    >
      <Animatable.View animation="fadeInUpBig" style={styles.header}>
        <NomAjt />
        <View style={styles.action}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                placeholder="nbrKM"
                mode="outlined"
                keyboardType="numeric"
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="nbrKM"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={handleSubmit(onSubmit)}
          >
            <LinearGradient
              colors={["#FB7445", "#FB5000"]}
              style={styles.signIn}
            >
              <Text style={[styles.textSign, { color: "black" }]}>Ajouter</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[
              styles.signIn,
              {
                borderColor: "#FB7445",
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text style={[styles.textSign, { color: "#FB7445" }]}>Retour</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </ImageBackground>
  );
};
export default Ajt;
const styles = StyleSheet.create({
  ImageBackground: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flex: 4,
    backgroundColor: "rgba(249, 249, 249, 0.40)",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 80,
  },
  text_footer: {
    color: "#FB7445",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_header: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#FB7445",
    paddingBottom: 5,
    paddingTop: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  textInput: {
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.00)",
  },
  color_textPrivate: {
    color: "grey",
  },
  footer: {
    flex: 3,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 70,
  },
});
