import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import * as Animable from "react-native-animatable";
import { auth } from "../../firebase";

// screen size
const { height } = Dimensions.get("screen");

export default LoginScreen = ({ navigation }) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    auth.signInWithEmailAndPassword(email.trim().toLowerCase(), password);
  };

  return (
    <View style={Styles.container}>
      <ImageBackground
        source={require("../../assets/Images/course_a_pied.jpg")}
        resizeMode="cover"
        style={Styles.ImageBackground}
      >
        <View style={Styles.header}>
          <View style={Styles.action}>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  placeholder="Email"
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  style={Styles.textInput}
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
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  style={Styles.textInput}
                />
              )}
              name="password"
              rules={{ required: true }}
              defaultValue=""
            />
          </View>
          <View style={Styles.containerButton}>
            <TouchableOpacity
              style={
                (Styles.btn,
                {
                  backgroundColor: "#FB7445",
                  borderRadius: 10,
                  width: 200,
                  marginBottom: 20,
                })
              }
              onPress={handleSubmit(onSubmit)}
            >
              <LinearGradient
                colors={["#FB7445", "#FB7440"]}
                style={Styles.btn}
              >
                <Text style={Styles.textBtn}>Se Connecter</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={(Styles.btn, { color: "#FB7445" })}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={(Styles.textBtn, { color: "#FB7445" })}>
                S'inscrire
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.footer}>
          <Text style={Styles.textFooter}>Bienvenue !</Text>
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
  ImageBackground: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    paddingTop: 50,
    backgroundColor: "rgba(249, 249, 249, 0.40)",
    flex: 3,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FB7445",
    paddingBottom: 5,
  },
  textInput: {
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.00)",
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
  containerButton: {
    alignItems: "center",
    marginTop: 50,
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
    flex: 4,
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  textFooter: {
    color: "#FB7445",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
});
