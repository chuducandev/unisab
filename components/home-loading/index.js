import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
} from 'react-native'

import Logo from '../../assets/logo/logo.svg'

const {width, height} = Dimensions.get('window')

const LoadingHome = () => {
	return (
		<View style={styles.main}>
			<Logo width={width/4} height={110 * width / 4 / 76}/>
		</View>
	)

}

const styles = StyleSheet.create({
	main: {
		...StyleSheet.absoluteFillObject,
		width: '100%',
		height: '100%',
		elevation: 100,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ffffff'
	},
	logo: {
		
	}
})

export default LoadingHome