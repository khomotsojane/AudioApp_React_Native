import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './auth/Login'
import Home from './components/Home'
import Registration from './auth/Registration'
import Profile from './components/Profile'


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Registration'>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Registration' component={Registration} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Profile' component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}