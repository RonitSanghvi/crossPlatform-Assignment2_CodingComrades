import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Text, View, TextInput, Button, TouchableOpacity } from "react-native";
import { auth } from "../Controller/firebase";
import Styles from "../Styles";

export default function SignIn({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Sign In Success')
        setEmail("")
        setPassword("")
        navigation.navigate('status')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
        <View style={Styles.mainView}>
            <Text style={Styles.headingText}>Login</Text>
            <View style={Styles.line} />
            <Text style={Styles.secondText}>Email</Text>
            <TextInput 
                style={Styles.textInput}
                placeholder="Enter your Email"
                placeholderTextColor='gray'
                value={email}
                onChangeText={(e)=> setEmail(e)}
            />
            <Text style={Styles.secondText}>Password</Text>
            <TextInput 
                style={Styles.textInput}
                placeholder="Enter your Password"
                placeholderTextColor='gray'
                value={password}
                secureTextEntry = {true}
                onChangeText={(e)=> setPassword(e)}
            />
            
            <Button title="Login" onPress={signIn} />

            <TouchableOpacity onPress={()=> navigation.navigate('signup')}>
                <Text style={Styles.thirdText}>New User ? SignUp</Text>
            </TouchableOpacity>


        </View>
  );
};