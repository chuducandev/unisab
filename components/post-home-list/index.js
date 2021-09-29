import React, {useState, useEffect} from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
} from 'react-native';

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import PostCard from '../post-home-card';

// const postList = [...Array(3)]

const PostList = () => {
	const [posts, setPosts] = useState(null)

	useEffect(() => {
		firestore()
			.collection('activities')
			.limit(3)
			.get()
			.then(snap => {
				const newPosts = [];
				snap.forEach(item => {
					newPosts.push({
						id: item.id,
						largePosterURL: item.data().largePosterURL,
						creator: item.data().creator != "" ? item.data().creator : "RqRUAyGofOPAhlHKqJ9r8lRKW4X2"
					})
				})
				setPosts(newPosts)
			})
	})

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Not enough...?</Text>
			{/* {posts?.map(post => (
				<PostCard post={post} />
			))} */}
			<FlatList 
				renderItem={({item}) => (
					<PostCard post={item} />
				)}
				data={posts}
			/>
			<Text style={styles.footer}>That's all we have now :)</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 0,
		width: '100%',
		// borderWidth: 1,
	},
	header: {
		fontFamily: 'SVN-Poppins Bold',
		marginHorizontal: 20,
		// marginBottom: 20,
		fontSize: 18,
	},
	footer: {
		fontFamily: 'SVN-Poppins Regular',
		color: '#A1A1A1',
		textAlign: 'center',
		marginBottom: 20,
	}
})

export default PostList