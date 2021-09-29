import React from 'react'
import {
	View, 
	StyleSheet,
	Text,
} from 'react-native'

import BellRegular from '../../assets/icons/bell-regular.svg'
import MagnifyingGlassRegular from '../../assets/icons/magnifying-glass-regular.svg'

const HomeHeader = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.textHeader}>Explore</Text>
			<MagnifyingGlassRegular width={32} height={32} style={styles.iconSearch} />
			<BellRegular width={32} height={32} style={styles.iconNotification} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 52,
		marginTop: 6,
		paddingLeft: 20,
		paddingRight: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	textHeader: {
		fontFamily: 'SVN-Poppins ExtraBold',
		fontSize: 30,
		flex: 1,
	},
	iconNotification: {
		marginLeft: 12,
	},
	iconSearch: {

	}
})

export default HomeHeader