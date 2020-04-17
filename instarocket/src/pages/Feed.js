import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import more from '../assets/more.png'
import like from '../assets/like.png'
import comment from '../assets/comment.png'
import send from '../assets/send.png'
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function Feed() {

    const [feed, setFeed] = useState([]);

    useEffect(() => {
        async function getPosts() {
            const response = await api.get('posts')
            setFeed(response.data)
        }
        getPosts();

    }, []);


    return (
        <View style={styles.container}>
            <FlatList
                data={feed}
                keyExtractor={post => post._id}
                renderItem={({ item }) => (
                    <View style={styles.feedItem}>

                        <View style={styles.feedItemHeader}>
                            <View style={styles.userInfo}>
                                <Text style={styles.name}>{item.author}</Text>
                                <Text style={styles.place}>{item.place}</Text>
                            </View>

                            <Image source={more} />
                        </View>

                        <Image source={{ uri: `http://10.0.3.2:3333/files/${item.image}` }} style={styles.feedImage} />

                        <View style={styles.feedItemFooter}>

                            <View style={styles.actions}>
                                <TouchableOpacity style={styles.action} onPress={() => { }}>
                                    <Image source={like}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.action} onPress={() => { }}>
                                    <Image source={comment}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.action} onPress={() => { }}>
                                    <Image source={send}/>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.likes}> {item.likes} curtidas </Text>
                            <Text style={styles.description}> {item.description} </Text>
                            <Text style={styles.hashtags}> {item.hashtags} </Text>
                        </View>

                    </View>

                )}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
    },

    feedItem:{
        marginTop: 20
    },

    feedItemHeader:{
        paddingHorizontal: 15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center'
    },

    name: {
        fontSize: 14,
        color:'#000'
    },

    place: {
        fontSize: 12,
        color: '#666',
        marginTop: 2
    },

    feedImage: {
        width: '100%',
        height: 400,
        marginVertical: 15
    },

    feedImageFooter:{
        paddingHorizontal: 15
    },

    actions:{
        flexDirection: 'row'
    },

    action: {
        marginRight: 8
    },

    likes:{
        marginTop: 15,
        fontWeight: 'bold',
        color:'#000'
    },

    description: {
        lineHeight: 18,
        color:'#000'
    },

    hashtags: {
        color:"#4575F0"
    }


})