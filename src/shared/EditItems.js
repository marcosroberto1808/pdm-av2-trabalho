import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator
} from "react-native";
import Modal from "react-native-modal";
import { CheckBox, Button } from "react-native-elements";
import { ImagePicker, Permissions } from "expo";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo';

import { removeItem, updateItem, salvarImagemAsync, deletarImagemAsync } from "../services/ItemService";


const colors = ['#F0FF19', '#F3FF45', '#E6F056']
const title = 'Editar Item'

const initialState = {
  id: "",
  nome: "",
  valor: "",
  image: "",
  checked: false,
  uploading: false,
  tmp_uri: "",
  loading: false,
  deleting: false,
  imageChange: false,
};

export class EditItems extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = initialState;
  }
  resetState() {
    this.setState(initialState);
  }

  async componentWillMount() {
    // console.log('First this called');
    await this.props.navigation.addListener('willFocus', this._fetchData);
  }

  _fetchData = () => {
    const item = this.props.navigation.getParam("item");
    setTimeout(() => {
      // console.log('Our data is fetched');
      this.setState({
        id: item[0],
        nome: item[1].nome,
        valor: item[1].valor,
        image: item[1].image,
        checked: item[1].destaque,
      })
    }, 120)
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
    this.setState({ imageChange: true });
    console.log(this.state.tmp_uri);


  };

  handlerSalvarDados = async () => {
    if (this.state.imageChange){
      this.setState({ loading: true })
      await this._handleImagePicked(this.state.tmp_uri);
    }
    await updateItem(
      this.state.id,
      this.state.nome,
      this.state.valor,
      this.state.image,
      this.state.checked
    );
    this.setState({ loading: false })
    await Alert.alert("Confirmação", "Produto atualizado com sucesso", [
      {
        text: "Voltar para Home",
        onPress: () => {
          this.props.navigation.navigate("Home");
          this.resetState()
        }
      },
      {
        text: "Continuar editando",
        onPress: () => {
          this.props.navigation.navigate("AddItems");
          
        }
      }
    ]);
  }
  handlerDeletarDados = async () => {
    this.setState({ deleting: true })
    await deletarImagemAsync(this.state.image);
    await removeItem(this.state.id);
    this.setState({ deleting: false })
    this.resetState()
    await Alert.alert("Confirmação", "Produto removido com sucesso", [
      {
        text: "Voltar para Home",
        onPress: () => {
          this.props.navigation.navigate("Home");
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
    this.setState({ imageChange: true });
    console.log(this.state.tmp_uri);

  };

  // HANDLERS
  _handleImagePicked = async pickerResult => {
    let lastImageURL = this.state.image
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled && pickerResult.uri) {
        uploadUrl = await salvarImagemAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
        await deletarImagemAsync(lastImageURL);
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
    // console.log(e)
    // if (/^\d+$/.test(e)) {
    //   this.setState({
    //     valor: parseFloat(e / 100).toFixed(2)
    //   });
    // } else {
    //   this.setState({
    //     valor: ""
    //   });
    // }
    this.setState({ valor: e });
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
  handleDelete = async () => {
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
            // Deletar item
            this.handlerDeletarDados();

            console.log("OK Pressed");
          }
        }
      ],
      { cancelable: false }
    );
  }

  render() {
    return (
      <LinearGradient style={styles.container} colors={colors}>
        <Text style={styles.text}>{title}</Text>

        {/* Inputs */}
        <View>
          <TextInput
            style={stylesAddItem.input}
            underlineColorAndroid="transparent"
            placeholder="Nome"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={this.handleNome}
            value={this.state.nome}
          />
          <TextInput
            style={stylesAddItem.input}
            keyboardType='phone-pad'
            numeric value
            underlineColorAndroid="transparent"
            placeholder="Valor"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={this.handleValor}
            value={this.state.valor}
          />
          <CheckBox
            title="Produto em Destaque"
            checked={this.state.checked}
            onPress={() => this.setState({ checked: !this.state.checked })}
          />
          {/* Save/Clear Buttons */}
          <View>
            <View style={styles.imgBtnBox}>
              <View style={styles.imgButton}>
              <Button
                icon={
                  <MaterialIcons
                    style={{ backgroundColor: 'transparent' }}
                    name="delete"
                    size={24}
                  />
                }
                title=" Deletar"
                onPress={() => this.handleDelete()}
              />
              </View>
              <View style={styles.imgButton}>
              <Button
                icon={
                  <MaterialIcons
                    style={{ backgroundColor: 'transparent' }}
                    name="undo"
                    size={24}
                  />
                }
                title=" Desfazer"
                onPress={() => this.resetState()}
              />
              </View>
              <View style={styles.imgButton}>
              <Button
                icon={
                  <MaterialIcons
                    style={{ backgroundColor: 'transparent' }}
                    name="save"
                    size={24}
                  />
                }
                title=" Salvar"
                onPress={() => this.handleSubmit()}
              />
              </View>
            </View>
          </View>

        </View>

        {/* ImageBox */}
        <View style={styles.imageBox}>
          {/* <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} /> */}

          {!this.state.imageChange &&

            <Image style={styles.imageStyle}

              source={{ uri: this.state.image }}
            />
          }
          {this.state.imageChange &&

            <Image style={styles.imageStyle}

              source={{ uri: this.state.tmp_uri.uri }}
            />
          }

          <View style={styles.imgBtnBox}>
            <View style={styles.imgButton}>
              <Button
                icon={
                  <MaterialIcons
                    style={{ backgroundColor: 'transparent' }}
                    name="photo"
                    // color={tintColor}
                    size={24}
                  />
                }
                title=" Galeria"
                onPress={this.pickImage}
              />
            </View>

            <View style={styles.imgButton}>
              <Button
                icon={
                  <MaterialIcons
                    style={{ backgroundColor: 'transparent' }}
                    name="add-a-photo"
                    // color={tintColor}
                    size={24}
                  />
                }
                title=" Foto"
                onPress={this.takePhoto}
              />
            </View>
          </View>
        </View>

        {/* Modal Atualizando */}
        <View>
          <Modal isVisible={this.state.loading}>
            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              // alignItems: 'center'
            }}>

              <View style={stylesModal.content}>
                <Text style={stylesModal.text}>Atualizando dados do produto</Text>
                <ActivityIndicator size="large" color="#0000ff" />

              </View>
            </View>
          </Modal>
        </View>
        {/* Modal Apagando */}
        <View>
          <Modal isVisible={this.state.deleting}>
            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              // alignItems: 'center'
            }}>

              <View style={stylesModal.content}>
                <Text style={stylesModal.text}>Apagando produto!</Text>
                <ActivityIndicator size="large" color="#0000ff" />

              </View>
            </View>
          </Modal>
        </View>
      </LinearGradient>
    );
  }
};


// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  imageBox: {
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    margin: 8,

  },
  imageStyle: {
    width: 200,
    height: 200,
    backgroundColor: "gray",
    resizeMode: "stretch"
  },
  imgBtnBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  imgButton: {
    padding: 10,
    // margin: 6,
    width: 120,
    // height: 40,
  },
});

const stylesAddItem = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  input: {
    margin: 6,
    padding: 6,
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

  },
  text: {
    fontSize: 24,
    margin: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
});