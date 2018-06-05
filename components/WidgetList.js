import React, {Component} from 'react'
import * as constants from '../constants/index'
import * as constantElements from '../elements/index'
import {ScrollView,View} from 'react-native'
import {ListItem,Icon} from 'react-native-elements'
import WidgetChooser from '../elements/WidgetChooser'
import WidgetService from '../services/WidgetService'

export default class WidgetList extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Widgets',
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
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            widgets: [],
            topicId: 1,
        };

        this.createWidget = this.createWidget.bind(this);
        this.goToWidgetEditor = this.goToWidgetEditor.bind(this);

        this.widgetService = WidgetService.getInstance();
    }

    goToWidgetEditor(widgetId,widgetType,topicId) {
        if(widgetType === 'Assignment')
        {
            this.props.navigation.navigate("AssignmentWidget",{ widgetId: widgetId, topicId: topicId});
        }
        else if(widgetType === 'Exam')
        {
            this.props.navigation.navigate("ExamWidget",{ widgetId: widgetId, topicId: topicId});
        }
    }

    createWidget(selectedIndex,widgetTitle) {
        if(selectedIndex === 1) {
            // Create Assignment widget
            let assignmentWidget = {title: widgetTitle,widgetType: 'Assignment'};
            this.widgetService
                .createAssignmentWidget(this.state.topicId,assignmentWidget)
                .then(() => {
                    this.findAllWidgetsForTopic(this.state.topicId);
                })

        }
        else {
            // Create Exam widget
            let examWidget = {title: widgetTitle,widgetType: 'Exam'};
            this.widgetService
                .createExamWidget(this.state.topicId,examWidget)
                .then(() => {
                    this.findAllWidgetsForTopic(this.state.topicId);
                })
        }
    }

    findAllWidgetsForTopic(topicId) {
        this.widgetService
            .findAllWidgetsForTopic(topicId)
            .then((widgets) => {
                if(widgets !== null)
                    this.setState({widgets: widgets});
            })
            .catch(function (response) {
                console.log('Error caught in find widgets for topic '+response);
            });
    }



    componentDidMount() {
        const topicId = this.props.navigation.getParam("topicId", 1);
        this.setState({
            topicId: topicId
        });
        this.findAllWidgetsForTopic(topicId);
    }

    componentWillReceiveProps(newProps) {
        const topicId = this.props.navigation.getParam("topicId", 1);
        this.setState({
            topicId: topicId
        });
        this.findAllWidgetsForTopic(topicId);
    }

    render() {
        return(
            <ScrollView>
                {this.state.widgets.map((widget,index) =>
                    (
                        <ListItem
                            title={widget.title}
                            key={index}
                            onPress={
                                () => this.goToWidgetEditor(widget.id,widget.widgetType,this.state.topicId)
                            }
                        />
                    ))}
                <WidgetChooser createWidget={this.createWidget}/>
            </ScrollView>

        );
    }
}