import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Styles from '../Styles';

export default Info = () => {
  return (
    <View style={Styles.mainView}>
      <Text style={Styles.headingText}>Coding Comrades</Text>
      <Text style={Styles.secondText}>Cross Platform - Assignment_2</Text>
      <View style={Styles.line} />
      <Text style={Styles.secondText}>Team Members</Text>
      <ScrollView >
        <Text style={Styles.thirdText}>Ronit Sanghvi</Text>
        <Text style={Styles.thirdText}>Masum Salvi</Text>
        <Text style={Styles.thirdText}>Saunik Dabhi</Text>
        <Text style={Styles.thirdText}>Himanshu Makhija</Text>
        <Text style={Styles.thirdText}>Karan Shah</Text>
      </ScrollView>
    </View>
  );
};