import React, {Component} from 'react'
import {View} from 'react-native'
import {Icon} from 'react-native-elements'

export const GoToHome = ({navigation}) => {
    return(
        <View style={{padding: 10}}>
            <Icon
                name='home'
                color='white'
                onPress={() => navigation.navigate("Home")}/>
        </View>);
};