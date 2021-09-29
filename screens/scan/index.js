import React, {useEffect, useState, Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
	TouchableOpacity,
	Linking,
	Dimensions,
	ToastAndroid
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import ActivityList from '../../components/activity-scan-list';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const {width, height} = Dimensions.get('window')

const Scan = () => {
	const [created, setCreated] = useState(null);
	const [id, setId] = useState(null)
  function onSuccess(e) {
    console.log(e.data)
		const queryCode = e.data;

		console.log(id);

		if (!id) return;

		firestore()
			.collection('codes')
			.where('code', '==', queryCode)
			.get()
			.then(snap=>{
				console.log(queryCode)
				console.log(snap)

				if (snap.empty) {
					ToastAndroid.show('Invalid code.', ToastAndroid.SHORT)
					console.log('Invalid code.')
					return;
				}

				const userID = snap.docs[0].data().userID;
				const createdAt = snap.docs[0].data().createdAt.toDate();

				console.log(userID)
				console.log(createdAt)

				console.log(Math.floor((Date.now() - createdAt) / 1000), 'seconds');
				if (Math.floor((Date.now() - createdAt) / 1000) >= 60) {
					ToastAndroid.show('This code has been expired.', ToastAndroid.SHORT);
					return;
				}

				firestore()
					.collection('activities')
					.doc(id)
					.update({
						participants: firestore.FieldValue.arrayUnion(userID)
					})

				firestore()
					.collection('users')
					.doc(userID)
					.update({
						attendances: firestore.FieldValue.arrayUnion(id),
					})
					.then(() => {
						ToastAndroid.show('Attendance checked successfully.', ToastAndroid.SHORT);
					})
			})
			.catch(error => {
				console.log(error);
			})
  }

	useEffect(() => {
		firestore()
			.collection('users')
			.doc(auth().currentUser.uid)
			.get()
			.then(snap => {
				setCreated(snap.data().created)
			})
	})

	return (
		<View style={{height: '100%'}}>
			<View style={{...StyleSheet.absoluteFillObject, height: '100%'}}>
			<QRCodeScanner
				onRead={onSuccess}
				reactivate={true}
				reactivateTimeout={1000}
				cameraStyle={{
					...StyleSheet.absoluteFillObject,
					height: '100%'
				}}
			/>
			</View>		
			<ScrollView style={styles.container}>
				{created && <ActivityList activities={created} setId={setId} />}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
	},
	container: {
		width: '100%',
		// height: 2000,
		marginTop: height-240,
		// paddingHorizontal: 20,
		paddingTop: 20,
		elevation: 40,
		backgroundColor: '#ffffff', 
		borderRadius: 30,
		paddingBottom: 40,
		marginBottom: -30,
	},
});

export default Scan