import React, { Component } from 'react'
import {
    ActivityIndicator,
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export class Loader extends React.Component {
    render() {
        return (
            <View style={[stylesLoading.container, stylesLoading.horizontal, stylesLoading.loading]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
}

const stylesLoading = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
})
