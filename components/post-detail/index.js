import React, {useState, useEffect} from 'react'
import {
	View, 
	StyleSheet,
	Text,
	Image,
	Dimensions,
	TouchableOpacity,
} from 'react-native'

import HyperLink from 'react-native-hyperlink'

import CaretDownRegular from '../../assets/icons/caret-down-regular.svg'

import CheckFill from '../../assets/icons/check-fill.svg'
import PlusRegular from '../../assets/icons/plus-regular.svg'

const {width, height} = Dimensions.get('window')


const PostDetail = ({
	scrollDown, 
	participantList,
	followed, 
	owner,
	content,
	setFollowed,
}) => {
	// const contentStr = content;
	// console.log(content)

	const handleFollow = (i) => setFollowed(oldFollowed => {
		console.log(i)
		const newFollowed = [...oldFollowed];
		newFollowed[i] = !newFollowed[i];
		// console.log(newFollowed)
		return newFollowed;
	})

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<View style={styles.avatarContainer}>
					<Image 
						source={{
							uri: owner?.avatarURL
						}}
						style={styles.avatar}
					/>
				</View>
				<Text style={styles.name}>{owner?.name}</Text>
				<TouchableOpacity onPress={() => scrollDown()}>
					<CaretDownRegular width={32} height={32} style={styles.iconDotsThree} />
				</TouchableOpacity>
			</View>
			<HyperLink linkDefault={true}>
				<Text style={styles.textContent}>{content}</Text>
			</HyperLink>
			<Text style={styles.participantHeader}>Participants</Text>
			{participantList?.map((item, index) => (
				<View style={styles.participantContainer}>
					<View style={styles.avatarParticipantContainer}>
						<Image 
							source={{
								uri: item.avatarURL
							}}
							style={styles.avatarParticipant}
						/>
					</View>
					<Text style={styles.nameParticipant}>{item.name}</Text>
					<TouchableOpacity onPress={() => handleFollow(index)}>
						{followed && followed[index] ? <CheckFill width={32} height={32} style={styles.iconFollow} />
						                           : <PlusRegular width={32} height={32} style={styles.iconFollow} />}
					</TouchableOpacity>
				</View>
			))} 
		</View>
	)

}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		// height: 2000,
		marginTop: height,
		paddingHorizontal: 20,
		paddingTop: 20,
		elevation: 40,
		backgroundColor: '#ffffff', 
		borderRadius: 30,
		paddingBottom: 40,
		marginBottom: -30,
	},
	headerContainer: {
		width: '100%', 
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	avatarContainer: {
		width: 40,
		height: 40,
		borderRadius: 20,
		borderWidth: 1,
		marginRight: 9,
		overflow: 'hidden',
		backgroundColor: '#F1F1F1'
	},
	avatar: {
		width: '100%', 
		height: '100%',
		resizeMode: 'cover',
	},
	name: {
		fontFamily: 'SVN-Poppins SemiBold',
		fontSize: 14,
		flex: 1,
	},
	iconDotsThree: {
		marginLeft: 20,
	},
	textContent: {
		// fontFamily: 'SVN-Poppins Regular',
		fontSize: 14,
		marginTop: 10,
		// lineHeight: 18,
	},
	participantHeader: {
		fontFamily: 'SVN-Poppins Bold',
		fontSize: 18,
		marginTop: 20,
		marginBottom: 10,
	},
	participantContainer: {
		// height: 500,
		width: '100%', 
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
	},
	avatarParticipantContainer: {
		width: 40,
		height: 40,
		borderRadius: 20,
		borderWidth: 1,
		marginRight: 9,
		overflow: 'hidden',
		backgroundColor: '#F1F1F1'
	},
	avatarParticipant: {
		width: '100%', 
		height: '100%',
		resizeMode: 'cover',
	},
	nameParticipant: {
		fontFamily: 'SVN-Poppins SemiBold',
		fontSize: 14,
		flex: 1,
	},
	iconFollow: {
		marginLeft: 20,
	},
})

export default PostDetail