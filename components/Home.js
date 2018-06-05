import React, {Component} from 'react'
import {View,StyleSheet,ScrollView} from 'react-native'
import {Text,Button} from 'react-native-elements'
export default class Home extends Component {
    static navigationOptions = {
        title: 'Home',
        headerTitleStyle: {textAlign: 'center',alignSelf:'center',width: '90%',color:'white'},
        headerStyle: {
            backgroundColor: '#007BFF'
        }
    };
    render() {
        return(
            <ScrollView>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                    <Text h2>Course Manager</Text>
                    <Button title="Course List"
                            rounded
                            backgroundColor='#28A745'
                            onPress={() => this.props.
                    navigation.navigate("CourseList")}/>
                </View>
                <View style={styles.container}>
                    <View style={styles.viewStyleOne}><Text>LLLLL</Text></View>
                    <View style={styles.viewStyleOne}><Text>YYYYY</Text></View>
                </View>
            </ScrollView>
        );
    }
};


let styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    viewStyleOne: {
        padding: 15,
        justifyContent: 'center',
        alignItems:'center'
    },
    textStyle:{
        textAlign:'center'
    }
});