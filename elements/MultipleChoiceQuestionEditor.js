import React, {Component} from 'react'
import {View,ScrollView,StyleSheet} from 'react-native'
import {Text, Button, ListItem,FormLabel, FormInput, FormValidationMessage,Icon}
    from 'react-native-elements'
import WidgetService from '../services/WidgetService'
import * as constantElements from '../elements/index'
import Dialog from 'react-native-dialog'
import CheckBox from 'react-native-checkbox';

export default class MultipleChoiceQuestionEditor extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Multiple Choice Question',
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
            title: '',
            subtitle: '',
            points: 0,
            pointInStr: '',
            choices: [],
            correctChoice: '',
            isValidPoints: false,
            questionId: 0,
            widgetId: 0,
            topicId: 0,
            isDialogVisible: false,
            choiceText: ''
        };

        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);
        this.showAddChoiceDialog = this.showAddChoiceDialog.bind(this);
        this.deleteChoice = this.deleteChoice.bind(this);
        this.handleCancelDialog = this.handleCancelDialog.bind(this);
        this.handleAddDialog = this.handleAddDialog.bind(this);
        this.setCorrectChoice = this.setCorrectChoice.bind(this);

        this.widgetService = WidgetService.getInstance();
    }

    componentDidMount() {
        const widgetId = this.props.navigation.getParam("widgetId", 1);
        const questionId = this.props.navigation.getParam("questionId", 1);
        const topicId = this.props.navigation.getParam("topicId", 1);
        this.setState({ topicId: topicId });
        this.setState({ widgetId: widgetId });
        this.setState({ questionId: questionId });
        this.findMultipleChoiceQuestionById(questionId);
    }

    findMultipleChoiceQuestionById(questionId) {
        this.widgetService
            .findMultipleChoiceQuestionById(questionId)
            .then((question) => {
                if(question !== null)
                {
                    this.setState({title: question.title === null ? '' : question.title});
                    this.setState({subtitle: question.subtitle === null ? '' : question.subtitle});
                    let points = question.points === null ? 0 : question.points;
                    this.setState({points: points});
                    this.setState({pointsInString: points.toString()});
                    if(points > 0)
                        this.setState({isValidPoints: true});
                    this.setState({choices: question.options});
                    this.setState({correctChoice: question.correctOption});
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

    showAddChoiceDialog() {
        this.setState({isDialogVisible: true});
    }

    setCorrectChoice(correctChoice)
    {
        this.setState({correctChoice:correctChoice});
    }

    deleteChoice(choiceToDelete) {
        let existingChoices = this.state.choices;
        let indexToDelete = existingChoices.indexOf(choiceToDelete);
        existingChoices.splice(indexToDelete,1);
        this.setState({choices: existingChoices});
    }

    handleCancelDialog()
    {
        this.setState({choiceText: ''});
        this.setState({isDialogVisible: false});
    }

    handleAddDialog()
    {
        let existingChoices = this.state.choices;
        existingChoices.push(this.state.choiceText);
        this.setState({choices:existingChoices});
        this.handleCancelDialog();
    }


    goToExamWidget() {
        this.props.navigation.navigate("ExamWidget",
            {
                widgetId: this.state.widgetId,
                topicId: this.state.topicId
            });
    };

    saveQuestion() {
        this.widgetService
            .findMultipleChoiceQuestionById(this.state.questionId)
            .then((response) => {
                response.title = this.state.title;
                response.subtitle = this.state.subtitle;
                response.points = this.state.points;
                response.options = this.state.choices;
                response.correctOption = this.state.correctChoice;
                this.widgetService.updateMultipleChoiceQuestion(this.state.questionId,response);
            })
            .then(()=> this.goToExamWidget());
    }

    cancelChanges() {
        this.goToExamWidget();
    }

    deleteQuestion() {
        this.widgetService
            .deleteMultipleChoiceQuestion(this.state.questionId)
            .then(() => {
                this.goToExamWidget();
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
                    <FormInput value={this.state.subtitle} onChangeText={
                        text => this.updateForm({subtitle: text})}/>
                    {this.state.subtitle === '' &&
                    <FormValidationMessage>Description is required</FormValidationMessage>}

                    <FormLabel>Points</FormLabel>
                    <FormInput value={this.state.pointsInString}
                               onChangeText={
                                   text => this.updatePoints(text)}/>
                    {!this.state.isValidPoints &&
                    <FormValidationMessage>Points are required</FormValidationMessage>}

                    <FormLabel>Choices :</FormLabel>
                    {this.state.choices.map((choice,index) => {
                        return <ListItem
                            title={choice}
                            key={index}
                            leftIcon={<CheckBox label='' checked={this.state.correctChoice === choice}
                                onChange={() => this.setCorrectChoice(choice)}/>}
                            rightIcon={(<Icon name="times" type="font-awesome"
                            size={20} onPress={() => this.deleteChoice(choice)}
                            color="red"/>)}/>
                    })}
                    <Button backgroundColor='#28A745'
                            rounded
                            title="Add Choice"
                            buttonStyle={{marginBottom: 5, marginTop: 5}}
                            onPress={() => this.showAddChoiceDialog()}/>

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
                            <Text style={styles.textStyle}>{this.state.subtitle}</Text>
                        </View>
                    </View>
                    <View style={styles.containerC}>
                        <Text h4 style={styles.textStyle}>Options</Text>
                    </View>
                    <View>
                        {this.state.choices.map((choice,index) => {
                            return <ListItem
                                leftIcon={<CheckBox label='' disabled={true}/>}
                                title={choice}
                                hideChevron={true}
                                disabled={true}
                                key={index}/>
                        })}
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
                <View>
                    <Dialog.Container visible={this.state.isDialogVisible}>
                        <Dialog.Title>Add Choice</Dialog.Title>
                        <Dialog.Description>
                            Add title of the choice here.
                        </Dialog.Description>
                        <Dialog.Input onChangeText={(name) => this.setState({choiceText:name }) }>
                            {this.state.choiceText}
                        </Dialog.Input>
                        <Dialog.Button label="Add" onPress={()=>this.handleAddDialog()} />
                        <Dialog.Button label="Cancel" onPress={()=>this.handleCancelDialog()}/>
                    </Dialog.Container>
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
        flex: 1,
        margin: 5,
        justifyContent: 'center',
        alignItems:'center'
    },
    textStyle:{
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