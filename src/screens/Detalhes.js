import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox } from "react-native-elements";

export class Detalhes extends React.Component {

  render() {
    const { width } = Dimensions.get('window');
    const { navigation } = this.props;
    const item = this.props.navigation.getParam("e");
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>DETALHES TELA</Text>
        <Text style={{ padding: 20 }}>
          {item[1].nome} - R$ {item[1].valor}
        </Text>
        <CheckBox
          title="Produto em Destaque"
          checked={item[1].destaque}
          // onPress={() => this.setState({ checked: !this.state.checked })}
        />

        <Image source={{ uri: item[1].img }} style={{ width, height: 300 }} />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => navigation.navigate('EditItems', {item})}
        >
          <Text style={styles.submitButtonText}> Editar </Text>
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
