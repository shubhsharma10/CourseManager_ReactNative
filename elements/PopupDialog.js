import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Dialog from 'react-native-dialog'

export default class PopupDialog extends Component {
    constructor(props) {
        super(props);

        state = {
            dialogVisible: false
        };
    }

    showDialog = () => {
        this.setState({ dialogVisible: true });
    };

    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };

    handleDelete = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        this.setState({ dialogVisible: false });
    };

    render() {
        return (
            <View>
                <Dialog.Container visible={true}>
                    <Dialog.Title>Account delete</Dialog.Title>
                    <Dialog.Description>
                        Do you want to delete this account? You cannot undo this action.
                    </Dialog.Description>
                    <Dialog.Button label="Cancel" />
                    <Dialog.Button label="Delete" />
                </Dialog.Container>
            </View>
        );
    }
}