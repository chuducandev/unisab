import { NavigationContainer, useNavigation } from '@react-navigation/native'
import React, {useState, useEffect} from 'react'
import {
	View, Image, StyleSheet, ImageEditor, TouchableOpacity
} from 'react-native'

import firestore from '@react-native-firebase/firestore'

const ActivityCard = ({id, smallPosterURL2}) => {
	const navigation = useNavigation();
	
	const [smallPosterURL, setSmallPosterURL] = useState(null);

	// const fetchSmallPoster = async () => {
	// 	firestore()
	// 		.collection('activities')
	// 		.doc(id)
	// 		.get()
	// 		.then(snap => {
	// 			console.log(snap);
	// 			setSmallPosterURL(snap.data().smallPosterURL);
	// 		})
	// }

	// useEffect(() => {
	// 	console.log(id);
	// 	fetchSmallPoster();
	// }, [])
	
	return (
		<TouchableOpacity 
		 style={styles.cardHolder}
		 onPress={() => navigation.navigate("Post", {id: id})}
		>
			<Image 
				source={{
					uri: smallPosterURL2,
				}}
				style={styles.smallPoster}
			/>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	cardHolder: {
		width: 112,
		height: 168,
		borderRadius: 15,
		marginRight: 10,
		// marginTop: 10,
		// marginBottom: 15,
		overflow: 'hidden',
		elevation: 10,
		backgroundColor: '#F1F1F1'
	},
	smallPoster: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	}
})

export default ActivityCard