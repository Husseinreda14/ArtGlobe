import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import BackIcon from '../../assets/Images/back-icon.png';
import MessagesModal from './MessageModal';
import OrdersModal from './OrderModal';
import ReviewsModal from './ReviewModal';

const UserPage = ({ navigation, route }) => {
  const { user } = route.params;
  const [messagesModalVisible, setMessagesModalVisible] = useState(false);
  const [ordersModalVisible, setOrdersModalVisible] = useState(false);
  const [reviewsModalVisible, setReviewsModalVisible] = useState(false);

  const closeModal = () => {
    setMessagesModalVisible(false);
    setOrdersModalVisible(false);
    setReviewsModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={BackIcon} style={styles.backIcon} />
      </TouchableOpacity>

      <View style={styles.userInfoContainer}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.userDetails}>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.email}>Email: {user.email}</Text>
          <Text style={styles.phone}>Phone Number: {user.phone}</Text>
          {user.desc && (
            <Text style={styles.email}>Description: {user.desc}</Text>
          )}
          <Text style={styles.joinDate}>
            Joined Art Globe on {new Date(user.createdAt).toDateString()}
          </Text>
          <Text style={styles.accountType}>
            Account Type: {user.isSeller ? 'Seller' : 'Buyer'}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => setMessagesModalVisible(true)} style={styles.modalButton}>
        <Text>Show Messages</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setOrdersModalVisible(true)} style={styles.modalButton}>
        <Text>Show Orders</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setReviewsModalVisible(true)} style={styles.modalButton}>
        <Text>Show Reviews</Text>
      </TouchableOpacity>

      <MessagesModal isVisible={messagesModalVisible} content={user.Messages} closeModal={closeModal} />
      <OrdersModal isVisible={ordersModalVisible} content={user.user} closeModal={closeModal} />
      <ReviewsModal isVisible={reviewsModalVisible} content={user.Reviews} closeModal={closeModal} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    height: '100%',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 70,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  userDetails: {
    flex: 1,
  },
  
  modalButton: {
    backgroundColor: '#eee',
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  backButton: {
    marginBottom: 20,
    marginTop: 15,
  },
  backIcon: {
    width: 50,
    height: 50,
  },
  phone: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  joinDate: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  accountType: {
    fontSize: 16,
    color: '#555',
  },
});

export default UserPage;
