import React from 'react'
import {
	View, 
	StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native'

import auth from '@react-native-firebase/auth'

import BellRegular from '../../assets/icons/bell-regular.svg'
import MagnifyingGlassRegular from '../../assets/icons/magnifying-glass-regular.svg'
import SignOutRegular from '../../assets/icons/sign-out-regular.svg'
import { useNavigation } from '@react-navigation/core'

const UserHeader = () => {
	const navigation = useNavigation();

	const handleSignOut = () => {
		auth()
			.signOut()
			.then(() => {
				// navigation.navigate('Login')
			})
			.catch (error => {
				console.log(error)
			})
	}

	return (
		<View style={styles.container}>
			<Text style={styles.textHeader}>User</Text>
			<TouchableOpacity onPress={() => handleSignOut()}>
				<SignOutRegular width={32} height={32} style={styles.iconNotification} />
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
	iconSearch: {

	}
})

export default UserHeader