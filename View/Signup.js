import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity } from "react-native";
import { auth } from "../Controller/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Styles from "../Styles";

export default function SignUp({navigation}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");

    const signUp = (e) => {

        if(password===cPassword){
        
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Account Created')
                setEmail('')
                setPassword('')
                setCPassword('')
                navigation.navigate('signin')
            })
            .catch((error) => {
                console.log(error.code);
            });
        }
        else{
            console.log('Password and Confirm Password are different')
        }
    };

    return (
        <View style={Styles.mainView}>
            <Text style={Styles.headingText}>Create Account</Text>
            <View style={Styles.line} />

            <Text style={Styles.secondText}>Email</Text>
            <TextInput 
                style={Styles.textInput}
                placeholder="Enter your Email"
                placeholderTextColor='gray'
                value={email}
                onChangeText={(e)=>setEmail(e)}
                inputMode="email"
            />
            <Text style={Styles.secondText}>Password</Text>
            <TextInput 
                style={Styles.textInput}
                placeholder="Enter your Password"
                placeholderTextColor='gray'
                secureTextEntry = {true}
                value={password}
                onChangeText ={(e)=> setPassword(e)}
            />
            <Text style={Styles.secondText}>Confirm Password</Text>
            <TextInput 
                style={Styles.textInput}
                placeholder="Enter your Password again"
                placeholderTextColor='gray'
                secureTextEntry = {true}
                value={cPassword}
                onChangeText={(e)=> setCPassword(e)}
            />
            <Button title="Sign up" onPress={signUp}/>
            
            <TouchableOpacity onPress={()=> navigation.navigate('signin')}>
                <Text style={Styles.thirdText}>Already have an account ? Login</Text>
            </TouchableOpacity>

        </View>
    );
};