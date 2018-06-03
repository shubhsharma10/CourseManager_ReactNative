import React, {Component} from 'react'
import {View} from 'react-native'
import {ButtonGroup, Button} from 'react-native-elements'

class WidgetChooser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedWidgetTypeIndex: 0
        };
        this.selectWidgetType = this.selectWidgetType.bind(this);
    }

    selectWidgetType = (newWidgetTypeIndex) => {
        this.setState({
            selectedWidgetTypeIndex: newWidgetTypeIndex
        });
    };

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
                        onPress={() => this.props.createWidget(this.state.selectedWidgetTypeIndex)}/>
            </View>
        )
    }
}
export default WidgetChooser