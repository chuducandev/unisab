import { useNavigation } from '@react-navigation/native'
import React, {useState, useEffect } from 'react'
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	SafeAreaView, 
	StatusBar,
	TouchableOpacity,
	ToastAndroid,
} from 'react-native'

import { TextInput } from 'react-native-paper'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import Logo from '../../assets/logo/logo.svg'

const {width, height} = Dimensions.get('window')

const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigation = useNavigation();

	// if (auth().currentUser) navigation.navigate('Main');

	const handleChangeEmail = newEmail => {
		setEmail(newEmail)
	}

	const handleChangePassWord = newPassWord => {
		setPassword(newPassWord)
	}

	const handleLogIn = (email, password) => {
		auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				console.log('Logged in successfully.')
				// navigation.navigate('Main')
			})
			.catch(error => {
				if (error.code == "auth/wrong-password") {
					ToastAndroid.show("You have typed a wrong password.", ToastAndroid.SHORT);
				}
			})
	}

	return (
		<SafeAreaView style={{backgroundColor: '#000000'}}>
			<StatusBar barStyle={'dark-content'} backgroundColor='#ffffff'/>
			<View style={styles.main}>
				<View style={styles.container} >
					<View style={{width:width/5, height:110 * width / 5 / 76, marginBottom: 40}}>
						<Logo width={width/5} height={110 * width / 5 / 76}/>
					</View>
					<TextInput 
						label="Email"
						value={email}
						onChangeText={newEmail => handleChangeEmail(newEmail)}
						style={{
							height: 40,
							width: width* 0.7,
							backgroundColor: '#ffffff',
							marginBottom: 5,
							// borderColor: '#3A86FF'
						}}
						// dense={true}
						selectionColor="#3A86FF"
						// outlineColor="#3A86FF"
						underlineColor="#3A86FF"
						mode="outlined"
						theme={{
							colors: {
								primary: '#3A86FF',
							},
						}}
					/>
					<TextInput 
						label="Password"
						value={password}
						onChangeText={newPassword => handleChangePassWord(newPassword)}
						style={{
							height: 40,
							width: width* 0.7,
							backgroundColor: '#ffffff',
							marginBottom: 10,
							// borderColor: '#3A86FF'
						}}
						selectionColor="#3A86FF"
						// outlineColor="#3A86FF"
						underlineColor="#3A86FF"
						mode="outlined"
						theme={{
							colors: {
								primary: '#3A86FF',
							},
						}}
						secureTextEntry={true}
					/>
					<TouchableOpacity style={styles.logInButton} onPress={()=>handleLogIn(email, password)} >
						<Text style={styles.logInText}>Log in</Text>
					</TouchableOpacity>
					<View style={{flexDirection: 'row', justifyContent: 'center'}}>
						<Text style={styles.text3}>Not have an account yet?</Text>
						<TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
							<Text style={styles.text4}> Sign up</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={{width:width/5, height:0.5*(110 * width / 5 / 76), marginBottom: 40}} />
			</View>
		</SafeAreaView>
	)

}

const styles = StyleSheet.create({
	main: {
		height: '100%',
		backgroundColor: '#ffffff',
		// flexDirection: 'row',
	},
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	textInput: {
		height: 100,
		marginHorizontal: 40,
	},
	logInButton: {
		width: "70%",
		height: 40,
		backgroundColor: '#3A86FF',
		justifyContent: 'center',
		borderRadius: 5,
		marginBottom: 5,
	},
	logInText: {
		fontFamily: 'SVN-Poppins Bold',
		color: '#ffffff',
		textAlign: 'center',
	},
	text3: {
		fontFamily: 'SVN-Poppins Regular',
		color: '#A1A1A1',
		textAlign: 'center',
		marginBottom: 20,
	},
	text4: {
		fontFamily: 'SVN-Poppins Regular',
		color: '#3A86FF',
		textAlign: 'center',
		marginBottom: 20,
	},
})

export default LoginScreen