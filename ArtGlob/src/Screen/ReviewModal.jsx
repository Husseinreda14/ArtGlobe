// ReviewsModal.js
import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ReviewsModal = ({ isVisible, content, closeModal }) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent={false} onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Reviews</Text>
        <ScrollView style={styles.modalContent}>
  {content.map((item, index) => (
    <View key={index} style={styles.reviewContainer}>
      <Text style={styles.reviewTitle}>Review ID: {item.id}</Text>
      <Text>Rating: {item.star}</Text>
      <Text>Date: {new Date(item.createdAt).toDateString()}</Text>
      <Text>Product Title: {item.Product.title}</Text>
      <Text>Description: {item.desc}</Text>
    </View>
  ))}
</ScrollView>
        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    modalContent: {
        flex: 1,
        width: '100%',
      },
      modalItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      reviewContainer: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
      },
      reviewTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
      },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop:40
    },
    modalContent: {
      flex: 1,
      width: '100%',
    },
    modalItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    closeButton: {
      alignSelf: 'flex-end',
      padding: 10,
      marginTop: 20,
    },
    closeButtonText: {
      fontSize: 16,
      color: 'blue',
    },
  });
  

export default ReviewsModal;
