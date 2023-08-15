import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import BackIcon from '../../assets/Images/back-icon.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
const Reviews = ({ navigation, route }) => {
  const { product } = route.params;
  const [selectedReview, setSelectedReview] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const queryClient = useQueryClient(); // Get the query client using useQueryClient

// Function to refetch the "myCategories" query
const handleRefetch = async () => {
  await queryClient.invalidateQueries("products");
};

  const handleDeleteReview = async() => {
    const token=await AsyncStorage.getItem("token")
   


   
    try {
  

        const response = await axios.delete(
          `http://${global.IP}:3003/review/deleteone/${selectedReview.id}`,
       
          {
            headers: {
           
              authorization: `Bearer ${token}`,
            },
          }
        );
    await    handleRefetch()
        navigation.navigate("Home")
        setIsDeleteModalVisible(false);
        // Handle response as needed
      
      } catch (error) {
        alert(error.response.data.message);
      }
    
    
  };
  const openDeleteModal = (review) => {
    setSelectedReview(review);
    setIsDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setSelectedReview(null);
    setIsDeleteModalVisible(false);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={BackIcon} style={styles.backIcon} />
      </TouchableOpacity>
      <View style={styles.reviewsContainer}>
      {product.Reviews.map((review, index) => (
          <TouchableOpacity
          key={index}
          style={styles.reviewContainer}
          onPress={() => openDeleteModal(review)}
        >

          <Image source={{ uri: review.User.avatar }} style={styles.avatar} />
          <View style={styles.reviewContent}>
            <Text style={styles.username}>{review.User.username}</Text>
            <Text style={styles.star}>{"★".repeat(Number(review.star))}</Text>
            <Text style={styles.reviewText}>{review.desc}</Text>
          </View>
         
        
        </TouchableOpacity>
      ))}
       </View>
       <Modal
        animationType="slide"
        transparent={true}
        visible={isDeleteModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to delete this review?
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleDeleteReview}
            >
              <Text style={styles.modalButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={closeDeleteModal}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#38164A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 16,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  backIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  avatar: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 30,
  },
  reviewContent: {
    marginLeft: 10,
  },
  reviewsContainer: {
    marginTop: 100, // Adjust the margin as needed
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  star: {
    fontSize: 18,
    color: 'gold',
  },
  reviewText: {
    fontSize: 16,
    color: '#666',
  },
});

export default Reviews;
