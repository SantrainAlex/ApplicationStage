import React, { useRef } from "react";
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import * as Animable from "react-native-animatable";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { auth, db } from "../../firebase";
import { LinearGradient } from "expo-linear-gradient";

const { height } = Dimensions.get("screen");

export default SignUpScreen = ({ navigation }) => {
  const { control, handleSubmit, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    const { email, password } = data;
    const userRef = db.collection("User");

    const snapshot = userRef.where("email", "==", email.trim().toLowerCase());

    //control if the user is already registered
    snapshot.get().then((snapshot) => {
      if (snapshot.empty) {
        auth.createUserWithEmailAndPassword(
          email.trim().toLowerCase(),
          password
        );

        const userdata = {
          email: email.trim().toLowerCase(),
          role: "Utilisateur",
        };
        db.collection("User").add(userdata);
      }

      snapshot.forEach((doc) => {
        navigation.goBack();
      });
    });
  };
  return (
    <View style={Styles.container}>
      <ImageBackground
        source={require("../../assets/Images/course_a_pied.jpg")}
        resizeMode="cover"
        style={Styles.imageBackground}
      >
        <Animable.View animation="fadeInUpBig" style={Styles.header}>
          <View style={Styles.action}>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  placeholder="Email"
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
          <View style={Styles.action}>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  placeholder="Password"
                  mode="outlined"
                  secureTextEntry
                  style={Styles.textInput}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="password"
              rules={{ required: true }}
              defaultValue=""
            />
          </View>
          <View style={Styles.action}>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  placeholder="Confirm Password"
                  mode="outlined"
                  secureTextEntry
                  style={Styles.textInput}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="passwordConf"
              rules={{
                required: true,
                validate: (value) =>
                  value === password.current ||
                  "Les mots de passe ne correspondent pas",
              }}
              defaultValue=""
            />
          </View>
          <View style={Styles.containerBtn}>
            <TouchableOpacity
              style={[
                Styles.btn,
                {
                  backgroundColor: "#FB7445",
                  borderRadius: 10,
                  width: 200,
                  marginBottom: 20,
                  marginTop: 10,
                },
              ]}
              onPress={handleSubmit(onSubmit)}
            >
              <LinearGradient
                colors={["#FB7445", "#FB7445"]}
                Styles={Styles.btn}
              >
                <Text style={[Styles.textBtn, { color: "black" }]}>
                  Inscrivez-vous
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                Styles.btn,
                { borderColor: "#FB7445", borderWidth: 1, marginTop: 15 },
              ]}
              onPress={() => navigation.goBack()}
            >
              <Text style={[Styles.textBtn, { color: "#FB7445" }]}>
                Connectez-vous
              </Text>
            </TouchableOpacity>
          </View>
        </Animable.View>
        <View style={Styles.footer}>
          <Text style={Styles.textFooter}>Inscrivez-vous dès maintenant !</Text>
        </View>
      </ImageBackground>
    </View>
  );
};
const Styles = StyleSheet.create({
  container: {
    height: height,
    paddingTop: 20,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flex: 4,
    backgroundColor: "rgba(249, 249, 249, 0.40)",
    borderBottomLeftRadius: 30,
    borderBottomLeftRadius: 30,
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
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    width: "100%",
    backgroundColor: "rgba(0,0,0, 0.00)",
  },
  containerBtn: {
    alignItems: "center",
  },
  btn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textBtn: {
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    flex: 3,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 70,
  },
  textFooter: {
    color: "#FB7445",
    fontWeight: "bold",
    fontSize: 30,
  },
});
