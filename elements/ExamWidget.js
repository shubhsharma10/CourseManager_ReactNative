import React, {Component} from 'react'
import {View,ScrollView,StyleSheet} from 'react-native'
import {ListItem,Button, Text, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import * as constantElements from '../elements/index'
import WidgetService from '../services/WidgetService'

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
        this.widgetService = WidgetService.getInstance();
    }

    componentDidMount() {
        const widgetId = this.props.navigation.getParam("widgetId", 1);
        const topicId = this.props.navigation.getParam("topicId", 1);
        this.setState({ widgetId: widgetId });
        this.setState({ topicId: topicId });
        this.findExamWidget(widgetId);
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

    updateForm(newState) {
        this.setState(newState)
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
            .then(()=> this.goToWidgetList());
    }

    cancelExam() {
        this.goToWidgetList();
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
                    <FormLabel>Title</FormLabel>
                    <FormInput value={this.state.title}
                               onChangeText={ text => this.updateForm({title: text})}
                    />
                    {this.state.title === '' &&
                    <FormValidationMessage>Title is required</FormValidationMessage>}
                    <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                        <View>
                            <Button	backgroundColor="green"
                                       color="white"
                                       title="Save"
                                       onPress={()=>this.saveExam()}/></View>
                        <View>
                            <Button	backgroundColor="red"
                                       color="white"
                                       title="Cancel"
                                       onPress={()=>this.cancelExam()}/></View>
                    </View>

                    <Text h3 style={styles.viewStyleOne}>Preview</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                            <Text h3 style={styles.textStyle}>{this.state.title}</Text>
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