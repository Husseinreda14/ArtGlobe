import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Signin = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      if(username=="" || password=="" ){
        Alert.alert("Please enter all fields")
      }else
      {setLoading(true);
      const res = await axios.post(`${global.IP}/auth/loginAdmin`, { username, password });
// console.log(res.data.token);
await AsyncStorage.setItem("token",res.data.token)
await AsyncStorage.setItem("username",res.data.user.username)
await AsyncStorage.setItem("role",res.data.user.role)
      // Perform navigation to the admin dashboard or display a success message
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });}
    } catch (err) {
      Alert.alert(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>ArtGlobe Admin Dashboard</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Logging In...' : 'Login'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ECEFF1', // A light background color
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
    color: '#2E3440', // Dark text for contrast
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 8, 
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  button: {
    backgroundColor: '#38164A',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 50,  // Rounded edges for a pill-like button
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    transform: [{ scale: 1 }], // Default scale
  },
  disabledButton: {
    backgroundColor: 'lightgray',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default Signin;
