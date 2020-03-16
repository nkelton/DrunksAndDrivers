import React from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack"

import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Profile from './screens/Profile';
import ProfileForm from './screens/ProfileForm';
import PreferenceForm from './screens/PreferenceForm';


export default class App extends React.Component {
    render() {
        return (
            <AppContainer />
        );}
}

const AppNavigator = createStackNavigator({
    Login: {
        screen: Login
    },
    SignUp: {
        screen: SignUp
    },
    Profile: {
        screen: Profile
    },
    ProfileForm: {
        screen: ProfileForm
    },
    PreferenceForm: {
        screen: PreferenceForm
    }
},{
    initialRouteName: "SignUp"
});

const AppContainer = createAppContainer(AppNavigator);

