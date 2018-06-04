import React, {Component} from 'react'
import {View,ScrollView,StyleSheet,TextInput} from 'react-native'
import {Text, Button, CheckBox,FormLabel, FormInput, FormValidationMessage}
                                            from 'react-native-elements'
import WidgetService from '../services/WidgetService'
import * as constantElements from '../elements/index'

export default class TrueFalseQuestionEditor extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'True False Question',
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
            pointInStr: '',
            isTrue: true,
            isValidPoints: false,
            questionId: 0,
            widgetId: 0
        };

        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);

        this.widgetService = WidgetService.getInstance();
    }

    componentDidMount() {
        const widgetId = this.props.navigation.getParam("widgetId", 1);
        const questionId = this.props.navigation.getParam("questionId", 1);
        this.setState({ widgetId: widgetId });
        this.setState({ questionId: questionId });
        this.findTrueFalseQuestionById(questionId);
    }

    findTrueFalseQuestionById(questionId) {
        this.widgetService
            .findTrueFalseQuestionById(questionId)
            .then((question) => {
                if(question !== null)
                {
                    this.setState({title: question.title === null ? '' : question.title});
                    this.setState({description: question.description === null ? '' : question.description});
                    this.setState({isTrue: question.isTrue === null ? true : question.isTrue});
                    let points = question.points === null ? 0 : question.points;
                    this.setState({points: points});
                    this.setState({pointsInString: points.toString()});
                    if(points > 0)
                        this.setState({isValidPoints: true});
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

    saveQuestion() {

    }

    cancelChanges() {

    }
    deleteQuestion() {
        this.widgetService
            .deleteTrueFalseQuestion(this.state.widgetId)
            .then(() => {
                this.goToWidgetList();
            });
    }

    render() {
        return(
            <ScrollView style={{padding: 10}}>
                <View>
                    <FormLabel>Title</FormLabel>
                    <FormInput value={this.state.title}
                               onChangeText={ text => this.updateForm({title: text})}/>
                    {this.state.title === '' &&
                    <FormValidationMessage>Title is required</FormValidationMessage>}

                    <FormLabel>Description</FormLabel>
                    <FormInput value={this.state.description} onChangeText={
                        text => this.updateForm({description: text})}/>
                    {this.state.description === '' &&
                    <FormValidationMessage>Description is required</FormValidationMessage>}

                    <FormLabel>Points</FormLabel>
                    <FormInput value={this.state.pointsInString}
                               onChangeText={
                                   text => this.updatePoints(text)}/>
                    {!this.state.isValidPoints &&
                    <FormValidationMessage>Points are required</FormValidationMessage>}

                    <CheckBox onPress={() => this.updateForm({isTrue: !this.state.isTrue})}
                              checked={this.state.isTrue} title='The answer is true'/>

                    <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                        <View>
                            <Button	backgroundColor="green"
                                       color="white"
                                       title="Save"
                                       onPress={()=>this.saveQuestion()}/></View>
                        <View>
                            <Button	backgroundColor="red"
                                       color="white"
                                       title="Cancel"
                                       onPress={()=>this.cancelChanges()}/></View>
                    </View>
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
                        <Text h4 style={styles.textStyle}>Options</Text>
                    </View>
                    <View style={styles.textAreaContainer} >
                        <CheckBox title='True'/>
                        <CheckBox title='False'/>
                    </View>
                    <View style={styles.buttonContainer} >
                        <Button backgroundColor="red" color="white" title="Cancel"/>
                        <Button backgroundColor="green" color="white" title="Submit"/>
                    </View>
                </View>
                <View>
                    <Button	backgroundColor="red"
                               color="white"
                               title="Delete"
                               buttonStyle={{marginBottom: 2, marginTop: 2}}
                               onPress={()=>this.deleteQuestion()}/>
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
        flex: 1,
    },
    buttonContainer: {
        padding: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});