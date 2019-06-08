import React from 'react';
// import { TabNavigator } from 'react-navigation';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo';


const colors = ['#4c669f', '#3b5998', '#192f6a']
const title = 'Lista de compras - Em construção'


export class UserCart extends React.Component {
    static navigationOptions = {
        header: null,

    };

    render() {
        return (
            <LinearGradient style={styles.container} colors={colors}>
                <Text style={styles.text}>{title}</Text>
            </LinearGradient>
        );
    }
};

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
});
