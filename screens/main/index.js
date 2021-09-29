import React, {useEffect} from 'react';
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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'


import HomeScreen from '../home';
import PersonalCode from '../personal-code';
import UserScreen from '../user';

import HomeRegular from '../../assets/icons/home-regular.svg'
import HomeFill from '../../assets/icons/home-fill.svg'
import QRCodeRegular from '../../assets/icons/qr-code-regular.svg'
import QRCodeFill from '../../assets/icons/qr-code-fill.svg'
import UserRegular from '../../assets/icons/user-regular.svg'
import UserFill from '../../assets/icons/user-fill.svg'

const Tab = createBottomTabNavigator();

const Main = ({navigation}) => {
	const handlePressActivity = () => {
		navigation.navigate("Post")
	}

	if (!auth().currentUser) navigation.navigate('Login')

	// useEffect(() => {
	// 	handlePressActivity();
	// })

  return (
		<Tab.Navigator
			screenOptions={({route}) => ({
				tabBarIcon: ({focused}) => {
					return focused ? (
						route.name == "Home"          ? <HomeFill width={32} height={32} /> : 
						route.name == "Personal Code" ? <QRCodeFill width={32} height={32} /> : 
																						<UserFill width={32} height={32} />  
					) : (
						route.name == "Home"          ? <HomeRegular width={32} height={32} /> : 
						route.name == "Personal Code" ? <QRCodeRegular width={32} height={32} /> : 
																						<UserRegular width={32} height={32} />  
					)
				}
			})}
			tabBarOptions={{
				showLabel: false,
				style: {
					height: 52,
					borderTopWidth: 0,
					elevation: 0,
				}
			}}
		>
			<Tab.Screen name="Home" component={HomeScreen}  />  
			<Tab.Screen name="Personal Code" component={PersonalCode} />   
			<Tab.Screen name="User" component={UserScreen} /> 
		</Tab.Navigator>     
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#ffffff',
    height: '100%'
  },
});

export default Main;
