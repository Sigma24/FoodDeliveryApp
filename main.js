import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/login';     
import SignUp from './screens/SignUp';   
import ForgotPassword from './screens/ForgetPassword'; 

const Stack = createNativeStackNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
         <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
