import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet
} from "react-native";
import { db } from "../config/db";

export class Home extends React.Component {
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
      // console.log(snapshot.val());
      this.setState({ data: snapshot.val() });
    });
  };

  render() {
    const { width } = Dimensions.get("window");
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
                // console.log(e);
                return (
                  <View key={e[0]}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Detalhes", { e })}
                    >
                      <Text style={{ padding: 20 }}>
                        {e[1].nome} - R$ {e[1].valor}
                      </Text>
                      <Image
                        source={{ uri: e[1].image }}
                        style={{ width, height }}
                        resizeMode="center"
                      />
                    </TouchableOpacity>
                  </View>
                );
              }
            })}
        </ScrollView>

        <Text style={{ paddingTop: 30 }}>Lista de Produtos</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
          {!this.state.data && <Text>Aguarde...</Text>}
          {this.state.data &&
            Object.entries(this.state.data).map(e => {
              if (e[1].destaque == false) {
                // console.log(e);
                return (
                  <View key={e[0]}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Detalhes", { e })}
                    >
                      <Text style={{ padding: 20 }}>
                        {e[1].nome} - R$ {e[1].valor}
                      </Text>
                      <Image
                        source={{ uri: e[1].image }}
                        style={{ width, height }}
                        resizeMode="center"
                      />
                    </TouchableOpacity>
                  </View>
                );
              }
            })}
        </ScrollView>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => navigation.navigate("AddItems")}
        >
          <Text style={styles.submitButtonText}> Adicionar item </Text>
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
