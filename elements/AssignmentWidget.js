import React, {Component} from 'react'
import {ScrollView,View,TextInput} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import WidgetService from '../services/WidgetService'
import * as constantElements from '../elements/index'

class AssignmentWidget extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Assignment',
            headerRight: <constantElements.GoToHome navigation={navigation}/>,
            headerTitleStyle: {textAlign: 'center', alignSelf: 'center', width: '80%', color: 'white'},
            headerStyle: {
                backgroundColor: '#007BFF'
            }
        }};
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            points: 0,
            pointsInString: '',
            widgetId: 0,
            isValidPoints: false
        };

        this.widgetService = WidgetService.getInstance();
    }

    componentDidMount() {
        const widgetId = this.props.navigation.getParam("widgetId", 1);
        this.setState({ widgetId: widgetId });
        this.findAssignmentWidget(widgetId);
    }

    findAssignmentWidget(widgetId) {
        this.widgetService
            .findAssignmentWidgetById(widgetId)
            .then((assignmentWidget) => {
                if(assignmentWidget !== null)
                {

                    this.setState({title: assignmentWidget.title === null ? '' : assignmentWidget.title});
                    this.setState({description: assignmentWidget.description === null ? '' : assignmentWidget.description});
                    let points = assignmentWidget.points === null ? 0 : assignmentWidget.points;
                    this.setState({points: points});
                    this.setState({pointsInString: points.toString()});
                }
            });

    }

    updateForm(newState) {
        this.setState(newState)
    }

    updatePoints(newValue) {
        let points = Number(newValue);
        if(isNaN(points))
        {
            this.state.isValidPoints = false
        }
        else
        {
            this.state.isValidPoints = true;
            this.setState({points: points});
            this.setState({pointsInString: newValue});
        }
    }

    render() {
        return(
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput value={this.state.title}
                           onChangeText={ text => this.updateForm({title: text})}
                />
                {this.state.title === '' &&
                    <FormValidationMessage>Title is required</FormValidationMessage>}

                <FormLabel>Description</FormLabel>
                <FormInput value={this.state.description} onChangeText={
                    text => this.updateForm({description: text})
                }/>
                {this.state.description === '' &&
                    <FormValidationMessage>Description is required</FormValidationMessage>}

                <FormLabel>Points</FormLabel>
                <FormInput value={this.state.pointsInString}
                           onChangeText={
                    text => this.updatePoints(text)
                }/>
                {!this.state.isValidPoints &&
                    <FormValidationMessage>Points are required</FormValidationMessage>}

                <Button	backgroundColor="green"
                           color="white"
                           title="Save"/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"/>

                <Text h3>Preview</Text>
                <View style={{flexDirection: 'column'}}>
                    <Text>tt</Text>
                    <Text>adf</Text>
                    <Text>tt</Text>
                    <Text>adf</Text>
                    <Text>tt</Text>
                    <Text>adf</Text>
                </View>
            </ScrollView>
        )
    }
}

export default AssignmentWidget;