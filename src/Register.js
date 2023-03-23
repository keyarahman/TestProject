import React, { Component, useEffect, useState } from 'react'; import {
    StyleSheet
    , Text
    , View
    , TextInput
    , TouchableOpacity
    , AsyncStorage
    , Keyboard,
    ScrollView,
    Platform, PermissionsAndroid, Image, Pressable
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Dropdown } from 'react-native-element-dropdown';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import { CheckBox, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { aduserInfo } from './Redux';

import { db } from './sqlite';
const Register = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [toggleCheckBox1, setToggleCheckBox1] = useState(false)
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState()
    const [imageUri, setImageUri] = useState("")
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const data = [
        { label: 'English', value: '1' },
        { label: 'Bangla', value: '2' },
    ]
    const [Language, setlanguageValue] = useState(null);

    useEffect(() => {
        createTable();
    }, []);

    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "Users "
                + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Email TEXT, Password INTEGER);"
            )
        })
    }
    const SubmitData = async () => {

        if (Email.length == 0 || !Password) {
            alert('Please fill up these fields.')
        } else {
            try {
                dispatch(aduserInfo({
                    userName: Name,
                    email: Email,
                    password: Password,
                    userImage: imageUri,
                    language: Language
                }))
                await db.transaction(async (tx) => {
                    const results = await tx.executeSql(
                        "INSERT INTO Users (Email, Password) VALUES (?,?)",
                        [Email, Password]
                    );
                })

                navigation.navigate('Profile');
            } catch (error) {
                console.log(error);
            }
        }

    }



    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
            </View>
        );
    };

    const SelectImage = async () => {
        if (Platform.OS === "android") {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: "Gallary Permission",
                        message:
                            "App needs access to your gallery so you can take awesome pictures.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("You can use the camera");
                } else {
                    console.log("Camera permission denied");
                    return false
                }
            } catch (err) {
                console.warn(err);
                return false
            }
        }
        try {

            const res = await launchCamera({

                mediaType: "photo",
                cameraType: "front"

            })

            if (res.assets && res.assets?.length > 0) {
                console.log("res___", res.assets[0]?.uri)
                setImageUri(res.assets[0]?.uri)
                // console.log(res)


            }

        } catch (e) {

        }
    }




    return (

        <ScrollView style={styles.container}>
            <View style={{ padding: 20 }}>
                {/* <View style={{ flex: 1, marginTop: 20, backgroundColor: "red" }}> */}
                <Text style={styles.title}>Create an account</Text>
                <TextInput style={styles.inputBox} onChangeText={(val) => setName(val)} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Name"
                    placeholderTextColor="#6F8FAF" selectionColor="#fff" keyboardType="ascii-capable"
                    onSubmitEditing={() => this.password.focus()} />
                <TextInput style={styles.inputBox} onChangeText={(val) => setEmail(val)} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Email"
                    secureTextEntry={true}
                    keyboardType="email-address"
                    placeholderTextColor="#6F8FAF" ref={(input) => this.password = input}
                />
                <TextInput style={styles.inputBox} onChangeText={(val) => setPassword(val)} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Password"
                    secureTextEntry={true}
                    keyboardType="visible-password"
                    placeholderTextColor="#6F8FAF" ref={(input) => this.password = input}
                />
                {/* <Text style={styles.title}>Skill</Text> */}

                {/* <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                /> */}
                {/* <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
                    <View style={{ paddingRight: 40, justifyContent: "space-around", height: 100 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <CheckBox
                                disabled={false}
                                value={toggleCheckBox1}
                                onValueChange={(newValue) => setToggleCheckBox1(newValue)}
                            />
                            <Text style={styles.boxTextStyle}>CSS</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <CheckBox
                                    disabled={false}
                                    value={toggleCheckBox1}
                                    onValueChange={(newValue) => setToggleCheckBox1(newValue)}
                                />
                                <Text style={styles.boxTextStyle}>Html</Text>
                            </View>
                        </View>

                        <View style={{ justifyContent: "space-around", height: 100 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <CheckBox
                                    disabled={false}
                                    value={toggleCheckBox1}
                                    onValueChange={(newValue) => setToggleCheckBox1(newValue)}
                                />
                                <Text style={styles.boxTextStyle}>Php</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <CheckBox
                                    disabled={false}
                                    value={toggleCheckBox1}
                                    onValueChange={(newValue) => setToggleCheckBox1(newValue)}
                                />
                                <Text style={styles.boxTextStyle}>SQL</Text>
                            </View>
                        </View>
                    </View> */}

                <Text style={styles.title}>Photo</Text>
                {imageUri ?
                    <Pressable onPress={() => SelectImage()} >
                        <Image source={{ uri: imageUri }} style={{ width: 70, height: 70, alignSelf: "center" }} />

                    </Pressable> :
                    <TouchableOpacity style={{ borderColor: "blue", borderWidth: .4, borderRadius: 15, alignSelf: "center", alignItems: "center", justifyContent: "center", padding: 10 }} onPress={() => SelectImage()}>
                        <Text style={{ color: "#6F8FAF" }}>Upload photo </Text>
                    </TouchableOpacity>}





                <Text style={styles.title}>Select Language</Text>
                <Dropdown data={data}
                    activeColor={"#A7C7E7"}
                    itemContainerStyle={{ borderRadius: 10 }}
                    containerStyle={{ borderRadius: 10 }}
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    maxHeight={200}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Language"
                    value={Language}
                    onChange={item => {
                        setlanguageValue(item.value);
                    }}
                    renderItem={renderItem}
                />

                <TouchableOpacity style={styles.button} onPress={() => { SubmitData() }}>
                    <Text style={styles.buttonText} >Register</Text>
                </TouchableOpacity>
                {/* </View> */}
            </View>
        </ScrollView>
    )
}

export default Register

const styles = StyleSheet.create({
    title: { fontSize: 16, fontWeight: "500", color: "black", paddingVertical: 19 },
    boxTextStyle: { fontWeight: "500", color: "#6F8FAF" },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    signupTextCont: {
        flexGrow: 1,
        justifyContent: 'center', alignItems: 'flex-end', paddingVertical: 15, flexDirection: 'row',
    },
    signupText: {
        color: '#bd157a', fontSize: 15,
    },
    signupButton: {
        color: '#700d49', fontSize: 15,
        fontWeight: '500',
    },
    inputBox: {
        width: 299, borderColor: '#0000FF', borderRadius: 24, borderWidth: .4,
        paddingHorizontal: 15,
        fontSize: 15,
        color: '#6F8FAF',
        marginVertical: 9
    },
    button: {
        // width: 299,
        backgroundColor: '#0000FF', borderRadius: 24,
        marginVertical: 9,
        paddingVertical: 11, marginHorizontal: 20
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '500', color: '#ffffff', textAlign: 'center'
    },
    dropdown: {
        margin: 16,
        height: 50,
        borderColor: '#0000FF', borderWidth: .4,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        color: "#6F8FAF"
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10
    },
});