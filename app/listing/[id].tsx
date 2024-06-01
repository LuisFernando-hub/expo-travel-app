import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import listingData from '@/data/destinations.json';
import { Feather, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import Animated, { SlideInDown, interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 300;

const ListingDetails = () => {
    const { id } = useLocalSearchParams();

    const listing: ListingType | undefined = listingData.find(
        (item) => item.id === id
    );

    const router = useRouter();

    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);
    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
                    ),
                },
                {
                    scale: interpolate(
                        scrollOffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [2, 1, 1]
                    )
                }
            ]
        }
    });

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: "",
                    headerTransparent: true,
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => router.back()}
                            style={{
                                backgroundColor: "rgba(255, 255, 255, 0.5)",
                                borderRadius: 10,
                                padding: 4,
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: Colors.white,
                                    padding: 6,
                                    borderRadius: 10,
                                }}
                            >
                                <Feather
                                    name='arrow-left'
                                    size={20}
                                />
                            </View>
                        </TouchableOpacity>
                    ),

                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => { }}
                            style={{
                                backgroundColor: "rgba(255, 255, 255, 0.5)",
                                borderRadius: 10,
                                padding: 4,
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: Colors.white,
                                    padding: 6,
                                    borderRadius: 10,
                                }}
                            >
                                <Ionicons
                                    name='bookmark-outline'
                                    size={20}
                                />
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
            <View style={styles.container}>
                <Animated.ScrollView
                    ref={scrollRef}
                    contentContainerStyle={{ paddingBottom: 150 }}
                    scrollEventThrottle={16}
                >
                    <Animated.Image
                        source={{ uri: listing?.image }}
                        style={[styles.image, imageAnimatedStyle]}
                    />
                    <View style={styles.contentWrapper}>
                        <Text style={styles.listingName}>{listing?.name}</Text>
                        <View style={styles.listingLocationWrapper}>
                            <FontAwesome5 name="map-marker-alt" size={18} color={Colors.primaryColor} />
                            <Text style={styles.listingLocationTxt}>{listing?.location}</Text>
                        </View>

                        <View style={styles.highlightWrapper}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.highLightIcon}>
                                    <Ionicons
                                        name="time"
                                        size={18}
                                        color={Colors.primaryColor}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.highLightTxt}>Duration</Text>
                                    <Text style={styles.highLightValue}>{listing?.duration} Days</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.highLightIcon}>
                                    <FontAwesome
                                        name="users"
                                        size={18}
                                        color={Colors.primaryColor}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.highLightTxt}>Person</Text>
                                    <Text style={styles.highLightValue}>{listing?.duration}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.highLightIcon}>
                                    <Ionicons
                                        name="star"
                                        size={18}
                                        color={Colors.primaryColor}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.highLightTxt}>Rating</Text>
                                    <Text style={styles.highLightValue}>{listing?.rating}</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={styles.listingDetails}>{listing?.description}</Text>
                    </View>
                </Animated.ScrollView>
            </View>
            <Animated.View style={styles.footer} entering={SlideInDown.delay(200)}>
                <TouchableOpacity
                    onPress={() => { }}
                    style={[styles.footerBtn, styles.footerBookBtn]}
                >
                    <Text style={styles.footerBtnText}>Book Now</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { }}
                    style={styles.footerBtn}
                >
                    <Text style={styles.footerBtnText}>${listing?.price}</Text>
                </TouchableOpacity>
            </Animated.View>
        </>
    );
}

export default ListingDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },

    image: {
        width: width,
        height: IMG_HEIGHT,
    },

    contentWrapper: {
        padding: 20,
        backgroundColor: Colors.white,
    },

    listingName: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
        letterSpacing: 0.5
    },

    listingLocationWrapper: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 10,
        alignItems: 'center'
    },

    listingLocationTxt: {
        fontSize: 14,
        marginLeft: 5,
        color: Colors.black,
    },

    highlightWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        justifyContent: 'space-between'
    },

    highLightIcon: {
        flexDirection: 'row',
        backgroundColor: '#F4F4F4',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 5,
        marginRight: 5,
        alignItems: 'center'
    },

    highLightTxt: {
        fontSize: 15,
        color: '#999',
    },

    highLightValue: {
        fontSize: 14,
        fontWeight: '600',
    },

    listingDetails: {
        fontSize: 16,
        color: Colors.black,
        lineHeight: 25,
        letterSpacing: 0.5
    },

    footer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        padding: 20,
        paddingBottom: 30,
        width: width,
    },

    footerBtn: {
        flex: 1,
        backgroundColor: Colors.black,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center'
    },

    footerBookBtn: {
        flex: 2,
        backgroundColor: Colors.primaryColor,
        marginRight: 20,
    },

    footerBtnText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
        textTransform: 'uppercase'
    }
})
