import React from 'react'
import {Picker, View} from 'react-native'
import {Button} from 'react-native-elements'
import Dialog from 'react-native-dialog'

class QuestionTypePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionType: "TF",
            isDialogVisible: false,
            questionTitle: ''
        };

        this.showAddQuestionDialog = this.showAddQuestionDialog.bind(this);
        this.handleCancelDialog = this.handleCancelDialog.bind(this);
        this.handleAddDialog = this.handleAddDialog.bind(this);
    }

    showAddQuestionDialog() {
        this.setState({isDialogVisible: true});
    }

    handleCancelDialog()
    {
        this.setState({questionTitle: ''});
        this.setState({isDialogVisible: false});
    }

    handleAddDialog()
    {
        this.props.createQuestion(this.state.questionType,this.state.questionTitle)
        this.handleCancelDialog();
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
                        onPress={() => this.showAddQuestionDialog()}/>
                <View>
                    <Dialog.Container visible={this.state.isDialogVisible}>
                        <Dialog.Title>Add Question</Dialog.Title>
                        <Dialog.Description>
                            Enter title of the question here.
                        </Dialog.Description>
                        <Dialog.Input onChangeText={(name) => this.setState({questionTitle:name }) }>
                            {this.state.questionTitle}
                        </Dialog.Input>
                        <Dialog.Button label="Add" onPress={()=>this.handleAddDialog()} />
                        <Dialog.Button label="Cancel" onPress={()=>this.handleCancelDialog()}/>
                    </Dialog.Container>
                </View>
            </View>
        )
    }
}

export default QuestionTypePicker;