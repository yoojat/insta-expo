import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import { View } from 'react-native';
import TabIcon from '../components/nav/TabIcon';
import SharedStackNav from './SharedStackNav';

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopColor: 'rgba(255,255,255, 0.3)',
        },
      }}
    >
      <Tabs.Screen
        name='Feed'
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={'home'} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName='Feed' />}
      </Tabs.Screen>
      <Tabs.Screen
        name='Search'
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={'search'} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName='Search' />}
      </Tabs.Screen>
      <Tabs.Screen
        name='Camera'
        options={{
          tabBarIcon: ({ focused, color, sized }) => (
            <TabIcon iconName={'camera'} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName='Camera' />}
      </Tabs.Screen>
      <Tabs.Screen
        name='Notifications'
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={'heart'} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName='Notifications' />}
      </Tabs.Screen>
      <Tabs.Screen
        name='Me'
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={'person'} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName='Me' />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
