import { useNavigation } from '@react-navigation/native'
import React, {useState, useEffect, useRef } from 'react'
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
	const [retypedPassword, setRetypedPassword] = useState("");
	const [displayName, setDisplayName] = useState("");

	const navigation = useNavigation();

	const textRetypedPassWordRef = useRef();

	const handleChangeEmail = newEmail => {
		setEmail(newEmail)
	}

	const handleChangePassWord = newPassWord => {
		setPassword(newPassWord)
	}

	const handleChangeRetypedPassWord = newRetypedPassword => {
		setRetypedPassword(newRetypedPassword)
	}

	const handleChangeDisplayName = newDisplayName => {
		setDisplayName(newDisplayName)
	}

	const handleSignup = (email, password, retypedPassword, displayName) => {
		if (password != retypedPassword) {
			ToastAndroid.show('Your retyped password must be the same as your password.', ToastAndroid.SHORT)
			return;
		}

		auth()
			.createUserWithEmailAndPassword(email, password)
			.then(data => {
				console.log('New user signed in with id', data.user.uid)
				firestore()
					.collection('users')
					.doc(data.user.uid)
					.set({
						displayName: displayName,
						created: [],
						attendances: [],
						numOfFollowers: Math.floor(Math.random() * 900 + 100),
						numOfFollowings: Math.floor(Math.random() * 900 + 100),
					})
					.then(() => {
						console.log('New user data retrieved')
						// navigation.navigate('Main')
					})
			})
			.catch(error => {
				if (error.code === 'auth/email-already-in-use') {
					ToastAndroid.show('That email address is already in use!', ToastAndroid.SHORT);
				}
				if (error.code === 'auth/invalid-email') {
					ToastAndroid.show('That email address is invalid!', ToastAndroid.SHORT);
				}
				if (error.code === 'auth/weak-password') {
					ToastAndroid.show('That password is too weak!', ToastAndroid.SHORT);
				}
				console.error(error);
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
							marginBottom: 5,
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
					<TextInput 
						label="Retype Password"
						value={retypedPassword}
						onChangeText={newRetypedPassword => handleChangeRetypedPassWord(newRetypedPassword)}
						style={{
							height: 40,
							width: width* 0.7,
							backgroundColor: '#ffffff',
							marginBottom: 5,
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
						ref={textRetypedPassWordRef}
					/>
					<TextInput 
						label="Display Name"
						value={displayName}
						onChangeText={newDisplayName => handleChangeDisplayName(newDisplayName)}
						style={{
							height: 40,
							width: width* 0.7,
							backgroundColor: '#ffffff',
							marginBottom: 10,
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
					<TouchableOpacity style={styles.logInButton} onPress={() => handleSignup(email, password, retypedPassword, displayName)} >
						<Text style={styles.logInText}>Sign up</Text>
					</TouchableOpacity>
					<View style={{flexDirection: 'row', justifyContent: 'center'}}>
						<Text style={styles.text3}>Already have an account?</Text>
						<TouchableOpacity onPress={()=>navigation.navigate('Login')}>
							<Text style={styles.text4}> Log in</Text>
						</TouchableOpacity>
					</View>
				</View>
				{/* <View style={{width:width/5, height:0.6*(110 * width / 5 / 76), marginBottom: 40}} /> */}
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