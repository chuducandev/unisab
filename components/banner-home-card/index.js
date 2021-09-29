import React from 'react'
import {
	View, 
	Image,
	StyleSheet,
	Dimensions
} from 'react-native'

const { width, height } = Dimensions.get('window') 

const BannerCard = ({photoURL}) => {
	return (
		<View style={styles.container} >
			<Image 
				source={{
					uri: photoURL
				}}
				style={styles.image}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: width - 80,
		height: 0.6 * (width - 80),
		borderRadius: 20,
		overflow: 'hidden',
		elevation: 20,
		backgroundColor: '#F1F1F1'
	},
	image: {
		resizeMode: 'cover',
		height: '100%'
	}
})

export default BannerCard