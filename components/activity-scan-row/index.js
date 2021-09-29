import React, {useState, useEffect} from 'react'
import {
	View, StyleSheet, ScrollView, Text
} from 'react-native'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import ActivityCard from '../activity-scan-card'

const ActivityRow = ({activities, setId}) => {
	const [selected, setSelected] = useState(-1);
	const [data, setData] = useState({});
	
	function handleChangeSelected(index) {
		setSelected(index)
		setId(activities[index])
		console.log(activities[index])
	}
	const fetchBatches = async (activities, setData, data) => {
		for (let i = 0; i<Math.ceil(activities.length / 10); i++) {
			// console.log(activities.slice(10 * i, Math.min(10 * (i+1), activities.length)))
			firestore()
				.collection('activities')
				.where(firestore.FieldPath.documentId(), 'in', activities.slice(10 * i, Math.min(10 * (i+1), activities.length)))
				.onSnapshot(dataSnap => {
					// console.log(snap.id)
					dataSnap?.forEach(item => {
						data[item.id] = item.data();
						setData(data)
					})
					// setTimeout(() => setLoading(false), 1000)
					// setLoading(false)

					// console.log(data);
					// console.log(activities)
					// console.log(Date.now())
					// setTimeout(() => console.log(data), 5000)
				})
			return data;
		}
	}

	useEffect(() => {
		fetchBatches(activities, setData, data);
		if (activities.length) handleChangeSelected(0);
	}, [])

	return (
		<ScrollView 
			contentContainerStyle={styles.rowContainer} 
			horizontal={true}
			showsHorizontalScrollIndicator={false}
		>
			{activities.map((activity, i) => (
				<ActivityCard 
					id={activity}
					smallPosterURL2={data[activity]?.smallPosterURL} 
					selected={selected == i} 
					handleChangeSelected={handleChangeSelected}
					index={i}
					setId={setId}
				/>
			))}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	rowContainer: {
		paddingLeft: 20,
		paddingRight: 10,
		paddingBottom: 25,
	},
})

export default ActivityRow