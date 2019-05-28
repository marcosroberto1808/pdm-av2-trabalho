import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert
} from "react-native";
import axios from "axios";

import { CheckBox } from "react-native-elements";

export class EditItems extends React.Component {

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
    const { navigation } = this.props;
    const item = this.props.navigation.getParam('item')

    console.log(item)
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Nome"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleNome}
          value={item[1].nome}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Valor"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleValor}
          value={item[1].valor}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Imagem"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleImagem}
          value={item[1].img}
        />
        <CheckBox
          title="Produto em Destaque"
          checked={item[1].destaque}
          onPress={() => this.setState({ checked: !this.state.checked })}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() =>
            this.checkDados(
              item[1].nome,
              item[1].valor,
              item[1].img,
              item[1].destaque
            )
          }
        >
          <Text style={styles.submitButtonText}> Validar </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() =>
            this.editar(
              this.state.nome,
              this.state.valor,
              this.state.img,
              this.state.checked
            )
          }
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
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    color: "white"
  }
});
