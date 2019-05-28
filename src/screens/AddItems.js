import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Image
} from "react-native";
import { ImagePicker, Permissions } from "expo";
import { addItem } from "../services/ItemService";

import { CheckBox } from "react-native-elements";

const initialState = {
  nome: "",
  valor: "",
  img: "",
  checked: false,
  photo: null
};

export class AddItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  resetState() {
    this.setState(initialState);
  }

  selectPicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      // aspect: 1,
      allowsEditing: true
    });
    if (!cancelled) {
      this.setState({ photo: uri });
    }
  };

  takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    const { cancelled, uri } = await ImagePicker.launchCameraAsync({
      allowsEditing: false
    });
    this.setState({ photo: uri });
  };

  handleNome = e => {
    this.setState({
      nome: e
    });
  };
  handleValor = e => {
    this.setState({
      valor: e
    });
  };
  handleImagem = e => {
    this.setState({
      img: e
    });
  };
  handleSubmit() {
    Alert.alert(
      "Confirmação",
      "Deseja salvar este item?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            addItem(
              this.state.nome,
              this.state.valor,
              this.state.img,
              this.state.checked
            );
            // this.uploadImage(this.state.photo, "teste-imagem"
            // );
            this.resetState();
            Alert.alert("Alerta", "Produto salvo com sucesso", [
              {
                text: "Voltar para Home",
                onPress: () => this.props.navigation.navigate("Home")
              },
              {
                text: "Adicionar outro",
                onPress: () => this.props.navigation.navigate("AddItems")
              }
            ]);
            console.log("OK Pressed");
          }
        }
      ],
      { cancelable: false }
    );
  }

  checkDados = (nome, valor, imagem, checked) => {
    Alert.alert(
      "nome: " +
        nome +
        " valor: " +
        valor +
        " img: " +
        imagem +
        " destaque: " +
        checked
    );
  };

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Nome"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleNome}
          value={this.state.nome}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Valor"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleValor}
          value={this.state.valor}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Imagem"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleImagem}
          value={this.state.img}
        />
        <CheckBox
          title="Produto em Destaque"
          checked={this.state.checked}
          onPress={() => this.setState({ checked: !this.state.checked })}
        />
        <View>
          <Image style={{width: 120, height: 120, backgroundColor: 'gray'}} source={{ uri: this.state.photo }} />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.selectPicture}
            
          >
            <Text style={styles.submitButtonText}>Galeria</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.takePicture}
            // onPress={this.onChooseImagePress}
          >
            <Text style={styles.submitButtonText}>Camera</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() =>
            this.checkDados(
              this.state.nome,
              this.state.valor,
              this.state.img,
              this.state.checked
            )
          }
        >
          <Text style={styles.submitButtonText}> Verificar </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.resetState()}
        >
          <Text style={styles.submitButtonText}> Limpar dados </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.handleSubmit()}
        >
          <Text style={styles.submitButtonText}> Salvar </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
