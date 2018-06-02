import React from 'react'
import {View} from 'react-native'
import {ListItem, Text} from 'react-native-elements'

export default class Exam extends React.Component {
    render() {
        return(
            <View style={{padding:10}}>
                <Text h2>Questions</Text>
                <ListItem title="Question 1" subtitle="True or false"/>
                <ListItem title="Question 2" subtitle="Multiple choice question"/>
                <ListItem/>
            </View>
        )
    }
};