import React, { Component } from 'react';
import axios from 'axios';
import { View, StyleSheet, Button, Text, KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-navigation-stack';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
    name: t.String,
    phone: t.String,
    password: t.String,
});

export default class SignUp extends Component {

    handleSubmit = () => {
        const newUserRequest = this._form.getValue();

        axios.post('http://127.0.0.1:3000/api/v1/users', newUserRequest)
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
                    <Text style={styles.loginLink} onPress={() => this.props.navigation.navigate('Login')}
                    > Already have an account?
                    </Text>
                    <Button title={"Sign Up"} onPress={this.handleSubmit}/>
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
    loginLink: {
        color: '#fe1ff8'
    }
});
