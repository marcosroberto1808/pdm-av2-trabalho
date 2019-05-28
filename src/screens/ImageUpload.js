import React from "react";
import { Image, StyleSheet, Button, Text, View, Alert } from "react-native";
import { ImagePicker, Permissions } from "expo";
import { db, storage } from "../config/db";

export class ImageUpload extends React.Component {

onChooseImagePress = async () => {
    let result = await ImagePicker.launchCameraAsync();

    if(!result.cancelled) {
        this.uploadImage(result.uri, "test-image");
    }
}

uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = storage().ref().child("images/" + imageName);
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
