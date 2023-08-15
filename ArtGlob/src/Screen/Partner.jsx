import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
const Partner = ({ navigation,route }) => {
  const { partner } = route.params; // Access the props from route.params

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(partner.title);
//   const [editedDesc, setEditedDesc] = useState(category.desc);
  const [Source, setSource] = useState(partner.Image);
  const formData = new FormData();
  const handleEdit = () => {
    setIsEditing(true);
  };
  const queryClient = useQueryClient(); // Get the query client using useQueryClient

// Function to refetch the "myCategories" query
const handleRefetch = async () => {
  await queryClient.invalidateQueries("partners");
};

  const handleSave = async() => {
    const token=await AsyncStorage.getItem("token")
   
    setIsEditing(false);
    const formData = new FormData(); // Initialize FormData here
  
    // Append data to formData
    formData.append('title', editedTitle);
    // formData.append('desc', editedDesc);
  
    if (Source !== partner.Image) {
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
          `http://${global.IP}:3003/trustedby/${partner.id}`,
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
          `http://${global.IP}:3003/trustedby/${partner.id}`,
       
          {
            headers: {
           
              authorization: `Bearer ${token}`,
            },
          }
        );
       await handleRefetch()
        navigation.navigate("Home")
        // Handle response as needed
      
      } catch (error) {
        alert(error.response.data);
      }
    
    // Perform save action, e.g., update the backend
    // You can also update the editedTitle and editedDesc in the backend
  };
  const openImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
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
        <Text style={styles.title}>{editedTitle}</Text>
      )}
      {/* {isEditing ? (
        <TextInput
          style={styles.editableField}
          value={editedDesc}
          onChangeText={setEditedDesc}
          multiline
        />
      ) : (
        <Text style={styles.description}>{editedDesc}</Text>
      )} */}
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
    width: 200,
    height: 200,
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

export default Partner;
