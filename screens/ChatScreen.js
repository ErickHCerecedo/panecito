import React from "react";
import { Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Fire from "../Fire";

export default class ChatScreen extends React.Component {

    state = {
        messages: [],
    }

    get user () {
        return {
            _id: Fire.uid,
            name: this.props.navigation.state.params.name,
            avatar: 'https://placeimg.com/140/140/any',
        };
    }

    componentDidMount() {
        Fire.get(message => {
            this.setState({ messages: GiftedChat.append(this.state.messages, message) });
        });
    }

    componentWillUnmount() {
        Fire.off();
    }

    render () {
        const chat = <GiftedChat messages={this.state.messages} onSend={Fire.send} user={this.user} />

        return (
            <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : ""} enabled>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{chat}</TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
}