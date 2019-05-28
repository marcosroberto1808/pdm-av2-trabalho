import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert
} from "react-native";
import { removeItem, updateItem } from "../services/ItemService";
import { CheckBox } from "react-native-elements";

const initialState = {
  id: "",
  nome: "",
  valor: "",
  img: "",
  checked: false
};

export class EditItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    const item = this.props.navigation.getParam("item");
    this.state.id = item[0];
    this.state.nome = item[1].nome;
    this.state.valor = item[1].valor;
    this.state.img = item[1].img;
    this.state.checked = item[1].destaque;
  }
  resetState() {
    this.setState(initialState);
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
      "Deseja editar este item?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            updateItem(
              this.state.id,
              this.state.nome,
              this.state.valor,
              this.state.img,
              this.state.checked
            );
            // this.resetState();
            Alert.alert("Confirmação", "Produto atualizado com sucesso", [
              {
                text: "Voltar para Home",
                onPress: () => this.props.navigation.navigate("Home")
              },
              {
                text: "Continuar editando",
                onPress: () => this.props.navigation.navigate("EditItems")
              }
            ]);
            console.log("OK Pressed");
          }
        }
      ],
      { cancelable: false }
    );
  }

  handleDelete() {
    Alert.alert(
      "Confirmação",
      "Deseja apagar este item?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            removeItem(this.state.id)
            // this.resetState();
            Alert.alert("Confirmação", "Produto removido com sucesso", [
              {
                text: "Voltar para Home",
                onPress: () => this.props.navigation.navigate("Home")
              },
              // {
              //   text: "Continuar editando",
              //   onPress: () => this.props.navigation.navigate("EditItems")
              // }
            ]);
            console.log("OK Pressed");
          }
        }
      ],
      { cancelable: false }
    );
  }


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
          <Text style={styles.submitButtonText}> Validar </Text>
        </TouchableOpacity>
        {/* Atualizar item */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.handleSubmit()}
        >
          <Text style={styles.submitButtonText}> Atualizar </Text>
        </TouchableOpacity>
        {/* Apagar item */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={
            () => this.handleDelete()
            // console.log(item[0])
          }
        >
          <Text style={styles.submitButtonText}> Apagar item </Text>
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
