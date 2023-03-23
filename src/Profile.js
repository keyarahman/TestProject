import React, { Component, useEffect, useState } from 'react'; import {
    StyleSheet
    , Text
    , View
    , TextInput
    , TouchableOpacity
    , AsyncStorage
    , Keyboard,
    ScrollView,
    Platform, PermissionsAndroid, Image, Pressable, Alert
} from 'react-native';
import { useSelector } from 'react-redux';

import { db } from './sqlite';
import { useNavigation } from '@react-navigation/native';
const Profile = () => {
    const navigation = useNavigation()
    const { userInfo } = useSelector(state => state.user)
    const deleteProfile = async () => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    `DELETE FROM Users
                        WHERE Email=? And Password=?`,
                    [userInfo?.email, userInfo?.password],
                    (tx, results) => {
                        if (results) {
                            navigation.navigate("Login")
                        } else {
                            Alert.alert("Something went wrong")
                        }

                    }
                )
            })
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <View style={styles.card}>
            <Image source={{ uri: userInfo?.userImage ? userInfo?.userImage : "https://reactnative.dev/img/tiny_logo.png" }} style={{ height: 80, width: 80, borderRadius: 40, }} />

            <View style={{ flexDirection: "column", padding: 20, width: "50%" }}>
                <Text numberOfLines={1} style={{ fontSize: 18, color: "black", fontWeight: "600", }}>
                    {userInfo?.userName}
                </Text>
                <Text numberOfLines={1} style={{ fontSize: 14, color: "black", fontWeight: "400" }}>
                    {userInfo?.email}
                </Text>
                <Text style={{ fontSize: 14, color: "black", fontWeight: "400" }}>
                    {userInfo?.language == 1 ? "English" : "Bangla"}
                </Text>
                <Text style={{ fontSize: 14, color: "black", fontWeight: "400", paddingVertical: 5 }}>
                    CSE,PHP,HTMlwek,
                </Text>
            </View>
            <View >
                <TouchableOpacity style={styles.button}>
                    <Text style={{ color: "white" }}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: "red" }]} onPress={deleteProfile}>
                    <Text style={{ color: "white" }}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    button: { paddingHorizontal: 25, backgroundColor: "green", paddingVertical: 10, borderRadius: 10, marginVertical: 2 },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        // paddingVertical: 85,
        // paddingHorizontal: 25,
        width: '96%',
        marginVertical: 10,
        alignSelf: "center",
        height: 170, padding: 10, flexDirection: "row", alignItems: "center"

    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});
