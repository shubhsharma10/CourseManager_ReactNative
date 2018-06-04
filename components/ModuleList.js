import React, {Component} from 'react'
import * as constants from '../constants/index'
import * as constantElements from '../elements/index'
import {View} from 'react-native'
import {ListItem,Icon} from 'react-native-elements'

export default class ModuleList extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Modules',
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
        this.state = {
            modules: [],
            courseId: 1
        }
    }

    componentDidMount() {
        const courseId = this.props.navigation.getParam("courseId", 1);
        this.setState({
            courseId: courseId
        });
        fetch(constants.MODULE_API_URL.replace('CID',courseId))
            .then(response => (response.json()))
            .then(modules => this.setState({modules: modules}))
    }

    render(){
        return(
            <View>
                {this.state.modules.map((module,index) =>
                    (<ListItem
                        title={module.title}
                        key={index}
                        onPress={() => this.props.
                        navigation.navigate("LessonList",
                            {
                                courseId: this.state.courseId,
                                moduleId: module.id
                            })}/>
                    ))}
            </View>
        )
    }
}