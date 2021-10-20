import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import { Image, View } from 'react-native';
import TabIcon from '../components/nav/TabIcon';
import SharedStackNav from './SharedStackNav';
import useMe from '../hooks/useMe';
import { createStackNavigator } from '@react-navigation/stack';
import TabsNav from './TabsNav';
import UploadNav from './UploadNav';
import UploadForm from '../screens/UploadForm';

// const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function LoggedInNav() {
  const { data } = useMe();
  return (
    <Stack.Navigator mode='modal'>
      <Stack.Screen
        name='Tabs'
        options={{ headerShown: false }}
        component={TabsNav}
      />
      <Stack.Screen
        name='Upload'
        options={{ headerShown: false }}
        component={UploadNav}
      />
      <Stack.Screen
        name='UploadForm'
        options={{
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name='close' size={28} />
          ),
          title: 'Upload',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'black',
          },
        }}
        component={UploadForm}
      />
    </Stack.Navigator>
  );
}
