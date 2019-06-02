import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet
} from "react-native";
import { LinearGradient } from 'expo';
import { db } from "../config/db";

const colors = ['#F0FF19', '#00ff00']
const title = 'Home'

export class Home extends React.Component {
  static navigationOptions = {
    header: null,

  };

  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    this.getProdutos();
  }
  getProdutos = () => {
    db.ref("produtos/").on("value", snapshot => {

      this.setState({ data: snapshot.val() });
    });
  };

  onViewDetailsPress = (item) => {
    // console.log(item);
    this.props.navigation.navigate("Detalhes", { item })
  }

  render() {
    return (

      <LinearGradient style={styles.container} colors={colors}>
        <Text style={styles.text}>{title}</Text>

        {/* Destaques Box */}
        <View style={styles.destaquesBox}>
          <Text>Destaques</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
            {!this.state.data && <Text>Aguarde...</Text>}
            {this.state.data &&
              Object.entries(this.state.data).map(item => {
                if (item[1].destaque == true) {
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

        {/* Lista Box */}
        <View style={styles.destaquesBox}>
          <Text style={{ paddingTop: 30 }}>Lista de Produtos</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
            {!this.state.data && <Text>Aguarde...</Text>}
            {this.state.data &&
              Object.entries(this.state.data).map(item => {
                if (item[1].destaque == false) {
                  // console.log(e);
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
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 8,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  destaquesBox: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 8,
    // margin: 8,

  },
  listaBox: {
    flex: 0.5,
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
    width: 160,
    height: 160

  },
  // FIM
});