import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import BackIcon from '../../assets/Images/back-icon.png'
const Category = ({ navigation,route }) => {
  const { category } = route.params; // Access the props from route.params

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(category.title);
  const [editedDesc, setEditedDesc] = useState(category.desc);
  const [Source, setSource] = useState(category.Image);
  const formData = new FormData();
  const handleEdit = () => {
    setIsEditing(true);
  };
  const queryClient = useQueryClient(); // Get the query client using useQueryClient

// Function to refetch the "myCategories" query
const handleRefetch = async () => {
  await queryClient.invalidateQueries("myCategories");
};

  const handleSave = async() => {
    const token=await AsyncStorage.getItem("token")
   
    setIsEditing(false);
    const formData = new FormData(); // Initialize FormData here
  
    // Append data to formData
    formData.append('title', editedTitle);
    formData.append('desc', editedDesc);
  
    if (Source !== category.Image) {
      const uriParts = Source.split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append('Image', {
        uri: Source,
        name: `image.${fileType}`,
        type: `image/${fileType}`,
      });
    }
    setIsEditing(false);

    try {
  

        const response = await axios.put(
          `${global.IP}/category/updateone/${category.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              authorization: `Bearer ${token}`,
            },
          }
        );
      await  handleRefetch()
        navigation.navigate("Home")
        

        // Handle response as needed
      
      } catch (error) {
        // alert(error.response.data);
      }
    
    // Perform save action, e.g., update the backend
    // You can also update the editedTitle and editedDesc in the backend
  };
  const handleDelete = async() => {
    const token=await AsyncStorage.getItem("token")
   


   
    try {
  

        const response = await axios.delete(
          `${global.IP}/category/deleteone/${category.id}`,
       
          {
            headers: {
           
              authorization: `Bearer ${token}`,
            },
          }
        );
    await    handleRefetch()
        navigation.navigate("Home")
        // Handle response as needed
      
      } catch (error) {
       Alert.alert(error.response.data.message);
      }
    
    // Perform save action, e.g., update the backend
    // You can also update the editedTitle and editedDesc in the backend
  };
  const openImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access media library is required!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0,
              });
      if (result.canceled) {
  return;
      }
   
      setSource(result.uri)

    }

  return (
    <ScrollView contentContainerStyle={styles.container}>
           <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={BackIcon} style={styles.backIcon} />
      </TouchableOpacity>
       <TouchableOpacity onPress={openImagePicker}>
      <Image source={{ uri: Source }} style={styles.image} />
    </TouchableOpacity>
      {isEditing ? (
        <TextInput
          style={styles.editableField}
          value={editedTitle}
          onChangeText={setEditedTitle}
        />
      ) : (
        <Text style={styles.title}>{"Title: "}{editedTitle}</Text>
      )}
      {isEditing ? (
        <TextInput
          style={styles.editableField}
          value={editedDesc}
          onChangeText={setEditedDesc}
          multiline
        />
      ) : (
        <Text style={styles.description}>{"Description: "}{editedDesc}</Text>
      )}
      {isEditing ? (
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        
      )}
         
         <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 16,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  backIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  editableField: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    width: '100%',
  },
  button: {
    backgroundColor: '#38164A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Category;
