import React, { Component } from 'react';
import axios from 'axios';
import { View, StyleSheet, Button, Text, KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-navigation-stack';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const Gender = t.enums.of(['Male', 'Female'], 'Gender');
const Role = t.enums.of(['Drunk', 'Driver', 'Both'], 'Role');

const Profile = t.struct({
    bio: t.String,
    role: Role,
    age: t.Number,
    gender: Gender,
});

export default class ProfileForm extends Component {

    handleSubmit = () => {
        const { state } = this.props.navigation;
        const newProfileRequest = this._form.getValue();

        axios.post('http://127.0.0.1:3000/api/v1/users/' + state.params.user.id + '/profiles', newProfileRequest)
            .then(res => {
                const profile = res.data;
                this.props.navigation.navigate('PreferenceForm', { user: state.params.user, profile: profile })
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
                        type={Profile}
                    />
                    <Button title={"Next"} onPress={this.handleSubmit}/>
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
    }
});
