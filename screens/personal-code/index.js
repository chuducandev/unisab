import React, {useState, useEffect} from 'react'
import {
	View, 
	Text, 
	StyleSheet,
	StatusBar,
	SafeAreaView,
	Dimensions,
	TouchableOpacity,
} from 'react-native'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import QRCode from 'react-native-qrcode-svg'

import PersonalCodeHeader from '../../components/header-personal-code'

const {width, height} = Dimensions.get('window')

const PersonalCode = () => {
	const [code, setCode] = useState(null)
	const [createdAt, setCreatedAt] = useState([null])
	const [secondLeft, setSecondLeft] = useState(0);

	const createNewCode = async (setCode, setCreatedAt) => {
		const newCode = Math.floor(Math.random() * 900000000000 + 100000000000).toString();
		setCreatedAt(oldAt => {
			oldAt[0] = Date.now()
			return oldAt;
		})
		firestore()
			.collection('codes')
			.where('code', '==', newCode)
			.get()
			.then(snap => {
				if (!snap.empty) return createNewCode();
				
				firestore()
					.collection('codes')
					.add({
						code: newCode,
						userID: auth().currentUser.uid,
						createdAt: firestore.FieldValue.serverTimestamp()
					})
					.then(() => {
						setCode(newCode);
						return newCode;
					})
			})
	}

	const autoCreateCode = (setCode, setCreatedAt) => {
		nowCreatedAt = Date.now()
		setCreatedAt(oldAt => {
			oldAt[0] = Date.now()
			return oldAt;
		})
		createNewCode(setCode, setCreatedAt);	
	}

	const autoSetSecondLeft = (createdAt, setSecondLeft) => {
		// if (createdAt != null && nowCreatedAt < createdAt)
		const nowCreatedAt = createdAt[0];
		console.log(createdAt[0])
		setSecondLeft(60 - Math.floor((Date.now() - nowCreatedAt) / 1000))
		console.log(secondLeft)
	}

	useEffect(() => {

		// const subscriber = () => {
			let nowCreatedAt = Date.now()
			createNewCode(setCode, setCreatedAt);	
			setInterval(() => createNewCode(setCode, setCreatedAt), 60000)

			setSecondLeft(60 - Math.floor((Date.now() - nowCreatedAt) / 1000))
			console.log(secondLeft)
			setInterval(() => autoSetSecondLeft(createdAt, setSecondLeft), 500)
		// }
		// const subscriber = () => autoCreateNewCode(setCode, setCreatedAt)
		// return subscriber;
	}, [])

	return (
		<SafeAreaView style={{backgroundColor: '#000000'}}>
		<StatusBar barStyle={'dark-content'} backgroundColor='#ffffff'/>
		<View style={styles.main}>
		<PersonalCodeHeader />
			{code && <View style={styles.container}>
				<View style={{alignItems: 'center'}}>
					<Text style={styles.text1}>Show this QR code to the receptionists</Text>
					<QRCode 
						value={code}
						size={width - 150}
					/>
				</View>	
				<View style={{alignItems: 'center'}}>
					<Text style={styles.text2}>Or you can have this code typed in</Text>
					<Text style={styles.code}>{code}</Text>
				</View>
				<View style={{flexDirection: 'row'}}>
					<Text style={styles.text3}>Auto update after {secondLeft}s.</Text>
					{secondLeft <= 40 && <TouchableOpacity onPress={() => createNewCode(setCode, setCreatedAt)}>
						<Text style={styles.text4}> Update</Text>
					</TouchableOpacity>}
				</View>
			</View>}
		</View>
	</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	main: {
		backgroundColor: '#ffffff',
		height: '100%',
	},	
	container: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingVertical: 20,
		marginVertical: 60,
		marginHorizontal: 20,
		elevation: 20,
		borderRadius: 30,
		backgroundColor: '#ffffff'
	},
	text1: {
		fontFamily: 'SVN-Poppins Regular',
		color: '#A1A1A1',
		textAlign: 'center',
		marginBottom: 20,
	},
	text2: {
		fontFamily: 'SVN-Poppins Regular',
		color: '#A1A1A1',
		textAlign: 'center',
		marginBottom: 12,
	},
	code: {
		fontFamily: 'SVN-Poppins Regular',
		fontSize: 24,
		letterSpacing: 10,
		color: '#000000',
		textAlign: 'center',
		// borderWidth: 1,
		// marginBottom: 20,
	},
	text3: {
		fontFamily: 'SVN-Poppins Regular',
		color: '#A1A1A1',
		textAlign: 'center',
		// marginBottom: 20,
	},
	text4: {
		fontFamily: 'SVN-Poppins Regular',
		color: '#3A86FF',
		textAlign: 'center',
		// marginBottom: 20,
	},
})

export default PersonalCode