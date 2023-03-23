import { useNavigation } from '@react-navigation/native';
import React, { Component, useEffect, useState } from 'react'; import {
    StyleSheet
    , Text
    , View
    , TextInput
    , TouchableOpacity
    , AsyncStorage
    , Keyboard,
    Alert,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context"
import { db } from './sqlite';
const Login = () => {
    const navigation = useNavigation()
    const [dbdata, setDbdata] = useState({})
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState(false)

    const checkLoginn = async () => {
        if (email && password) {
            console.log("email")
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT Email,Password FROM Users WHERE Email='${email}' AND Password='${password}'`,
                    [],
                    (tx, results) => {
                        if (results.rows.item(0)) {
                            Alert.alert("Login successful")
                            navigation.navigate('Profile');
                        } else {
                            Alert.alert("Email or password invalid. Please try again later")

                        }
                        console.log("Dsf", results.rows.item(0))

                    }
                )
            })
        } else {
            Alert.alert("Please fill up these fields..")
        }


    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, }} />
            <TextInput style={styles.inputBox} onChangeText={(email) => setEmail(email)} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Enter Email"
                placeholderTextColor="#6F8FAF" selectionColor="#fff" keyboardType="email-address"
                onSubmitEditing={() => this.password.focus()} />
            <TextInput style={styles.inputBox} onChangeText={(password) => setPassword(password)} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Enter Password"
                secureTextEntry={true}
                placeholderTextColor="#6F8FAF" ref={(input) => this.password = input}
            />
            <TouchableOpacity style={styles.button} onPress={checkLoginn}>
                <Text style={styles.buttonText} onPress={this.saveData}>Login</Text>
            </TouchableOpacity>
            <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                <Text style={styles.signupText}>Not a User? </Text>
                <Text onPress={() => navigation.navigate("Register")} style={styles.signupButton}>Register here</Text>

            </View>
            <View style={{ flex: 1 }} />

        </SafeAreaView>
    )
}
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16, backgroundColor: "white",
    },
    signupTextCont: {
        flexGrow: 1,
        justifyContent: 'center', flexDirection: 'row', backgroundColor: "red",
    },
    signupText: {
        color: '#7393B3', fontSize: 15,
    },
    signupButton: {
        color: '#0000FF', fontSize: 15,
        fontWeight: '500',
    },
    inputBox: {
        borderColor: '#0000FF', borderRadius: 24, borderWidth: .4,
        paddingHorizontal: 15,
        fontSize: 15,
        color: '#6F8FAF',
        marginVertical: 9,
        marginHorizontal: 20
    },
    button: {
        backgroundColor: '#0000FF', borderRadius: 24,
        marginVertical: 9,
        paddingVertical: 11, marginHorizontal: 20
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '500', color: '#ffffff', textAlign: 'center'
    }
});