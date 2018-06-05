import React, {Component} from 'react'
import {View,ScrollView,StyleSheet, TextInput} from 'react-native'
import {Text,Button,FormLabel, FormInput, FormValidationMessage,Icon}
    from 'react-native-elements'
import WidgetService from '../services/WidgetService'
import * as constantElements from '../elements/index'

export default class FillInTheBlanksQuestionEditor extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Fill in the Blanks Question',
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
            inputArea: '',
            isValidPoints: false,
            questionId: 0,
            widgetId: 0,
            topicId: 0,
            parsedLines: []
        };

        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);
        this.saveInputAreaChanges = this.saveInputAreaChanges.bind(this);
        this.renderPreview = this.renderPreview.bind(this);

        this.widgetService = WidgetService.getInstance();
    }

    componentDidMount() {
        const widgetId = this.props.navigation.getParam("widgetId", 1);
        const questionId = this.props.navigation.getParam("questionId", 1);
        const topicId = this.props.navigation.getParam("topicId", 1);
        this.setState({ topicId: topicId });
        this.setState({ widgetId: widgetId });
        this.setState({ questionId: questionId });
        this.findBlanksQuestionById(questionId);
    }

    findBlanksQuestionById(questionId) {
        this.widgetService
            .findBlanksQuestionById(questionId)
            .then((question) => {
                if(question !== null)
                {
                    this.setState({title: question.title === null ? '' : question.title});
                    this.setState({subtitle: question.subtitle === null ? '' : question.subtitle});
                    let points = question.points === null ? 0 : question.points;
                    this.setState({points: points});
                    this.setState({pointsInString: points.toString()});
                    this.setState({inputArea:question.inputArea},function () {
                        this.saveInputAreaChanges();
                    });
                    if(points > 0)
                        this.setState({isValidPoints: true});
                }
            });
    }

    updateForm(newState) {
        this.setState(newState)
    }

    saveInputAreaChanges()
    {
        if(this.state.inputArea === '')
        {
            return;
        }
       let inputLines = this.state.inputArea.split('\n');
       let parsedLinesTest = [];
       for(let k = 0; k < inputLines.length; k++){
           let inputLine = inputLines[k];
           let line = [];
           let regex = /\[([^\]]+)\]/g;
           let matches = inputLine.match(regex);
           let newInput = inputLine.replace(regex,'X');
           let i = 0;
           let lastSeen = 0;
           for (let j = 0; j < newInput.length; j++) {
               if(newInput.charAt(j) === 'X'){
                   if(j>0) {
                    line.push([0,newInput.substring(lastSeen,j)]);
                   }
                   line.push([1,matches[i]]);
                   lastSeen += j+1;
                   i += 1;
               }
               else if(j === newInput.length-1)
               {
                   line.push([0,newInput.substring(lastSeen,newInput.length)]);
               }
           }
           parsedLinesTest.push(line);
       }
       this.setState({parsedLines: parsedLinesTest});
    }

    getInputLabel(key){
        return React.createElement(TextInput,{style: {margin: 2,borderColor: 'black',borderWidth: 1},key: key},'');
    }

    getLabel(key,text) {
        return React.createElement(Text,{style: {margin: 2},key: key},text);
    }

    renderPreview() {
        let parsedLines = this.state.parsedLines;
        let count = 1;
        if(parsedLines.length === 0)
        {
            return(<View style={styles.textAreaContainer}></View>)
        }
        else {
            let divs = [];
            for (let i = 0; i < parsedLines.length; i++) {
                let parsedLine = parsedLines[i];
                let div = '';
                let components = [];
                for (j = 0; j < parsedLine.length; j++) {
                    let component = '';
                    if (parsedLine[j][0] === 0) {
                        // label
                        component = this.getLabel(count,parsedLine[j][1]);
                        count += 1;
                    }
                    else {
                        // input
                        component = this.getInputLabel(count);
                        count += 1;
                    }
                    components.push(component);
                }
                div = React.createElement(View, {style: {flexDirection: 'row'},key:count}, components);
                count += 1;
                divs.push(div)
            }
            return React.createElement(View, {style: {flex: 1, justifyContent: 'flex-start'},key:count}, divs);
        }

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
        this.widgetService
            .findBlanksQuestionById(this.state.questionId)
            .then((response) => {
                response.title = this.state.title;
                response.subtitle = this.state.subtitle;
                response.points = this.state.points;
                response.inputArea = this.state.inputArea;
                this.widgetService.updateBlanksQuestion(this.state.questionId,response);
            })
            .then(()=> this.goToExamWidget());
    }

    cancelChanges() {
        this.goToExamWidget();
    }

    deleteQuestion() {
        this.widgetService
            .deleteBlanksQuestion(this.state.questionId)
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
                    <View style={styles.textAreaContainer} >
                        <TextInput
                            style={styles.textArea}
                            underlineColorAndroid="transparent"
                            placeholder={"Enter text here"}
                            placeholderTextColor={"grey"}
                            numberOfLines={6}
                            multiline={true}
                            onChangeText={(text) => this.setState({inputArea: text})}
                            value={this.state.inputArea}
                        />
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'flex-end',flex: 1}}>
                        <Button title="Save changes" onPress={()=>this.saveInputAreaChanges()}/>
                    </View>

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
                        <Text h4 style={styles.textStyle}>Fill in the blanks</Text>
                    </View>
                    {this.renderPreview()}
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
    }
});