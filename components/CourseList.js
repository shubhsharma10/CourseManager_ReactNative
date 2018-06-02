import React, {Component} from 'react'
import * as constants from '../constants/index'
import {View} from 'react-native'
import {ListItem} from 'react-native-elements'

export default class CourseList extends Component {
    static navigationOptions = {
        title: 'Courses',
        headerTitleStyle: {textAlign: 'center',alignSelf:'center',width: '70%',color:'white'},
        headerStyle: {
            backgroundColor: '#007BFF'
        }};
    constructor(props) {
        super(props);
        fetch(constants.COURSE_API_URL)
            .then((response) => (response.json()))
            .then(courses =>
            {
                this.setState({courses:courses});
            });
        this.state = {courses: []}
    }

    render(){
        return(
            <View>
                {this.state.courses.map((course,index) =>
                    (<ListItem
                    title={course.title}
                    key={index}
                    onPress={() => this.props.
                    navigation.navigate("ModuleList",
                        {courseId: course.id})}/>))}
            </View>
        )
    }
}