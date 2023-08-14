import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from '../Styles';

const Form = ({route}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSubmit = async () => {
    try {
      const newData = [firstName, lastName, country, mobileNumber];
      console.log("first", route.params)
      const userKey = route.params.email ? route.params.email : 'guest';

      
      // Get existing data from AsyncStorage
      const existingData = await AsyncStorage.getItem(userKey);
      let dataArray = [];
      if (existingData) {
        dataArray = JSON.parse(existingData);
      }

      // Add the new data to the array
      dataArray.push(newData);

      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem(userKey, JSON.stringify(dataArray));
      console.log('Form data saved:', dataArray);
      setFirstName("")
      setLastName("")
      setCountry("")
      setMobileNumber("")
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };

  return (
    <View style={Styles.mainView}>
      <Text style={Styles.secondText}>Add Phone Numbers</Text>
      <TextInput
        label="First Name"
        value={firstName}
        onChangeText={text => setFirstName(text)}
        style={Styles.button}
      />
      <TextInput
        label="Last Name"
        value={lastName}
        onChangeText={text => setLastName(text)}
        style={Styles.button}
      />
      <TextInput
        label="Country"
        value={country}
        onChangeText={text => setCountry(text)}
        style={Styles.button}
      />
      <TextInput
        label="Mobile Number"
        value={mobileNumber}
        onChangeText={text => setMobileNumber(text)}
        keyboardType="phone-pad"
        style={Styles.button}
      />
      <Button mode="contained" onPress={handleSubmit} style={Styles.button}>
        Submit
      </Button>
    </View>
  );
};

export default Form;