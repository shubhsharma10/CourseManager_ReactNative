import React, {Component} from 'react'
import * as constants from '../constants/index'
import {View,Alert} from 'react-native'
import {ListItem} from 'react-native-elements'

export default class ModuleList extends Component {
    static navigationOptions = {
        title: 'Topics',
        headerTitleStyle: {textAlign: 'center',alignSelf:'center',width: '70%',color:'white'},
        headerStyle: {
            backgroundColor: '#007BFF'
        }};
    constructor(props) {
        super(props);
        this.state = {
            topics: [],
            courseId: 1,
            moduleId: 1,
            lessonId: 1
        }
    }

    componentDidMount() {
        const courseId = this.props.navigation.getParam("courseId", 1);
        const moduleId = this.props.navigation.getParam("moduleId", 1);
        const lessonId = this.props.navigation.getParam("lessonId", 1);
        this.setState({
            courseId: courseId,
            moduleId: moduleId,
            lessonId: lessonId
        });
        fetch(constants.TOPIC_API_URL.replace('CID',courseId).replace('MID',moduleId).replace('LID',lessonId))
            .then(response => (response.json()))
            .then(topics => this.setState({topics: topics}))
    }

    render(){
        return(
            <View>
                {this.state.topics.map((topic,index) =>
                    (<ListItem
                        title={topic.title}
                        key={index}
                        onPress={() => Alert.alert('You have clicked on: '+topic.title)}/>))}
            </View>
        )
    }
}