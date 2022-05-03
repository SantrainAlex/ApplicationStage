import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { KmSelectService } from "../_services/KmSelect.service";
//screen
import KmEnCour from "./KmEnCour";

let countries = [];
let NomSelectionner = "";
const ListKm = (props) => {
  useEffect(() => {
    if (props.data) {
      for (let index = 0; index < props.data.length; index++) {
        countries.push(props.data[index]);
      }
    }
  }, [props]);

  function select(ARGselectionner) {
    NomSelectionner = ARGselectionner;
  }
  return (
    <View>
      <SelectDropdown
        data={countries}
        buttonStyle={{
          marginTop: 10,
          marginRight: 50,
          width: 250,
          backgroundColor: "#FB7445",
          borderRadius: 30,
        }}
        rowStyle={{ backgroundColor: "#FB7445", color: "#EE373F" }}
        defaultButtonText="sectionner votre Activiter"
        defaultValue={countries[0]}
        onSelect={(selectedItem, index) => {
          select(selectedItem);
          KmSelectService.clearKmSelectService();
          KmSelectService.sendKmSelectService(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
      />
    </View>
  );
};
export default ListKm;
