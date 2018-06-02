import React, {Component} from 'react'
import * as constants from '../constants/index'
import * as constantElements from '../elements/index'
import {View} from 'react-native'
import {ListItem} from 'react-native-elements'

export default class ModuleList extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Lessons',
            headerRight:  <constantElements.GoToHome navigation={navigation}/>,
            headerTitleStyle: {textAlign: 'center', alignSelf: 'center', width: '80%', color: 'white'},
            headerStyle: {
                backgroundColor: '#007BFF'
            }
        }};
    constructor(props) {
        super(props);
        this.state = {
            lessons: [],
            courseId: 1,
            moduleId: 1
        }
    }

    componentDidMount() {
        const courseId = this.props.navigation.getParam("courseId", 1);
        const moduleId = this.props.navigation.getParam("moduleId", 1);
        this.setState({
            courseId: courseId,
            moduleId: moduleId
        });
        fetch(constants.LESSON_API_URL.replace('CID',courseId).replace('MID',moduleId))
            .then(response => (response.json()))
            .then(lessons => this.setState({lessons: lessons}))
    }

    render(){
        return(
            <View>
                {this.state.lessons.map((lesson,index) =>
                    (<ListItem
                        title={lesson.title}
                        key={index}
                        onPress={() => this.props.
                        navigation.navigate("TopicList",
                            {
                                courseId: this.state.courseId,
                                moduleId: this.state.moduleId,
                                lessonId: lesson.id
                            })}/>))}
            </View>
        )
    }
}