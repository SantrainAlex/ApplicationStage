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
import { db } from "../firebase";
let id = "";

export default Popup = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const Update = async (id) => {
    const cityRef = db.collection("Activités").doc(id);

    const res = await cityRef.update({ finish: "true" });
    props.nav.goBack();
  };

  const ModifFinish = async (Prenom) => {
    const query = db.collection("Activités").where("Nom", "==", Prenom);

    query.onSnapshot((querySnapshot) => {
      id = "";
      querySnapshot.forEach((doc) => {
        id = doc.id;
        Update(doc.id);
      });
    });
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
          <Text style={styles.modalText}>Tu es sur que l'activé et fini ?</Text>
          <TouchableOpacity
            style={[styles.buttonClose]}
            onPress={() => ModifFinish(props.prenom)}
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

      <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
        <Image
          source={require("../assets/Images/finish.png")}
          style={styles.logo_rezet}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: 50,
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
  button: {
    borderRadius: 20,
    padding: 10,
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
});
