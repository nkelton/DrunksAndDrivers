import React, { Component } from 'react';
import axios from 'axios';
import { View, StyleSheet, Button, Text, KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-navigation-stack';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const Gender = t.enums.of(['Male', 'Female'], 'Gender');
const Role = t.enums.of(['Drunk', 'Driver', 'Both'], 'Role');

const Preferences = t.struct({
    role: Role,
    age: t.Number,
    gender: Gender,
});

export default class PreferenceForm extends Component {

    handleSubmit = () => {
        const { state } = this.props.navigation;
        const newPreferenceRequest = this._form.getValue();

        axios.post('http://127.0.0.1:3000/api/v1/users/' + state.params.user.id + '/preferences', newPreferenceRequest)
            .then(res => {
                const currPreferences = res.data;
                this.props.navigation.navigate('Profile', { user: state.params.user, profile: state.params.profile, preferences: currPreferences})
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
                        type={Preferences}
                    />
                    <Button title={"Start Search"} onPress={this.handleSubmit}/>
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
