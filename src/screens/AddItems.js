import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
  Button
} from "react-native";
import Modal from "react-native-modal";
import { CheckBox } from "react-native-elements";
import { ImagePicker, Permissions } from "expo";
import { addItem } from "../services/ItemService";
import { storage } from "../config/db";
import uuid from "uuid";

const initialState = {
  nome: "",
  valor: "",
  image: "",
  checked: false,
  uploading: false,
  tmp_uri: "",
  loading: false
};

export class AddItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  resetState() {
    this.setState(initialState);
  }

  // Permissoes
  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  // Tirar foto
  takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true
      // aspect: [16, 16]
    });
    this.setState({ tmp_uri: pickerResult });
    console.log(this.state.tmp_uri);

    // this._handleImagePicked(pickerResult);
  };

  handlerSalvarDados = async () => {
    this.setState({ loading: true })
    await this._handleImagePicked(this.state.tmp_uri);
    await addItem(
      this.state.nome,
      this.state.valor,
      this.state.image,
      this.state.checked
    );
    this.setState({ loading: false })
    await Alert.alert("Confirmação", "Produto salvo com sucesso", [
      {
        text: "Voltar para Home",
        onPress: () => {
          this.props.navigation.navigate("Home");
          this.resetState()
        }
      },
      {
        text: "Adicionar outro",
        onPress: () => {
          this.props.navigation.navigate("AddItems");
          this.resetState()
        }
      }
    ]);
  }

  // Pegar da galeria
  pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true
      // aspect: [4, 3]
    });

    this.setState({ tmp_uri: pickerResult });
    console.log(this.state.tmp_uri);

    // this._handleImagePicked(pickerResult);
  };

  // HANDLERS
  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
        console.log(this.state.image);
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      this.setState({ uploading: false });
    }
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
      image: e
    });
  };

  handleSubmit = async () => {
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
            // Salvar item
            this.handlerSalvarDados();

            console.log("OK Pressed");
          }
        }
      ],
      { cancelable: false }
    );
  }

  // checkDados = (nome, valor, imagem, checked) => {
  //   Alert.alert(
  //     "nome: " +
  //     nome +
  //     " valor: " +
  //     valor +
  //     " img: " +
  //     imagem +
  //     " destaque: " +
  //     checked
  //   );
  // };

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
          value={this.state.image}
        />
        <CheckBox
          title="Produto em Destaque"
          checked={this.state.checked}
          onPress={() => this.setState({ checked: !this.state.checked })}
        />
        <View>
          <Image
            style={{ width: 120, height: 120, backgroundColor: "gray" }}
            source={{ uri: this.state.tmp_uri.uri }}
            resizeMode="center"
          />

          <View>
            <Modal isVisible={this.state.loading}>
              <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                // alignItems: 'center'
              }}>

                <View style={stylesModal.content}>
                  <Text>Salvando dados</Text>
                  <ActivityIndicator size="large" color="#0000ff" />
                  {/* <Button title="Hide modal"
                    onPress={() => {
                      this.setState({ loading: !this.state.loading })
                    }
                    } /> */}

                </View>
              </View>
            </Modal>
          </View>

          {/* <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              this.setState({ loading: !this.state.loading })
              // this.props.navigation.navigate("Loader")
            }
            }
          >
            <Text style={styles.submitButtonText}>Loading</Text>
          </TouchableOpacity> */}
          
          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.pickImage}
          >
            <Text style={styles.submitButtonText}>Escolher da Galeria</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.takePhoto}
          >
            <Text style={styles.submitButtonText}>Tirar Foto</Text>
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity
          style={styles.submitButton}
          onPress={() =>
            this.checkDados(
              this.state.nome,
              this.state.valor,
              this.state.image,
              this.state.checked
            )
          }
        >
          <Text style={styles.submitButtonText}> Verificar </Text>
        </TouchableOpacity> */}

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

const stylesModal = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: 200,

  }
});



async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const ref = storage.ref().child("images/" + uuid.v4());
  const snapshot = await ref.put(blob);

  blob.close();

  return await snapshot.ref.getDownloadURL();
}
