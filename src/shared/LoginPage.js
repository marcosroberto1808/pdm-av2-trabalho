import React from 'react';
// import { TabNavigator } from 'react-navigation';
import { View, Text, StyleSheet, Image, } from 'react-native';
import { LinearGradient } from 'expo';
import { Button } from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';

import * as firebase from 'firebase';

const colors = ['#4c669f', '#3b5998', '#192f6a']
const title = 'Tela de Login'

const initialState = {
  userInfo: null,
  userProfileImage: null,

};

export class LoginPage extends React.Component {
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

  //Facebook login
  async loginWithFacebook() {
    try {
      const {
        type,
        token,
      } = await Expo.Facebook.logInWithReadPermissionsAsync('365024997476875', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        const credential = firebase.auth.FacebookAuthProvider.credential(token)
        //this.props.navigation.navigate('Second', {});
        firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
          console.log(error)
        })
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,first_name,email,birthday,picture.height(300)`);
        const userInfo = await response.json();
        this.setState({ userInfo });
        this.setState({ userProfileImage: "https://graph.facebook.com/" + userInfo.id + "/picture?height=300" });

      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  render() {
    return (
      <LinearGradient style={styles.container} colors={colors}>
        <Text style={styles.text}>{title}</Text>
        <View style={styles.itemBox}>
          {!this.state.userProfileImage &&
            <View>
              <Text style={styles.itemTitle}> Seja bem vindo. Faça seu login para continuar</Text>
              <Button
                icon={
                  <FontAwesome
                    style={{ backgroundColor: 'transparent' }}
                    name="facebook-official"
                    size={24}
                  />
                }
                title=" Login com Facebook"
                onPress={() => {
                  this.loginWithFacebook()
                }
                }
              />
            </View>
          }

          {/* <View>
          <Button
            icon={
              <FontAwesome
                style={{ backgroundColor: 'transparent' }}
                name="facebook-official"
                size={24}
              />
            }
            title=" Testar dados"
            onPress={() => {
              console.log(this.state)
            }
            }
          />
        </View> */}
          <View>
            {this.state.userProfileImage &&
              <View style={styles.itemBox}>
                <Image
                  style={styles.itemImageStyle}
                  source={{ uri: this.state.userProfileImage }}
                  resizeMode="stretch"
                />
                <Text style={styles.itemTitle}>Você está logado como: {this.state.userInfo.first_name}</Text>
                <View>
                  <Button
                    title=" Continuar"
                    onPress={() => {
                      console.log(this.state)
                      this.props.navigation.navigate("Home", this.state.userInfo)

                    }
                    }
                  />
                </View>
                <View style={{margin: 40}}>
                  <Button
                    title=" Desconectar"
                    onPress={() => {
                      console.log(this.state)
                      firebase.auth().signOut()
                      this.resetState()

                    }
                    }
                  />
                </View>
              </View>
            }
          </View>
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
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  itemBox: {
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    margin: 8,

  },
  itemTitle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    padding: 10,
    margin: 10,
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
    width: 200,
    height: 200,

  },
});