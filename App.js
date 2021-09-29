import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Main from './screens/main';
import Post from './screens/post';
import Scan from './screens/scan';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import LoadingHome from './components/home-loading';
import LoginScreen from './screens/log-in';
import SignupScreen from './screens/sign-up';

const Stack = createStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(auth().currentUser != null);

  const onAuthStateChanged = user => {
    setSignedIn(user != null)
  }

  useEffect(() => {
    setLoading(false);
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  })
  return (
    <View style={styles.main}>
      {loading && <LoadingHome />}
      <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {signedIn ?
        <>
          <Stack.Screen name="Main" component={Main} /> 
          <Stack.Screen name="Post" component={Post} />
          <Stack.Screen name="Scan" component={Scan} />
        </> : 
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} /> 
        </>}
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
      </Stack.Navigator>      
    </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%',
  }
})

export default App;
