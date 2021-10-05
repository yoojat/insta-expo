import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';
import Photo from '../screens/Photo';
import Feed from '../screens/Feed';
import Notification from '../screens/Notifications';
import Me from '../screens/Me';
import Search from '../screens/Search';
import { Image } from 'react-native';
import Likes from '../screens/Likes';
import Comments from '../screens/Comments';

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {
  return (
    <Stack.Navigator
      headerMode='screen'
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: 'white',
        headerStyle: {
          borderBottomColor: 'rgba(255,255,255,0.3)',
          shadowColor: 'rgba(255,255,255,0.3)',
          backgroundColor: 'black',
        },
      }}
    >
      {screenName === 'Feed' ? (
        <Stack.Screen
          name={'Feed'}
          component={Feed}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  width: 120,
                  height: 40,
                }}
                resizeMode='contain'
                source={require('../assets/logo.png')}
              />
            ),
          }}
        />
      ) : null}
      {screenName === 'Search' ? (
        <Stack.Screen name={'Search'} component={Search} />
      ) : null}
      {screenName === 'Notification' ? (
        <Stack.Screen name={'Notification'} component={Notification} />
      ) : null}
      {screenName === 'Me' ? <Stack.Screen name={'Me'} component={Me} /> : null}
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='Photo' component={Photo} />
      <Stack.Screen name='Likes' component={Likes} />
      <Stack.Screen name='Comments' component={Comments} />
    </Stack.Navigator>
  );
}
