import React from 'react';
import {
    ScrollView,
    TouchableOpacity,
    View,
    Text,
    TextInput,
    Image,
    StyleSheet
} from "react-native";
import { Button } from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo';
import { db } from "../config/db";

const colors = ['#F0FF19', '#00ff00']
const title = 'Pesquisar Produtos'

export class SearchItems extends React.Component {
    static navigationOptions = {
        header: null,

    };

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            pesquisa: "",
            search: false,
            testes: null,
        };
    }

    componentDidMount() {
        this.getProdutos();
    }

    handlePesquisa = e => {
        this.setState({
            pesquisa: e
        });
    };

    getProdutos = () => {
        db.ref("produtos/").on("value", snapshot => {

            // this.setState({ data: snapshot.val() });
            // this.setState({ testes: Object.entries(snapshot.val()) });
            this.setState({ data: Object.entries(snapshot.val()) });
        });
    };

    onViewDetailsPress = (item) => {
        // console.log(item);
        this.props.navigation.navigate("Detalhes", { item })
    }

    render() {
        // let filteredItems = Object.entries(this.state.data);
        return (

            <LinearGradient style={styles.container} colors={colors}>
                <Text style={styles.text}>{title}</Text>

                <View style={styles.searchBox} >
                    <View style={{width: 250}}>
                    <TextInput
                        style={styles.searchInput}
                        underlineColorAndroid="transparent"
                        placeholder="Pesquisar"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        onChangeText={this.handlePesquisa}
                        value={this.state.pesquisa}
                    />
                    </View>
                    <View>
                    <Button
                        icon={
                            <FontAwesome
                                style={{ backgroundColor: 'transparent' }}
                                name="search"
                                size={24}
                            />
                        }
                        // title=" Pesquisar"
                        onPress={() => {
                            console.log(this.state.pesquisa)
                            // console.log(this.state.data)
                            let filteredItems = this.state.data.filter((lista) => {
                                return lista[1].nome.toLowerCase().indexOf(this.state.pesquisa.toLowerCase()) !== -1
                            }

                            );
                            console.log(filteredItems)
                            // console.log(this.state.testes[0][0])
                        }
                        }
                    />
                    </View>
                </View>

                {/* Destaques Box */}
                <View style={styles.listaBox}>
                    <Text style={styles.searchResult}>Resultado</Text>
                    <ScrollView horizontal={false} showsHorizontalScrollIndicator={true}>
                        {!this.state.data && <Text>Aguarde...</Text>}
                        {this.state.data &&
                            this.state.data.map(item => {
                                if (item[1].nome.toLowerCase().indexOf(this.state.pesquisa.toLowerCase()) !== -1) {
                                    return (
                                        <View key={item[0]}>
                                            <TouchableOpacity style={styles.itemStyle}
                                                onPress={() => {
                                                    // console.log(item);
                                                    this.onViewDetailsPress(item)
                                                }
                                                }
                                            >
                                                <Text style={{ padding: 20 }}>
                                                    {item[1].nome} - R$ {item[1].valor}
                                                </Text>
                                                <Image
                                                    style={styles.itemImageStyle}
                                                    source={{ uri: item[1].image }}
                                                    resizeMode="center"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    );
                                }
                            })}
                    </ScrollView>
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
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    text: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
    searchBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 8,
        // margin: 8,

    },
    searchInput: {
        margin: 6,
        padding: 6,
        height: 42,
        // width: 100,
        borderColor: "#7a42f4",
        borderWidth: 1
    },
    listaBox: {
        // flex: 0.7,
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
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
        width: 160,
        height: 160

    },
    searchResult: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        padding: 10,
        margin: 10,
    },
    // FIM
});