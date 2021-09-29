import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
	View, 
	StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native'

import BarcodeRegular from '../../assets/icons/barcode-regular.svg'
import MagnifyingGlassRegular from '../../assets/icons/magnifying-glass-regular.svg'

const PersonalCodeHeader = () => {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<Text style={styles.textHeader}>Your ID</Text>
			<TouchableOpacity onPress={() => navigation.navigate('Scan')} >
				<BarcodeRegular width={32} height={32} style={styles.iconNotification} />
			</TouchableOpacity>
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
})

export default PersonalCodeHeader