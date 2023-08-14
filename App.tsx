import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignUp from './View/Signup';
import SignIn from './View/SignIn';
import Info from './View/Info';
import ItemList from './View/ItemList';
import Homepage from './View/Homepage';
import Form from './View/Form';

// To Start the App: npx react-native start

function App(): JSX.Element {

  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>

        <StatusBar barStyle='dark-content' />
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="signup"
            component= {SignUp}
          />
          <Stack.Screen
            name="signin"
            component= {SignIn}
          />
          <Stack.Screen
            name="status"
            component= {Homepage}
          />
          <Stack.Screen
            name="info"
            component= {Info}
          />
          <Stack.Screen
            name="itemList"
            component= {ItemList}
          />
          <Stack.Screen
            name="form"
            component= {Form}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;