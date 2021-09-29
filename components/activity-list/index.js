import React, {useState, useEffect} from 'react'
import {
	View, Text, StyleSheet
} from 'react-native'
import ActivityCard from '../activity-card'

import ActivityRow from '../activity-row'

const ActivityList = ({header, activities}) => {
	// const [currentData, setCurrentData] = useState(null);

	// console.log('here', data);
	if (!activities || !activities?.length) return null;

	// useEffect(() => {
	// 	setCurrentData(data)
	// 	// console.log('here', currentData)
	// }, [data])

	return (
		<View style={styles.container}>
			<Text style={styles.header}>{header}</Text>
			<ActivityRow activities={activities} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		// marginBottom: 10,
	},	
	header: {
		fontFamily: 'SVN-Poppins Bold',
		marginHorizontal: 20,
		fontSize: 18,
		// borderWidth: 1,
		// fontWeight: '700',
	},
})

export default ActivityList