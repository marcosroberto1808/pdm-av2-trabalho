import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert
} from "react-native";
import { addItem } from '../services/ItemService';
import { CheckBox } from "react-native-elements";

export class AddItems extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      valor: "",
      img: ""
    };
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
      'Confirmação',
      'Deseja confirmar?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () => {
            addItem(this.state.nome,
              this.state.valor,
              this.state.img,
              this.state.checked);
            Alert.alert(
              'Alerta',
              'Produto salvo com sucesso',
              [
                { text: 'Voltar para Home', onPress: () => this.props.navigation.navigate('Home') },
                { text: 'Adicionar outro', onPress: () => this.props.navigation.navigate('AddItems') }

              ]

            )
            console.log('OK Pressed')
          }
        },
      ],
      { cancelable: false },
    );
  };

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
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Nome"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleNome}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Valor"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleValor}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Imagem"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleImagem}
        />
        <CheckBox
          title="Produto em Destaque"
          checked={this.state.checked}
          onPress={() => this.setState({ checked: !this.state.checked })}
        />

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
          <Text style={styles.submitButtonText}> Inserir </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() =>
            this.handleSubmit()
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
