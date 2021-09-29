import React, {useState, useEffect, useRef} from 'react'
import {
	View, 
	SafeAreaView, 
	StatusBar,
	ScrollView, 
	StyleSheet,
	FlatList,
} from 'react-native'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import HomeHeader from '../../components/header-home';
import ActivityList from '../../components/activity-list';
import BannerList from '../../components/banner-home-list';
import PostList from '../../components/post-home-list';
import LoadingHome from '../../components/home-loading';

const useComponentWillMount = (func) => {
	const willMount = useRef(true)

	if (willMount.current) func()

	willMount.current = false
}

const HomeScreen = () => {
	const [list, setList] = useState(null)
	const [data, setData] = useState({});
	const [finishedData, setFinishedData] = useState(null);
	const [loading, setLoading] = useState(true);
	
	// const [activities, setActivities] = useState([]);

	// const fetchBatches = async (activities, setData, data) => {
	// 	let i;

	// 	for (i = 0; i<Math.ceil(activities.length / 10); i++) {
	// 		// console.log(activities.slice(10 * i, Math.min(10 * (i+1), activities.length)))
	// 		firestore()
	// 			.collection('activities')
	// 			.where(firestore.FieldPath.documentId(), 'in', activities.slice(10 * i, Math.min(10 * (i+1), activities.length)))
	// 			.onSnapshot(dataSnap => {
	// 				// console.log(snap.id)
	// 				dataSnap.forEach(item => {
	// 					data[item.id] = item.data();
	// 					setData(data)
	// 				})
	// 				// setTimeout(() => setLoading(false), 1000)
	// 				// setLoading(false)

	// 				// console.log(data);
	// 				// console.log(activities)
	// 				console.log(Date.now())
	// 			})
	// 		return data;
	// 	}
	// }

	// const checkData = data => {
	// 	dataArr = Object.values(data);
	// 	if (dataArr.length == 0) return false;
	// 	for (let i = 0; i < dataArr.length; i++) {
	// 		if (Object.keys(dataArr[i]).length == 0) return false; //else console.log(dataArr[i])
	// 	}
	// 	console.log(dataArr);
	// 	return true;
	// }

	// const fetchList = async (setList, setData, data) => {
	// 	// if (loading)
	// 	firestore()
	// 		.collection('lists')
	// 		.get()
	// 		.then(snap => {
	// 			const newList = [];
	// 			snap.forEach(item => {
	// 				newList.push(item.data())
	// 				// item.data().activities?.forEach(activity => {
	// 				// 	data[activity] = {};
	// 				// 	// setActivities([...activities].push(activity))
	// 				// 	setData(data);
	// 				// })

	// 				// fetchBatches(item.data().activities, setData, data);
	// 			})
	// 			// console.log(list)

	// 			// const activities = [...Object.keys(data)];
	// 			// console.log(data);
	// 			// console.log(activities)

	// 			// fetchBatches(activities, setData, data).then(value => {
					
	// 			// })
	// 			// const temp = fetchBatches(activities, setData, data);
				
	// 			// const value = await Promise.all([fetchBatches])


	// 			// console.log(data);
	// 			setList(newList)
	// 			// setFinishedData(data);
			
	// 			// console.log(data)
	// 			// console.log('end', Date.now())
	// 			setLoading(false);
	// 		})
	// }

	// useComponentWillMount(() => {
	// 	fetchList(setList, setData, data).then(() => {
			
	// 	})
	// })

	useEffect(() => {
		firestore()
			.collection('lists')
			.get()
			.then(snap => {
				const newList = [];
				snap.forEach(item => {
					newList.push(item.data())
				});
				setList(newList)
				// setLoading(false);
			})
	})

  return (
    <SafeAreaView style={{backgroundColor: '#000000'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor='#ffffff'/>
			<View style={styles.main}>
				<HomeHeader />
				<ScrollView style={styles.contentContainer}>
					<BannerList />
					{list?.map(item => (
						<ActivityList header={item.name} activities={item.activities} data={finishedData}/>
					))}
					{/* <FlatList
						renderItem={({item}) => (
							
								<ActivityList header={item.name} activities={item.activities} />
						
						)}
						data={list}
					>

					</FlatList> */}
					<PostList />
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
});

export default HomeScreen