import React from 'react'
import {
	View, 
	StyleSheet,
	Dimensions,
} from 'react-native'

import Carousel from 'react-native-snap-carousel'

import BannerCard from '../banner-home-card'

const { width, height } = Dimensions.get('window');

const bannerData = [
	"https://live.staticflickr.com/65535/51306269663_61d573263b_k_d.jpg",
	"https://live.staticflickr.com/65535/51307083705_5275752178_k_d.jpg",
	"https://live.staticflickr.com/65535/51305331232_6dd5d814e2_k_d.jpg",
	"https://live.staticflickr.com/65535/51306270088_d7a7130473_k_d.jpg",
]

const BannerList = () => {
	return (
		<View>  
			<Carousel
				data={bannerData}
				renderItem={({item, i}) => (
					<BannerCard photoURL={item} />
				)}
				itemWidth={width - 80}
				// itemHeight={0.6 * (width - 80) + }
				sliderWidth={width}
				loop={true}
				contentContainerCustomStyle={styles.container}
				autoplay={true}
				autoplayInterval={2000}
				lockScrollWhileSnapping={true}
				enableMomentum={false}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		// height: 0.6 * (width - 80) + 56,
		paddingTop: 14,
		paddingBottom: 40,
		borderWidth: 1,
		// flexDirection: 'column',
		// justifyContent: 'space-between',
		// alignItems: 'center',
	}	
})

export default BannerList