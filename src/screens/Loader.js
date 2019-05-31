import React, { Component } from "react";
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";

import { storage } from "../config/db";

// Apagar foto
apagarImagem = async () => {
    let uid = this.state.user.uid
    let img = event.target.name
    storage.ref().child(uid).child(img).delete()
    database.ref().child(uid).child(img).remove()
};



export class Loader extends React.Component {
         deletePhoto = async () => {
           let imagePath =
             "https://firebasestorage.googleapis.com/v0/b/myfood-73b65.appspot.com/o/images%2F2bfb177c-9cd3-4fd8-869e-3ff75f737d53?alt=media&token=325170b8-12c2-4ee9-8659-1af839432461";
           let name = imagePath.substr(
             imagePath.indexOf("%2F") + 3,
             imagePath.indexOf("?") - (imagePath.indexOf("%2F") + 3)
           );
           name = name.replace("%20", " ");
           let storagePath = storage.ref();
           storagePath.child(`images/${name}`).delete();
         };

         render() {
           return (
             <View
               style={[
                 stylesLoading.container,
                 stylesLoading.horizontal,
                 stylesLoading.loading
               ]}
             >
               <ActivityIndicator size="large" color="#0000ff" />

               <TouchableOpacity
                 style={styles.submitButton}
                 onPress={() => this.deletePhoto()}
               >
                 <Text style={styles.submitButtonText}>
                   {" "}
                   apagar foto{" "}
                 </Text>
               </TouchableOpacity>
             </View>
           );
         }
       }

const stylesLoading = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

const styles = StyleSheet.create({
    container: {
      paddingTop: 23
    },
    input: {
      margin: 6,
      height: 40,
      borderColor: "#7a42f4",
      borderWidth: 1
    },
    submitButton: {
      backgroundColor: "#7a42f4",
      padding: 10,
      margin: 6,
      height: 40
    },
    submitButtonText: {
      color: "white"
    }
  });