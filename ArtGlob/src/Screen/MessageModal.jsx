// MessagesModal.js
import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MessagesModal = ({ isVisible, content, closeModal }) => {
    return (
        <Modal visible={isVisible} animationType="slide" transparent={false} onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Messages</Text>
            <ScrollView style={styles.modalContent}>
      {content.map((item, index) => (
        <View key={index} style={styles.reviewContainer}>
          <Text style={styles.reviewTitle}>Message ID: {item.id}</Text>
          <Text>chatId: {item.chatId}</Text>
          <Text>Date: {new Date(item.createdAt).toDateString()}</Text>
          <Text>Message: {item.desc}</Text>
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
      

  

export default MessagesModal;
