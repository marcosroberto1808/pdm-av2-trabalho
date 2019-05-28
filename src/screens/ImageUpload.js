import React from "react";
import { Image, StyleSheet, Button, Text, View, Alert } from "react-native";
import { ImagePicker, Permissions } from "expo";
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAx_k_5yZvOcmORZbvAYT8Ce94KCYC4P6E",
  authDomain: "myfood-73b65.firebaseapp.com",
  databaseURL: "https://myfood-73b65.firebaseio.com",
  projectId: "myfood-73b65",
  storageBucket: "myfood-73b65.appspot.com",
  messagingSenderId: "721790040542",
  appId: "1:721790040542:web:4d2b72a621ce8a36"
};

export class ImageUpload extends React.Component {

  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.state = {
      data: null
    };
  }

onChooseImagePress = async () => {
    let result = await ImagePicker.launchCameraAsync();

    if(!result.cancelled) {
        this.uploadImage(result.uri, "test-image");
    }
}

uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = Firebase.storage().ref().child("images/" + imageName);
    return ref.put(blob)
}


  render() {
    return (
    <View style={styles.container}>
        <Button title="Escolha a imagem..." onPress={this.onChooseImagePress} />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, alignItems: "center" }
});
