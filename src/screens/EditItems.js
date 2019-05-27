import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from "react-native";
import axios from "axios";

import { CheckBox } from "react-native-elements";

export class EditItems extends React.Component {
  state = {
    nome: "",
    valor: "",
    img: ""
  };
  handleNome = text => {
    this.setState({ nome: text });
  };
  handleValor = text => {
    this.setState({ valor: text });
  };
  handleImagem = text => {
    this.setState({ img: text });
  };

  login = (nome, valor, imagem, destaque) => {
    alert(
      "nome: " +
        nome +
        " valor: " +
        valor +
        " img: " +
        imagem +
        " destaque: " +
        destaque
    );
  };

  editar = (nome, valor, imagem, destaque) => {
     const produto = {
         "nome": nome,
         "valor": valor,
         "img": imagem,
         "destaque": destaque
     }
     axios.post('https://myfood-73b65.firebaseio.com/produtos.json', produto);
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
          checked={this.state.checked}
          onPress={() => this.setState({ checked: !this.state.checked })}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() =>
            this.login(
              this.state.nome,
              this.state.valor,
              this.state.img,
              this.state.checked
            )
          }
        >
          <Text style={styles.submitButtonText}> Inserir </Text>
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
