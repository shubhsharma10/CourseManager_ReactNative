import React, {Component} from 'react'
import * as constants from '../constants/index'
import * as constantElements from '../elements/index'
import {View,Alert} from 'react-native'
import {ListItem} from 'react-native-elements'

export default class ModuleList extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Topics',
            headerRight:  <constantElements.GoToHome navigation={navigation}/>,
            headerTitleStyle: {textAlign: 'center', alignSelf: 'center', width: '80%', color: 'white'},
            headerStyle: {
                backgroundColor: '#007BFF'
            }
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
                        onPress={() => this.props.
                        navigation.navigate("WidgetList",
                            {
                                topicId: topic.id
                            })}
                        />
                    ))}
            </View>
        )
    }
}