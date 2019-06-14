import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert
} from "react-native";
import { CheckBox } from "react-native-elements";
import { LinearGradient } from 'expo';

const colors = ['#ffad73', '#ff6666', '#ff0000']
const title = 'Detalhes'

const initialState = {
    id: "",
    nome: "",
    valor: "",
    image: "",
    checked: false,
    uploading: false,
    tmp_uri: "",
    loading: false,
    imageChange: false,
};

export class Detalhes extends React.Component {
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

    // Carregar dados
    _fetchData = () => {
        if (this.props.navigation.getParam("item")){

            const item = this.props.navigation.getParam("item");
            setTimeout(() => {
                this.setState({
                    id: item[0],
                    nome: item[1].nome,
                    valor: item[1].valor,
                    image: item[1].image,
                    checked: item[1].destaque,
                })
            }, 120)
        }
        else {
            this.resetState()
            Alert.alert(
                "Produto não selecionado",
                "Selecione um produto na tela inicial.",
                [
                  {
                    text: "OK",
                    onPress: () => {
                      // Voltar para HOME
                      this.props.navigation.navigate("Home");
                    }
                  }
                ],
                { cancelable: false }
              );
        }
    }

    onEditPress = () => {
        const item = this.props.navigation.getParam("item");
        // console.log(item);
        this.props.navigation.navigate("EditItems", { item })
    }

    render() {
        return (
            <LinearGradient style={styles.container} colors={colors}>
                <Text style={styles.text}>{title}</Text>
                {/* Item Box */}
                <View style={styles.itemBox}>

                    <Text style={styles.itemTitle}>ID: {this.state.id}</Text>
                    <Text style={{ padding: 20 }}>
                        {this.state.nome} - R$ {this.state.valor}
                    </Text>
                    <CheckBox
                        title="Produto em Destaque"

                        checked={this.state.checked}
                    // onPress={() => this.setState({ checked: !this.state.checked })}
                    />

                    <Image
                        style={styles.itemImageStyle}
                        source={{ uri: this.state.image }}

                        resizeMode="center"

                    />

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={() => {
                            // console.log(item);
                            this.onEditPress()
                        }
                        }
                    >
                        <Text style={styles.submitButtonText}> Editar </Text>
                    </TouchableOpacity>
                </View>

            </LinearGradient>
        );
    }
};

// Estilos
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 8,
    },
    text: {
        fontSize: 36,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
    itemTitle: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
    submitButton: {
        backgroundColor: "#7a42f4",
        padding: 10,
        margin: 15,
        height: 40
    },
    submitButtonText: {
        color: "white"
    },
    itemBox: {
        flex: 1.1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 8,
        // margin: 8,
    
      },
    itemStyle: {
        borderWidth: 1.0,
        borderRadius: 4,
        borderColor: "black",
        padding: 10,
        margin: 5,
        alignItems: 'center',

    },
    itemImageStyle: {
        width: 300,
        height: 300

    },
});