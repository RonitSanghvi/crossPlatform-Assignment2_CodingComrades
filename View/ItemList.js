import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from '../Styles';

export default ItemList = ({route}) => {

  const [dataList, setDataList] = useState([]);
  const userKey = route.params.email ? route.params.email : 'guest';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const dataString = await AsyncStorage.getItem(userKey);
      if (dataString) {
        const dataArray = JSON.parse(dataString);
        setDataList(dataArray);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (index) => {
    try {
      const updatedDataList = dataList.filter((_, i) => i !== index);
      await AsyncStorage.setItem(userKey, JSON.stringify(updatedDataList));
      setDataList(updatedDataList);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <View>
      <Text style={Styles.fourthText}>Phone Book</Text>
      <ScrollView horizontal>
        <DataTable>

          <DataTable.Header>
            <DataTable.Title style={Styles.titleHeading}>First Name</DataTable.Title>
            <DataTable.Title style={Styles.titleHeading}>Last Name</DataTable.Title>
            <DataTable.Title style={Styles.titleHeading}>Country</DataTable.Title>
            <DataTable.Title style={{width:100}}>Mobile Number</DataTable.Title>
            <DataTable.Title style={Styles.titleHeading}>Actions</DataTable.Title>
          </DataTable.Header>

          {dataList.map((item, index)=> (
            <DataTable.Row key={index}>
              <DataTable.Cell style={Styles.titleHeading}>{item[0]}</DataTable.Cell>
              <DataTable.Cell style={Styles.titleHeading}>{item[1]}</DataTable.Cell>
              <DataTable.Cell style={Styles.titleHeading}>{item[2]}</DataTable.Cell>
              <DataTable.Cell style={{width:100}}>{item[3]}</DataTable.Cell>
              <DataTable.Cell style={Styles.titleHeading}>
                <TouchableOpacity onPress={() => handleDelete(index)}>
                  <Text style={Styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </View>
  );
};