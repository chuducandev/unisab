import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react'
import {
	View, 
	StyleSheet,
	SafeAreaView,
	StatusBar,
	ScrollView,
	Image,
	Dimensions,
} from 'react-native';

import auth, { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import PostDetail from '../../components/post-detail';

const {width, height} = Dimensions.get('window')

const Post = ({route}) => {
	const { id } = route.params;
	console.log(id)
	const [followed, setFollowed] = useState(null)
	const [content, setContent] = useState(null)
	const [owner, setOwner] = useState(null)
	const [participantList, setParticipantList] = useState(null)
	const [largePosterURL, setLargePosterURL] = useState(null)
	
	useEffect(() => {
		if (!content)
			firestore()
				.collection('activities')
				.doc(id)
				.get()
				.then(snap => {
					const data = snap.data();
					if (!data.creator || data.creator == "") 
						data.creator = "RqRUAyGofOPAhlHKqJ9r8lRKW4X2";

					// console.log(data);

					setFollowed([...Array(data.participants.length)].fill(false))
					setLargePosterURL(data.largePosterURL)
					setContent(data.detail)
					
					if (!owner) 
						firestore()
							.collection('users')
							.doc(data.creator)
							.get()
							.then(userSnap => {
								setOwner({
									name: userSnap.data().displayName,
									avatarURL: userSnap.data().profilePhotoURL,
								})
								// setTimeout(scrollToTop, 200)
								scrollToTop()
							})

					if (data.participants?.length)
						firestore()
							.collection('users')
							.where(firestore.FieldPath.documentId(), 'in', data.participants)
							.get()
							.then(participantsSnap => {
								const newParticipantList = [];
								participantsSnap.forEach(item => newParticipantList.push({
									name: item.data().displayName,
									avatarURL: item.data().profilePhotoURL,
								}))
								setParticipantList(newParticipantList)
							})
				})
				.catch(e => {
					console.log(e)
				})
	})

	const scrollRef = useRef();

	const scrollToTop = () => {
		scrollRef.current?.scrollTo({
			y: height - 40,
			animated: true,
		})
	}

	const scrollDown = () => {
		scrollRef.current?.scrollTo({
			y: 0,
			animated: true,
		})
	}

	return (
		<SafeAreaView style={{backgroundColor: '#000000'}}>
			<StatusBar barStyle={'dark-content'} backgroundColor='#ffffff'/>
			<View style={styles.main}>
			<View style={styles.imageContainer}>
				<Image 
					style={styles.image} 
					source={{
						uri: largePosterURL
					}}
				/>
			</View>
				<ScrollView style={styles.contentContainer} ref={scrollRef} showsVerticalScrollIndicator={false}>
					<PostDetail 
						scrollDown={scrollDown} 
						followed={followed}
						setFollowed={setFollowed}
						content={content}
						owner={owner}
						participantList={participantList}
					/>
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	main: {
		backgroundColor: '#ffffff'
	},
	imageContainer: {
		...StyleSheet.absoluteFillObject,
		width: width,
		height: height,
		// backgroundColor: '#000000'
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
	contentContainer: {

	}
})

export default Post