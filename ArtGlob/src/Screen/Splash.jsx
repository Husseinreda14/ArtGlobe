import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Splash = ({ navigation }) => {
  const translateX = new Animated.Value(-100);

  const animateText = () => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: false,
    }).start(() => {
      checkTokenAndNavigate(); // Start token check after animation
    });
  };

  const checkTokenAndNavigate = async () => {
    
      const token = await AsyncStorage.getItem('token'); // Check if token is present in AsyncStorage
      if (token) {
        // Navigate to "Home" if token is present
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        // Navigate to "Signin" if token is not present
        navigation.reset({
          index: 0,
          routes: [{ name: 'Signin' }],
        });
      }
    
  };

  useEffect(() => {
    animateText();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.animatedText, { transform: [{ translateX }] }]}>
        ArtGlobe
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#38164A',
  },
});

export default Splash;
