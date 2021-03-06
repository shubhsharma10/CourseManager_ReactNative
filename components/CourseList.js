import React, {Component} from 'react'
import * as constants from '../constants/index'
import * as constantElements from '../elements/index'
import {View,ScrollView} from 'react-native'
import {ListItem,Icon} from 'react-native-elements'

export default class CourseList extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Courses',
            headerLeft:(<View style={{padding: 10}}>
                <Icon name="chevron-left"
                      onPress={() => navigation.goBack()}
                      size={30}
                      color="white"/>
            </View>),
            headerRight: <constantElements.GoToHome navigation={navigation}/>,
            headerTitleStyle: {textAlign: 'center', alignSelf: 'center', width: '80%', color: 'white'},
            headerStyle: {
                backgroundColor: '#007BFF'
            }
        }};
    constructor(props) {
        super(props);
        fetch(constants.COURSE_API_URL)
            .then((response) => (response.json()))
            .then(courses =>
            {
                this.setState({courses:courses});
            })
            .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });
        this.state = {courses: []}
    }

    render(){
        return(
            <ScrollView style={{padding: 10}}>
                {this.state.courses.map((course,index) =>
                    (<ListItem
                    title={course.title}
                    key={index}
                    onPress={() => this.props.
                    navigation.navigate("ModuleList",
                        {courseId: course.id})}/>))}
            </ScrollView>
        )
    }
}