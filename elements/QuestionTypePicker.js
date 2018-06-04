import React from 'react'
import {Picker, Text, View} from 'react-native'
import {Button} from 'react-native-elements'

class QuestionTypePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionType: "ES"
        }
    }
    render() {
        return (
            <View>
                <Picker
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({questionType: itemValue})}
                    selectedValue={this.state.questionType}>
                    <Picker.Item value="MC" label="Multiple choice" />
                    <Picker.Item value="ES" label="Essay" />
                    <Picker.Item value="TF" label="True or false" />
                    <Picker.Item value="FB" label="Fill in the blanks" />
                </Picker>
                <Button backgroundColor='#28A745'
                        rounded
                        title="Add Question"
                        onPress={() => this.props.createQuestion(this.state.questionType)}/>
            </View>
        )
    }
}

export default QuestionTypePicker;