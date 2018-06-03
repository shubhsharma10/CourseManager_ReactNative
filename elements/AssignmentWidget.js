import React, {Component} from 'react'
import {ScrollView,View,StyleSheet,TextInput} from 'react-native'
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
                <View>
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

                    <Text h3 style={styles.viewStyleOne}>Preview</Text>
                </View>
                <View style={styles.topContainer}>
                    <View style={styles.containerA}>
                        <View style={styles.viewStyleOne}>
                            <Text h3 style={styles.textStyle}>{this.state.title}</Text>
                        </View>
                        <View style={styles.viewStyleOne}>
                            <Text h3 style={styles.textStyle}>{this.state.points}pts</Text>
                        </View>
                    </View>
                    <View style={styles.containerB}>
                        <View style={styles.viewStyleOne}>
                            <Text style={styles.textStyle}>{this.state.description}</Text>
                        </View>
                    </View>
                    <View style={styles.containerC}>
                            <Text h4 style={styles.textStyle}>Essay Answer</Text>
                    </View>
                    <View style={styles.textAreaContainer} >
                        <TextInput
                            style={styles.textArea}
                            underlineColorAndroid="transparent"
                            placeholder={"Type something"}
                            placeholderTextColor={"grey"}
                            numberOfLines={5}
                            multiline={true}
                        />
                    </View>
                    <View style={styles.buttonContainer} >
                       <Button style={styles.buttonStyle} backgroundColor="red" color="white" title="Cancel"/>
                        <Button backgroundColor="green" color="white" title="Submit"/>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

let styles = StyleSheet.create({
    topContainer: {
        borderWidth: 1,
        borderColor: '#FF000000',
        backgroundColor: 'aqua',
        margin: 15
    },
    containerA: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    containerB: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    },
    containerC: {
        margin: 5,
        flexDirection: 'column',
        alignSelf: 'flex-start'
    },
    viewStyleOne: {
        margin: 5,
        justifyContent: 'center',
        alignItems:'center'
    },
    textStyle:{
        textAlign:'center',
        flexWrap: 'wrap'
    },
    textAreaContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        margin: 5,
        flex: 1
    },
    buttonContainer: {
        padding: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonStyle: {
        alignItems: 'center',
        margin: 5,
        justifyContent: 'flex-start'
    },
    textArea: {
        height: 150,
        alignItems: 'stretch',
        justifyContent: "flex-start"
    }
});

export default AssignmentWidget;