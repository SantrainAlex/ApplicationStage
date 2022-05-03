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

import { TextInput, Button } from "react-native-paper";

import { db } from "../../firebase";
import { LinearGradient } from "expo-linear-gradient";
//screen
import InscrptionEnCour from "./NomEnCour";
// service
import { NomSelectService } from "../_services/NomSelect.service";
import { KmSelectService } from "../_services/KmSelect.service";

const Sinscrire = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  let Nom;
  let Km;
  NomSelectService.getNomSelectService().subscribe((message) => {
    if (message) {
      Nom = message.Nom;
    }
  });
  KmSelectService.getKmSelectService().subscribe((message) => {
    if (message) {
      Km = message.km;
    }
  });
  const onSubmit = (data) => {
    //contoler si il et dans la db
    const { prenom, email } = data;

    const utilisateursRef = db.collection("Participant");

    const snapshot = utilisateursRef.where(
      "prenom",
      "==",
      prenom.trim().toLowerCase()
    );

    snapshot.get().then((snapshot) => {
      if (snapshot.empty) {
        const userdata = {
          Nom: Nom,
          prenom: prenom,
          nbrKM: Km,
          email: email,
        };
        db.collection("Participant").add(userdata);
        navigation.goBack();
      }
    });
  };
  //
  return (
    <ImageBackground
      source={require("../../assets/Images/carte.png")}
      resizeMode="cover"
      style={Styles.image}
    >
      <Animatable.View animation="fadeInUpBig" style={Styles.header}>
        <InscrptionEnCour />
        <View style={Styles.action}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                placeholder="Nom et prenom "
                style={Styles.textInput}
                mode="outlined"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="prenom"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>
        <View style={Styles.action}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                placeholder="email "
                style={Styles.textInput}
                mode="outlined"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="email"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>

        <View style={Styles.button}>
          <TouchableOpacity
            style={Styles.signIn}
            onPress={handleSubmit(onSubmit)}
          >
            <LinearGradient
              colors={["#FB7445", "#FB5000"]}
              style={Styles.signIn}
            >
              <Text style={[Styles.textSign, { color: "black" }]}>Ajouter</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[
              Styles.signIn,
              {
                borderColor: "#FB7445",
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text style={[Styles.textSign, { color: "#FB7445" }]}>Retour</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </ImageBackground>
  );
};
export default Sinscrire;
const Styles = StyleSheet.create({
  image: {
    flex: 1,
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
});
