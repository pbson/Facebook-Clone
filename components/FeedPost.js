
import React, { useEffect, useState } from 'react'

import {
	TouchableNativeFeedback,
	View,
	StyleSheet,
	Text,
	Image
} from "react-native";
import styled from 'styled-components/native'

import {
	Entypo,
	AntDesign,
	MaterialCommunityIcons,
	MaterialIcons
} from '@expo/vector-icons'
import Avatar from './Avatar'
import MasonryList from "react-native-masonry-list";
import Comment from '../screens/Comment'
import { SliderBox } from "react-native-image-slider-box";

import AsyncStorage from '@react-native-async-storage/async-storage';


const FeedPost = ({ route, navigation, avatar, id, described, username, created, modified, like, comment, image, is_liked, can_edit, can_comment, video }) => {
	const [images, setImage] = useState(false);
	const [likes, setLike] = useState(like);
	const [likeText, setLikeText] = useState(`${like}`);
	const [isLiked, setIsLike] = useState(is_liked);

	useEffect(() => {
		if (image) {
			setImage(image.length > 0)
		}
		setIsLike(is_liked);
	}, [])

	const openCommentView = () => {
		let postId = {
			id: id,
			like: likes
		}
		navigation.navigate('Comment', postId)
	}

	const likePost = async () => {
		let savedToken = await AsyncStorage.getItem('savedToken');
		const url = `http://303ef6e81cb6.ngrok.io/it4788/post/like?token=${savedToken}&id=${id}`
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			}
		})
		const json = await response.json();
		if (json.data.isliked === true && json.data.like == 1) {
			setLike(json.data.like)
			setLikeText(`You liked this post`)
			setIsLike(true)
		} else if (json.data.isliked === true && json.data.like > 1) {
			setLike(json.data.like)
			setLikeText(`You and ${like} others`)
			setIsLike(true)
		} else {
			setLike(json.data.like)
			setLikeText(`${json.data.like}`)
			setIsLike(false)
		}
	}
	return (
		<View style={styles.Container}>
			<View style={styles.Header}>
				<View style={styles.HeaderName}>
					<Avatar url={avatar} />
					<View style={{ paddingLeft: 10 }}>
						<Text style={styles.User}>{username}</Text>
						<View style={styles.Row}>
							<Text style={styles.Time}>{created}</Text>
							<Entypo
								name='dot-single'
								size={12}
								color='#747476'
							/>
							<Entypo
								name='globe'
								size={10}
								color='#747476'
							/>
						</View>
					</View>
				</View>

				<Entypo
					name='dots-three-horizontal'
					size={15}
					color='#222121'
				/>
			</View>

			<Text style={styles.Post}>
				{described}
			</Text>
			{ images ?
				<View style={styles.imageList}>
					<SliderBox
						images={image}
					/>
				</View>
				: null
			}
			<View style={styles.Footer}>
				<View style={styles.FooterCount}>
					<View style={styles.Row}>
						<View style={styles.IconCount}>
							<AntDesign
								name='like1'
								size={12}
								color='#FFFFFF'
							/>
						</View>
						<Text style={styles.TextCount}>{likeText}</Text>
					</View>
					<Text style={styles.TextCount}>{comment} comments</Text>
				</View>

				<View style={styles.Separator} />

				<View style={styles.FooterMenu}>
					<TouchableNativeFeedback onPress={() => likePost()} delayPressIn={0}>
						<View style={{ flexDirection: "row", padding: 10, justifyContent: "center", width: "50%" }}>
							{isLiked ?
								<View style={styles.Icon}>
									<AntDesign
										name='like1'
										size={20}
										color='#0078ff'
									/>
								</View> : 
								<View style={styles.Icon}>
									<AntDesign
										name='like2'
										size={20}
										color='grey'
									/>
								</View>
							}
							<Text style={styles.thisText}>Like</Text>
						</View>
					</TouchableNativeFeedback>
					<TouchableNativeFeedback onPress={() => openCommentView()} delayPressIn={0}>
						<View style={{ flexDirection: "row", padding: 10, justifyContent: "center", width: "50%" }}>
							<View>
								<MaterialCommunityIcons
									name='comment-outline'
									size={20}
									color='#424040'
								/>
							</View>
							<Text style={styles.thisText}>Comment</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
			</View>
			<View style={styles.break}></View>
		</View>
	)
}

export default FeedPost

const styles = StyleSheet.create({
	Container: {
		flex: 1
	},
	imageList: {
		paddingTop: 10,
		flex: 1,
		height: 300
	},
	HeaderName: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	Header: {
		"height": 50,
		"flexDirection": "row",
		"alignItems": "center",
		"justifyContent": "space-between",
		"paddingVertical": 5,
		"paddingHorizontal": 10,
		marginTop: 10
		// "padding": "0 11"
	},
	Row: {
		"alignItems": "center",
		"flexDirection": "row"
	},
	User: {
		"fontSize": 12,
		"fontWeight": "bold",
		"color": "#222121"
	},
	Time: {
		"fontSize": 9,
		"color": "#747476"
	},
	Post: {
		"fontSize": 12,
		"color": "#222121",
		"lineHeight": 16,
		// "padding": "0 11"
		"paddingVertical": 10,
		"paddingHorizontal": 15
	},
	Photo: {
		"marginTop": 9,
		"width": "100%",
		"height": 300
	},
	Footer: {
		// "padding": "0 11"
		"paddingVertical": 0,
		"paddingHorizontal": 15
	},
	FooterCount: {
		"flexDirection": "row",
		"justifyContent": "space-between",
		"paddingVertical": 9,
		"paddingHorizontal": 0
		// "padding": "9 0"
	},
	IconCount: {
		"backgroundColor": "#1878f3",
		"width": 20,
		"height": 20,
		"borderRadius": 10,
		"alignItems": "center",
		"justifyContent": "center",
		"marginRight": 6
	},
	TextCount: {
		"fontSize": 11,
		"color": "#424040"
	},
	Separator: {
		"width": "100%",
		"height": 1,
		"backgroundColor": "#f9f9f9"
	},
	FooterMenu: {
		"flexDirection": "row",
		"justifyContent": "space-around",
		"padding": 0
	},
	Icon: {
		"marginRight": 6
	},
	Text: {
		"fontSize": 12,
		"color": "#424040"
	},
	BottomDivider: {
		"width": "100%",
		"height": 9,
		"backgroundColor": "#f0f2f5"
	},
	break: {
		backgroundColor: '#CCC',
		height: 8,
		width: "100%"
	}
});
