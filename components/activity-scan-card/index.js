import { NavigationContainer, useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import {
	View, Image, StyleSheet, ImageEditor, TouchableOpacity
} from 'react-native'

const ActivityCard = ({smallPosterURL2, selected, handleChangeSelected, index,}) => {
	const navigation = useNavigation();

	// useEffect(() => {

	// }, [smallPosterURL2])
	
	return (
		<TouchableOpacity
		 style={[styles.cardHolder, {borderWidth: selected ? 2 : 0}]}
		 onPress={() => handleChangeSelected(index)}
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
		borderColor: '#3A86FF',
		// marginTop: 10,
		// marginBottom: 15,
		overflow: 'hidden',
		elevation: 10,
		backgroundColor: '#f1f1f1'
	},
	smallPoster: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	}
})

export default ActivityCard