import React from 'react'
import {
	View, Text, StyleSheet
} from 'react-native'

import ActivityRow from '../activity-scan-row'

const ActivityList = ({activities, setId}) => {
	if (!activities || !activities?.length) return null;

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Choose an activity</Text>
			<ActivityRow activities={activities} setId={setId} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		// marginBottom: 10,
	},	
	header: {
		fontFamily: 'SVN-Poppins Bold',
		marginHorizontal: 30,
		fontSize: 18,
		// borderWidth: 1,
		// fontWeight: '700',
	},
})

export default ActivityList