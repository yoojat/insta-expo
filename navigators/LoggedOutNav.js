import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CreateAccount from '../screens/CreateAccount';
import LogIn from '../screens/LogIn';
import Welcome from '../screens/Welcome';

const Stack = createStackNavigator();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitle: false,
        headerTransparent: true,
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name='Welcome'
        component={Welcome}
      />
      <Stack.Screen name='LogIn' component={LogIn} />
      <Stack.Screen name='CreateAccount' component={CreateAccount} />
    </Stack.Navigator>
  );
}
