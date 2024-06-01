import { FlatList, Image, ListRenderItem, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GroupType } from '@/types/groupType'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'


export default function GroupListings({ listings }: {listings: GroupType[]}) {
    
    
    const renderItem:ListRenderItem<GroupType> = ({item}) => {
        return (
            <View style={styles.item}>
                <Image
                    source={{uri: item.image}}
                    style={styles.image}
                />
                <View>
                    <Text style={styles.itemTxt}>{item.name}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Ionicons
                            name="star"
                            size={20}
                            color={Colors.primaryColor}
                        />
                        <Text style={styles.rating}>{item.rating}</Text>
                        <Text style={styles.reviews}>{item.reviews}</Text>
                    </View>
                </View>
            </View>
        )
    }
    
    return (
        <View style={{marginVertical: 20}}>
            <Text style={styles.title}>Top Travel Groups</Text>
            <FlatList
                data={listings}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 10,
        marginRight: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },

    title: {
        fontSize: 22,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 10,
    },

    itemTxt: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 8,
    },

    image: {
        width: 80,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    }, 

    rating: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.black,
        marginLeft: 5,
    },

    reviews: {
        fontSize: 14,
        color: '#999'
    }
})



