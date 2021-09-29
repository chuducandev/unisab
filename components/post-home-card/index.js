import React, {useState, useEffect} from 'react'
import {
	View, 
	StyleSheet,
	Image,
	Text,
	TouchableOpacity,
	Dimensions,
} from 'react-native'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import DotsThreeRegular from '../../assets/icons/dots-three-regular.svg'
import HeartRegular from '../../assets/icons/heart-regular.svg'
import HeartFill from '../../assets/icons/heart-fill.svg'
import ShareRegular from '../../assets/icons/share-regular.svg'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window');

const PostCard = ({post}) => {
	const [liked, setLiked] = useState(false);
	const [creator, setCreator] = useState(null);

	const navigation = useNavigation();

	useEffect(() => {
		firestore()
			.collection('users')
			.doc(post?.creator)
			.get()
			.then(snap => {
				setCreator({
					avatar: snap.data().profilePhotoURL,
					name: snap.data().displayName,
				})
			})
	}, [])

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<View style={styles.avatarContainer}>
					<Image 
						source={{
							uri: creator?.avatar
						}}
						style={styles.avatar}
					/>
				</View>
				<Text style={styles.name}>{creator?.name}</Text>
				<DotsThreeRegular width={32} height={32} style={styles.iconDotsThree} />
			</View>
			<TouchableOpacity onPress={() => navigation.navigate('Post', {id: post.id})}>
				<Image 
					source={{
						uri: post?.largePosterURL
					}}
					style={styles.image}
				/>
			</TouchableOpacity>
			<View style={styles.footerContainer}>
				<TouchableOpacity style={styles.buttonDivider} onPress={() => setLiked(oldLiked => !oldLiked)}>
					{liked ? <HeartFill width={32} height={32} />
					       : <HeartRegular width={32} height={32} />}
				</TouchableOpacity>
				<TouchableOpacity style={styles.buttonDivider}>
					<ShareRegular width={32} height={32} />
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 0,
		width: width - 20,
		marginHorizontal: 10,
		marginBottom: 20,
		borderRadius: 20,
		overflow: 'hidden',
		elevation: 8,
		backgroundColor: '#ffffff'
	},
	headerContainer: {
		width: width - 20, 
		height: 54,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	avatarContainer: {
		width: 36,
		height: 36,
		borderRadius: 18,
		borderWidth: 1,
		marginHorizontal: 9,
		overflow: 'hidden',
	},
	avatar: {
		width: '100%', 
		height: '100%',
		resizeMode: 'cover',
	},
	name: {
		fontFamily: 'SVN-Poppins SemiBold',
		fontSize: 12,
		flex: 1,
	},
	iconDotsThree: {
		marginHorizontal: 11,
	},
	image: {
		flex: 0,
		width: width - 20,
		height: (width - 20) / 0.75,
		resizeMode: 'cover',
		overflow: 'hidden',
	}, 
	footerContainer: {
		width: '100%',
		height: 52,
		flexDirection: 'row',
	}, 
	buttonDivider: {
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	}
})

export default PostCard