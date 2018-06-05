import React, {Component} from 'react'
import {View} from 'react-native'
import {ButtonGroup, Button} from 'react-native-elements'
import Dialog from 'react-native-dialog'

class WidgetChooser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedWidgetTypeIndex: 0,
            isDialogVisible: false,
            widgetTitle: ''
        };

        this.selectWidgetType = this.selectWidgetType.bind(this);
        this.showAddWidgetDialog = this.showAddWidgetDialog.bind(this);
        this.handleCancelDialog = this.handleCancelDialog.bind(this);
        this.handleAddDialog = this.handleAddDialog.bind(this);
    }

    selectWidgetType = (newWidgetTypeIndex) => {
        this.setState({
            selectedWidgetTypeIndex: newWidgetTypeIndex
        });
    };

    showAddWidgetDialog() {
        this.setState({isDialogVisible: true});
    }

    handleCancelDialog()
    {
        this.setState({widgetTitle: ''});
        this.setState({isDialogVisible: false});
    }

    handleAddDialog()
    {
        this.props.createWidget(this.state.selectedWidgetTypeIndex,this.state.widgetTitle);
        this.handleCancelDialog();
    }

    render() {
        const widgetTypes = [
            'Exam',
            'Assignment'];
        return(
            <View>
                <ButtonGroup
                    onPress={this.selectWidgetType}
                    selectedIndex={this.state.selectedWidgetTypeIndex}
                    buttons={widgetTypes}
                    selectedButtonStyle={ {backgroundColor:'#007BFF'}}
                    containerStyle={{height: 75}}/>
                <Button backgroundColor='#28A745'
                        rounded
                        title="Add Widget"
                        onPress={() => this.showAddWidgetDialog()}/>
                <View>
                    <Dialog.Container visible={this.state.isDialogVisible}>
                        <Dialog.Title>Add Widget</Dialog.Title>
                        <Dialog.Description>
                            Enter title of the widget here.
                        </Dialog.Description>
                        <Dialog.Input onChangeText={(name) => this.setState({widgetTitle:name }) }>
                            {this.state.widgetTitle}
                        </Dialog.Input>
                        <Dialog.Button label="Add" onPress={()=>this.handleAddDialog()} />
                        <Dialog.Button label="Cancel" onPress={()=>this.handleCancelDialog()}/>
                    </Dialog.Container>
                </View>
            </View>
        );
    }
}
export default WidgetChooser