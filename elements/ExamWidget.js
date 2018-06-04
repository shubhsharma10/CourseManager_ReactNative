import React, {Component} from 'react'
import {View,ScrollView,StyleSheet,TextInput} from 'react-native'
import {ListItem,Button, Text, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import * as constantElements from '../elements/index'
import WidgetService from '../services/WidgetService'
import QuestionTypePicker from './QuestionTypePicker'

export default class ExamWidget extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Exam',
            headerRight: <constantElements.GoToHome navigation={navigation}/>,
            headerTitleStyle: {textAlign: 'center', alignSelf: 'center', width: '80%', color: 'white'},
            headerStyle: {
                backgroundColor: '#007BFF'
            }
        }};

    constructor(props) {
        super(props);
        this.state = {
            topicId: 0,
            widgetId: 0,
            title: '',
            questions: []
        };

        this.deleteExamWidget = this.deleteExamWidget.bind(this);
        this.createQuestion = this.createQuestion.bind(this);
        this.goToQuestionEditor = this.goToQuestionEditor.bind(this);
        this.widgetService = WidgetService.getInstance();
    }

    componentDidMount() {
        const widgetId = this.props.navigation.getParam("widgetId", 1);
        const topicId = this.props.navigation.getParam("topicId", 1);
        this.setState({ widgetId: widgetId });
        this.setState({ topicId: topicId });
        this.findExamWidget(widgetId);
        this.findAllQuestionsForExam(widgetId);
    }

    createQuestion(selectedQuestionType) {
        if(selectedQuestionType === "TF")
        {
            let trueFalseQuestion = {type:"TF",title:"New Question"};
            console.log('widget id: '+this.state.widgetId);
            console.log('type is: '+typeof this.state.widgetId);
            // True false question
            this.widgetService
                .createTrueFalseQuestion(this.state.widgetId,trueFalseQuestion)
                .then(() => {
                    this.findAllQuestionsForExam(this.state.widgetId);
                })
        }
        else if(selectedQuestionType === "ES")
        {
            // Essay type question
        }
        else if(selectedQuestionType === "MC")
        {
            // Multiple choice question
        }
        else if(selectedQuestionType === "FB")
        {
            // Fill in the blanks question
        }
    }

    findExamWidget(widgetId) {
        this.widgetService
            .findExamWidgetById(widgetId)
            .then((examWidget) => {
                if(examWidget !== null)
                {
                    this.setState({title: examWidget.title === null ? '' : examWidget.title});
                }
            });
    }

    findAllQuestionsForExam(examId) {
        this.widgetService
            .findAllQuestionsForExam(examId)
            .then((questions) => {
                if(questions !== null)
                    this.setState({questions: questions});
            })
            .catch(function (response) {
                console.log('Error caught in find questions for exam '+response);
            });
    }

    updateForm(newState) {
        this.setState(newState,function() {
            this.saveExam();
        });
    }

    goToWidgetList() {
        this.props.navigation.navigate("WidgetList",
            {
                topicId: this.state.topicId
            });
    };

    saveExam() {
        this.widgetService
            .findExamWidgetById(this.state.widgetId)
            .then((response) => {
                response.title = this.state.title;
                this.widgetService.updateExamWidget(this.state.widgetId,response);
            })
    }

    cancelExam() {
        this.goToWidgetList();
    }

    goToQuestionEditor(questionId,questionType,examId)
    {
        if(questionType === "TF")
        {
            console.log('came here');
            this.props.navigation.navigate("TrueFalseQuestionEditor",{ questionId: questionId, widgetId: examId});
        }
        else if(questionType === "MC")
        {

        }
        else if(questionType === "FB")
        {

        }
        else if(questionType === "ES")
        {

        }
    }

    deleteExamWidget() {
        this.widgetService
            .deleteExamWidget(this.state.widgetId)
            .then(() => {
                this.goToWidgetList();
            });
    }

    render() {
        return(
            <ScrollView style={{padding: 10}}>
                <View>
                    <TextInput
                        editable={true}
                        value={this.state.title}
                        onChangeText={(text) => this.updateForm({title: text})}/>
                    {this.state.questions.map((question,index) => {
                       return <ListItem
                           title={question.title}
                           key={index}
                           onPress={()=>this.goToQuestionEditor(question.id,question.type,this.state.widgetId)}/>
                    })}
                    <QuestionTypePicker createQuestion={this.createQuestion}/>
                </View>
                <View>
                    <Button	backgroundColor="red"
                               color="white"
                               title="Delete"
                               buttonStyle={{marginBottom: 2, marginTop: 2}}
                               onPress={()=>this.deleteExamWidget()}/>
                </View>
            </ScrollView>
        )
    }
};

let styles = StyleSheet.create({
    viewStyleOne: {
        margin: 5,
        justifyContent: 'center',
        alignItems:'center'
    },
    textStyle:{
        textAlign:'center',
        flexWrap: 'wrap'
    }
});