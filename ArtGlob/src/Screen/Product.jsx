import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import BackIcon from '../../assets/Images/back-icon.png'
const Product = ({ navigation,route }) => {
  const { product } = route.params; // Access the props from route.params

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(product.title);
  const [editedDesc, setEditedDesc] = useState(product.desc);
  const [Source, setSource] = useState(product.coverImage);
  const [productImages, setProductImages] = useState([
    product.coverImage, // Adding the cover image to the list of images
    ...product.ProductImages.map(image => image.image), // Adding other product images
  ]);
  const formData = new FormData();
  const handleEdit = () => {
    setIsEditing(true);
  };
  const queryClient = useQueryClient(); // Get the query client using useQueryClient

// Function to refetch the "myCategories" query
const handleRefetch = async () => {
  await queryClient.invalidateQueries("products");
};

  
  const handleDelete = async() => {
    const token=await AsyncStorage.getItem("token")
   


   
    try {
  

        const response = await axios.delete(
          `http://${global.IP}:3003/product/deleteone/${product.id}`,
       
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
        alert(error.response.data.message);
      }
    
    
  };
  const handleContactSeller = () => {
    // Open the default email client with a pre-filled email to the seller
    Linking.openURL(`mailto:${product.User.email}`);
  };
  const handleShowReviews = () => {
   
    navigation.navigate('Reviews', { product })
  };
 
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={BackIcon} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>{"Title: "}{editedTitle}</Text>
      <Text style={styles.title}>{"Seller Name: "}{product.User.username}</Text>
      <View style={styles.imageContainer}>
        <ScrollView horizontal>
          {productImages.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.image} />
          ))}
        </ScrollView>
      </View>

   
      <Text style={styles.description}>{"Description: "}{editedDesc}</Text>
      <Text style={styles.description}>{"Price: "}{product.price}$</Text>

      <TouchableOpacity style={styles.button} onPress={handleContactSeller}>
        <Text style={styles.buttonText}>Contact The Seller</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleShowReviews}>
        <Text style={styles.buttonText}>Show Product Reviews</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  imageContainer: {
    height: 300, // Set a fixed height for the image container
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 10,
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

export default Product