import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { NewPrenomSelectService } from "../_services/Newprenom";

let id = "";
let newprenom = [];
export default Popup = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { control, handleSubmit } = useForm();
  let prenom;

  const onSubmit = (data) => {
    newprenom = [];
    let { prenom } = data;
    const userdata = {
      prenom: prenom,
    };
    //newprenom.push(sendparticipant);
    NewPrenomSelectService.sendNewPrenomSelectService(userdata.prenom);

    setModalVisible(!modalVisible);
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.action}>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  placeholder="Nom et prenom "
                  style={styles.textInput}
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
          <TouchableOpacity
            style={[styles.buttonClose]}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.textStyle}>Oui</Text>
          </TouchableOpacity>
          <Pressable
            style={[styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Non</Text>
          </Pressable>
        </View>
      </Modal>

      <Pressable
        style={styles.pressParticipant}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textParticipant}>Participant {props.item}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: 50,
  },
  pressParticipant: {
    width: 360,
  },
  textParticipant: {
    color: "#fff",
    textAlign: "center",
  },
  action: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#FB7445",
    paddingBottom: 5,
    paddingTop: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: "#FB7445",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 50,
    marginTop: 10,
  },
  textStyle: {
    marginBottom: 5,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  logo_rezet: {
    height: 40,
    width: 40,
    marginLeft: 3,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});
