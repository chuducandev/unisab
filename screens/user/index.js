import React, {useState, useEffect} from 'react'
import {
	View, 
	SafeAreaView, 
	StatusBar,
	ScrollView, 
	StyleSheet,
	Dimensions,
	Image,
	Text,
} from 'react-native'

import UserHeader from '../../components/header-user';
import ActivityList from '../../components/activity-list';
import { create } from 'react-test-renderer';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window')

const UserScreen = () => {
	const [userData, setUserData] = useState(null);
	const navigation = useNavigation()

	useEffect (() => {
		firestore()
			.collection('users')
			.doc(auth().currentUser.uid)
			.get()
			.then(snap => {
				// console.log("User:", snap.data());
				setUserData(snap.data());
			})
	})

  return (
    <SafeAreaView style={{backgroundColor: '#000000'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor='#ffffff'/>
			<View style={styles.main}>
				<UserHeader />
				<ScrollView style={styles.contentContainer}>
					<View style={styles.avatarContainer}>
						<View style={{borderWidth: 1, borderRadius: 75, backgroundColor: '#F1F1F1'}}>
							<Image 
								source={{
									uri: userData?.profilePhotoURL,
								}}
								style={styles.avatar}
							/>
						</View>
					</View>
					<Text style={styles.name}>{userData?.displayName}</Text>
					<View style={styles.briefContainer}>
						<View style={styles.briefDivider}>
							<Text style={styles.briefNumber}>{userData? userData.created.length : 0}</Text>
							<Text style={styles.briefUnit}>Owned</Text>
						</View>
						<View style={styles.briefDivider}>
							<Text style={styles.briefNumber}>{userData? userData.attendances.length : 0}</Text>
							<Text style={styles.briefUnit}>Joined</Text>
						</View>
						<View style={styles.briefDivider}>
							<Text style={styles.briefNumber}>{userData?.numOfFollowers}</Text>
							<Text style={styles.briefUnit}>Followers</Text>
						</View>
						<View style={styles.briefDivider}>
							<Text style={styles.briefNumber}>{userData?.numOfFollowings}</Text>
							<Text style={styles.briefUnit}>Following</Text>
						</View>
					</View>
					<ActivityList activities={userData?.created} header="Hosted by this user"/>
					<ActivityList activities={userData?.attendances} header="Attendances" />
				</ScrollView>
			</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
	main: {
		backgroundColor: '#ffffff',
		height: '100%',
	},	
  contentContainer: {
    backgroundColor: '#ffffff',
    // height: '100%',
		flex: 1,
  },
	avatarContainer: {
		width: '100%',
		flex: 0,
		alignItems: 'center',
		marginBottom: 10,
	},
	avatar: {
		width: 150,
		height: 150,
		borderRadius: 75,
		borderWidth: 1,
		overflow: 'hidden',
		resizeMode: 'cover',
	},
	name: {
		fontFamily: 'SVN-Poppins Medium',
		fontSize: 24,
		marginBottom: 20,
		// width: '100%',
		textAlign: 'center',
		marginHorizontal: width/6,
	},
	briefContainer: {
		height: 43,
		flex: 0,
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
		marginHorizontal: 10,
	},
	briefDivider: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	briefNumber: {
		fontFamily: 'SVN-Poppins Bold',
		fontSize: 20,
		margin: -8,
	}, 
	briefUnit: {
		fontFamily: 'SVN-Poppins Regular',
		fontSize: 16,
	}, 
});

export default UserScreen;