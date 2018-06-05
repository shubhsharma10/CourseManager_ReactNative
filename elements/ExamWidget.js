import React, {Component} from 'react'
import {View,ScrollView,StyleSheet,Text} from 'react-native'
import {ListItem,Button,Icon} from 'react-native-elements'
import * as constantElements from '../elements/index'
import WidgetService from '../services/WidgetService'
import QuestionTypePicker from './QuestionTypePicker'

export default class ExamWidget extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Exam',
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
            topicId: 0,
            widgetId: 0,
            title: '',
            questions: []
        };

        this.deleteExamWidget = this.deleteExamWidget.bind(this);
        this.createQuestion = this.createQuestion.bind(this);
        this.goToQuestionEditor = this.goToQuestionEditor.bind(this);
        this.getIconName = this.getIconName.bind(this);
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

    componentWillReceiveProps(newProps) {
        const widgetId = this.props.navigation.getParam("widgetId", 1);
        const topicId = this.props.navigation.getParam("topicId", 1);
        this.setState({ widgetId: widgetId });
        this.setState({ topicId: topicId });
        this.findExamWidget(widgetId);
        this.findAllQuestionsForExam(widgetId);
    }


    createQuestion(selectedQuestionType,questionTitle) {
        if(selectedQuestionType === "TF")
        {
            let trueFalseQuestion = {type:"TF",title:questionTitle};
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
            let essayQuestion = {type:"ES",title:questionTitle};
            // True false question
            this.widgetService
                .createEssayQuestion(this.state.widgetId,essayQuestion)
                .then(() => {
                    this.findAllQuestionsForExam(this.state.widgetId);
                })
        }
        else if(selectedQuestionType === "MC")
        {
            // Multiple choice question
            let multipleChoiceQuestion = {type:"MC",title:questionTitle};
            // True false question
            this.widgetService
                .createMultipleChoiceQuestion(this.state.widgetId,multipleChoiceQuestion)
                .then(() => {
                    this.findAllQuestionsForExam(this.state.widgetId);
                })
        }
        else if(selectedQuestionType === "FB")
        {
            // Fill in the blanks question
            // Multiple choice question
            let blanksQuestion = {type:"FB",title:questionTitle};
            // True false question
            this.widgetService
                .createBlanksQuestion(this.state.widgetId,blanksQuestion)
                .then(() => {
                    this.findAllQuestionsForExam(this.state.widgetId);
                })
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

    goToWidgetList() {
        this.props.navigation.navigate("WidgetList",
            {
                topicId: this.state.topicId
            });
    };

    goToQuestionEditor(questionId,questionType,examId,topicId)
    {
        if(questionType === "TF")
        {
            this.props.navigation.navigate("TrueFalseQuestionEditor",
                {
                    questionId: questionId,
                    widgetId: examId,
                    topicId: topicId
                });
        }
        else if(questionType === "MC")
        {
            this.props.navigation.navigate("MultipleChoiceQuestionEditor",
                {
                    questionId: questionId,
                    widgetId: examId,
                    topicId: topicId
                });
        }
        else if(questionType === "FB")
        {
            this.props.navigation.navigate("FillInTheBlanksQuestionEditor",
                {
                    questionId: questionId,
                    widgetId: examId,
                    topicId: topicId
                });
        }
        else if(questionType === "ES")
        {
            this.props.navigation.navigate("EssayQuestionEditor",
                {
                    questionId: questionId,
                    widgetId: examId,
                    topicId: topicId
                });
        }
    }

    deleteExamWidget() {
        this.widgetService
            .deleteExamWidget(this.state.widgetId)
            .then(() => {
                this.goToWidgetList();
            });
    }

    getIconName(questionType) {
        if(questionType === "TF")
            return "shuffle";
        else if(questionType === "MC")
            return  "check";
        else if(questionType === "FB")
            return "list";
        else
            return "square";
    }

    render() {
        return(
            <ScrollView style={{padding: 10}}>
                <View>
                    <Text h2 style={{fontWeight: "bold"}}>{this.state.title}</Text>
                    {this.state.questions.map((question,index) => {
                       return <ListItem
                           title={question.title}
                           key={index}
                           leftIcon={(<Icon name={this.getIconName(question.type)} type="feather"/>)}
                           onPress={()=>
                               this.goToQuestionEditor(
                                    question.id,question.type,
                                    this.state.widgetId,
                                    this.state.topicId)
                           }
                       />
                    })}
                    <QuestionTypePicker createQuestion={this.createQuestion}/>
                </View>
                <View>
                    <Button	backgroundColor="red"
                               color="white"
                               title="Delete"
                               buttonStyle={{marginBottom: 20, marginTop: 2}}
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