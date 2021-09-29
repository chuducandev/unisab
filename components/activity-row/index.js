import React, { useEffect, useState } from 'react'
import {
	View, StyleSheet, ScrollView, Text
} from 'react-native'

import firestore from '@react-native-firebase/firestore'

import ActivityCard from '../activity-card'

const ActivityRow = ({activities}) => {
	// console.log(activities)
	const [data, setData] = useState({});

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
	}, [])

	return (
		<ScrollView 
			contentContainerStyle={styles.rowContainer} 
			horizontal={true}
			showsHorizontalScrollIndicator={false}
		>
			{activities.map((activity, i) => (
				<ActivityCard id={activity} smallPosterURL2={data[activity]?.smallPosterURL}/>
			))}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	rowContainer: {
		paddingLeft: 10,
		paddingBottom: 25,
	},
})

export default ActivityRow