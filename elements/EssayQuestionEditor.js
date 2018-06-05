import React, {Component} from 'react'
import {View,ScrollView,StyleSheet,TextInput} from 'react-native'
import {Text, Button,FormLabel, FormInput, FormValidationMessage,Icon}
    from 'react-native-elements'
import EssayQuestionService from '../services/EssayQuestionService'
import * as constantElements from '../elements/index'

export default class EssayQuestionEditor extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Essay Question',
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
            isValidPoints: false,
            questionId: 0,
            widgetId: 0,
            topicId: 0,
        };

        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);

        this.questionService = EssayQuestionService.getInstance();
    }

    componentDidMount() {
        const widgetId = this.props.navigation.getParam("widgetId", 1);
        const questionId = this.props.navigation.getParam("questionId", 1);
        const topicId = this.props.navigation.getParam("topicId", 1);
        this.setState({ topicId: topicId });
        this.setState({ widgetId: widgetId });
        this.setState({ questionId: questionId });
        this.findEssayQuestionById(questionId);
    }

    findEssayQuestionById(questionId) {
        this.questionService
            .findEssayQuestionById(questionId)
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

    goToExamWidget() {
        this.props.navigation.navigate("ExamWidget",
            {
                widgetId: this.state.widgetId,
                topicId: this.state.topicId
            });
    };

    saveQuestion() {
        this.questionService
            .findEssayQuestionById(this.state.questionId)
            .then((response) => {
                response.title = this.state.title;
                response.subtitle = this.state.subtitle;
                response.points = this.state.points;
                this.questionService.updateEssayQuestion(this.state.questionId,response);
            })
            .then(()=> this.goToExamWidget());
    }

    cancelChanges() {
        this.goToExamWidget();
    }

    deleteQuestion() {
        this.questionService
            .deleteEssayQuestion(this.state.questionId)
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
                    <Text h3 style={styles.textContainerStyle}>Preview</Text>
                </View>
                <View style={styles.topContainer}>
                    <View style={styles.containerA}>
                        <View style={styles.textContainerStyle}>
                            <Text h3 style={styles.textStyle}>{this.state.title}</Text>
                        </View>
                        <View style={styles.textContainerStyle}>
                            <Text h3 style={styles.textStyle}>{this.state.points}pts</Text>
                        </View>
                    </View>
                    <View style={styles.containerB}>
                        <View style={styles.textContainerStyle}>
                            <Text style={styles.textStyle}>{this.state.subtitle}</Text>
                        </View>
                    </View>
                    <View style={styles.textAreaContainer} >
                        <TextInput
                            style={styles.textArea}
                            underlineColorAndroid="transparent"
                            placeholder={"Type answer here"}
                            placeholderTextColor={"grey"}
                            numberOfLines={6}
                            multiline={true}
                        />
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
                               buttonStyle={{marginBottom: 20, marginTop: 2}}
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
    textContainerStyle: {
        margin: 5,
        flex: 1,
        justifyContent: 'flex-start'
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