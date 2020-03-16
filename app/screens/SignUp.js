import React, { Component } from 'react';
import axios from 'axios';
import { View, StyleSheet, Button, Text } from 'react-native';

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
            <View style={styles.container}>
                <Form
                    ref={c => (this._form = c)}
                    type={User}
                />
                <Text style={styles.loginLink} onPress={() => this.props.navigation.navigate('Login')}
                > Already have an account?
                </Text>
                <Button title={"Sign Up"} onPress={this.handleSubmit}/>
            </View>
        )};
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    loginLink: {
        color: '#fe1ff8'
    }
});
