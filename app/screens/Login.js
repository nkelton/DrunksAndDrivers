import React, { Component } from 'react';
import axios from 'axios';
import {View, StyleSheet, Button, KeyboardAvoidingView} from 'react-native';

import t from 'tcomb-form-native';
import {Header} from 'react-navigation-stack';

const Form = t.form.Form;

const User = t.struct({
    phone: t.String,
    password: t.String
});

export default class Login extends Component {

    handleSubmit = () => {
        const existingUserRequest = this._form.getValue();

        axios.post('http://127.0.0.1:3000/authenticate', existingUserRequest)
            .then(res => {
                this.props.navigation.navigate('Profile')
            })
            .catch(function(error) {
                console.log(JSON.stringify(error))
            })
    };

    render() {
        return(
            <KeyboardAvoidingView
                keyboardVerticalOffset = {Header.HEIGHT + 20}
                style = {styles.container}
                behavior = "padding"
            >
                <View>
                    <Form
                        ref={c => (this._form = c)}
                        type={User}
                    />
                    <Button style={styles.button} title="Login" onPress={this.handleSubmit}/>
                </View>
            </KeyboardAvoidingView>
        )};
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        bottom: 200,
        paddingLeft: 30,
        paddingRight: 30,
        position: 'absolute'
    },
});
