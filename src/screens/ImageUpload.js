import React from "react";
import { Image, StyleSheet, Button, Text, View, Alert } from "react-native";
import { ImagePicker, Permissions } from "expo";
import { storage } from "../config/db";
import uuid from 'uuid';

export class ImageUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      uploading: false,
    };
  }

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  onChooseImagePress = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);

  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
        console.log(this.state.image)
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };
  
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

async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = storage
    .ref()
    .child("images/" + uuid.v4());
  const snapshot = await ref.put(blob);

  blob.close();

  return await snapshot.ref.getDownloadURL();
}