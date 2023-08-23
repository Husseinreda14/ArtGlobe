import React, { useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import BackIcon from '../../assets/Images/back-icon.png';

export default function AboutUs({ navigation }) {
  const [editedText, setEditedText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [entryId, setEntryId] = useState(null); // State to hold the entry id
  const queryClient = useQueryClient(); // Get the query client using useQueryClient

// Function to refetch the "myCategories" query
const handleRefetch = async () => {
  await queryClient.invalidateQueries("aboutus");
};
  const { isLoading, error, data } = useQuery({
    queryKey: ['aboutus'],
    queryFn: () =>
      axios.get(`${global.IP}/about/GetAllAbout`).then((res) => {
        return res.data.aboutUsEntries;
      }),
  });

  const handleEditButton = (id) => {
    setIsEditing(true);
    setEntryId(id); // Set the entry id
    setEditedText(data?.find((entry) => entry.id === id)?.text || ''); // Set the initial edited text
  };

  const handleSaveChanges = async () => {
    setIsEditing(false);
    const token = await AsyncStorage.getItem('token');

    try {
        
      const response = await axios.put(
        `${global.IP}/about/updateAbout/${entryId}`,
        { text: editedText },
        {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${token}`,
          },
        }
      );
      await handleRefetch();
      Alert.alert("About Us Updated Successfully!")
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  if (isLoading && error) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#38164A" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image source={BackIcon} style={styles.backIcon} />
          </TouchableOpacity>

          <Text style={styles.title}>About Us</Text>

          {data?.map((entry) => (
            
            <View key={entry.id} style={styles.entryContainer}>
                 <Text style={styles.title}> {"Last Updated: "}{entry.updatedAt.substring(0,10)}</Text>
              {isEditing && entry.id === entryId ? (
                <TextInput
                  style={styles.textInput}
                  multiline
                  value={editedText}
                  onChangeText={setEditedText}
                />
              ) : (
                <Text style={styles.entryText}>{entry.text}</Text>
              )}

              {isEditing && entry.id === entryId && (
                <Button title="Save Changes" onPress={handleSaveChanges} />
              )}

              {!isEditing && (
                <Button title="Edit" onPress={() => handleEditButton(entry.id)} />
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
    marginTop: 15,
  },
  backIcon: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  entryContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  entryText: {
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 10,
    padding: 8,
  },
});
