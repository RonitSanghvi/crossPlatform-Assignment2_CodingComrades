import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../Controller/firebase";
import { Text, View, TextInput } from "react-native";
import { Button } from 'react-native-paper';
import Styles from "../Styles";

export default function Homepage({navigation}) {
  const [authUser, setAuthUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState("")

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Loged In",user)
        setEmail(user.email)
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    console.log("Inside sign out");
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        navigation.navigate('signup')
      })
      .catch((error) => console.log(error));
  };

  const handleAddName = () => {
    if (authUser) {
      updateProfile(authUser, {
        displayName: username,
      }).then(() => {
        console.log("Display name updated successfully", authUser);
        setUsername("")
      }).catch((error) => {
        console.log("Error updating display name:", error);
      });
    }
  }

  return (
    <View style={Styles.mainView}>
      {authUser ? (
        <> 
          {authUser.displayName ? <Text style={Styles.headingText}>{authUser.displayName}</Text>: <Text style={Styles.headingText}>{email}</Text>}
          <View style={Styles.line} />
          <Text style={Styles.secondText}>{`Email: ${authUser.email}`}</Text>
          <Button style={Styles.button} mode="contained" onPress={()=>{navigation.navigate('info')}}> Go to Info </Button> 
          <Button style={Styles.button} mode="contained" onPress={()=>{navigation.navigate('itemList', {email})}}> Phone Book </Button>
          <Button style={Styles.button} mode="contained" onPress={()=>{navigation.navigate('form', {email})}}>Add New Contact</Button>
          <Button style={Styles.button} mode="contained" onPress={userSignOut}>SignOut</Button>

          <View style={{borderWidth:2, borderColor: 'white', padding: 10}}>
            <TextInput
              style={Styles.textInput2}
              placeholderTextColor='gray'
              placeholder="Username"
              value={username}
              onChangeText={text => setUsername(text)}
            />
            <Button style={Styles.button} onPress={handleAddName} mode="contained">Edit your username</Button>
          </View>

        </>
      ) : (
        <Text style={{color:"white", padding:10, fontSize: 26}}>Signed Out</Text>
      )}
    </View>
  );
};