import React from 'react';
import { ScrollView, TouchableOpacity, View, Text, Image, Dimensions } from 'react-native';
import axios from 'axios';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }

    componentDidMount() {
        getProdutos()
            .then(response => {
                this.setState({ data: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { width } = Dimensions.get('window');
        const [height] = [120];
        const { navigation } = this.props;
        return (

            <View>
                <Text>Destaques</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                    {!this.state.data && <Text>Aguarde...</Text>}
                    {this.state.data &&
                        Object.entries(this.state.data).map(e => {
                            if (e[1].destaque == true) {
                                console.log(e);
                                return (
                                    <View key={e[0]}>
                                        <TouchableOpacity onPress={() => navigation.navigate('Detalhes', { e })}>
                                            <Text style={{ padding: 20 }}>
                                                {e[1].nome} - R$ {e[1].valor}
                                            </Text>
                                            <Image source={{ uri: e[1].img }} style={{ width, height }} />
                                        </TouchableOpacity>
                                    </View>
                                );
                            }
                        })}
                </ScrollView>

                <Text style={{ paddingTop: 30 }} >Lista de Produtos</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                    {!this.state.data && <Text>Aguarde...</Text>}
                    {this.state.data &&
                        Object.entries(this.state.data).map(e => {
                            if (e[1].destaque == false) {
                                console.log(e);
                                return (
                                    <View key={e[0]}>
                                        <TouchableOpacity onPress={() => navigation.navigate('Detalhes', { e })}>
                                            <Text style={{ padding: 20 }}>
                                                {e[1].nome} - R$ {e[1].valor}
                                            </Text>
                                            <Image source={{ uri: e[1].img }} style={{ width, height }} />
                                        </TouchableOpacity>
                                    </View>
                                );
                            }
                        })}

                </ScrollView>

                <TouchableOpacity onPress={() => navigation.navigate('AddItems')}>
                    <Text style={{ padding: 20 }}>
                        ADICIONAR ITEM
                    </Text>
                
                </TouchableOpacity>

            </View>
        );
    }
}

const getProdutos = () => axios.get('https://myfood-73b65.firebaseio.com/produtos.json');