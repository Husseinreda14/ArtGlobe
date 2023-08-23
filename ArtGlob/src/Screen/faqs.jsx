import { ActivityIndicator, ScrollView, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import BackIcon from '../../assets/Images/back-icon.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Faqs = ({ navigation }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['faqs'],
    queryFn: () =>
      axios.get(`${global.IP}/about/GetAllFAQS`).then((res) => {
        return res.data.faqsEntries;
      }),
  });

  const queryClient = useQueryClient();
  const handleRefetch = async () => {
    await queryClient.invalidateQueries("faqs");
  };
  const [editedFaqs, setEditedFaqs] = useState({});
  
  const handleInputChange = (faqId, field, text) => {
    setEditedFaqs((prevEditedFaqs) => ({
      ...prevEditedFaqs,
      [faqId]: {
        ...prevEditedFaqs[faqId],
        [field]: text,
      },
    }));
  };

  const handleEditButton = (faqId) => {
    const faqToUpdate = data.find((faq) => faq.id === faqId);
    setEditedFaqs({
      [faqId]: {
        question: faqToUpdate.question,
        answer: faqToUpdate.answer,
      },
    });
  };
  const handleSaveChanges = async (faqId) => {
    const token = await AsyncStorage.getItem('token');
    const editedFaq = editedFaqs[faqId];
  
    try {
      const response = await axios.put(
        `${global.IP}/about/updateFaq/${faqId}`,
        {
          question: editedFaq.question,
          answer: editedFaq.answer,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      await handleRefetch();
      Alert.alert('FAQ Updated Successfully!');
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
    <ScrollView style={{ height: "100%" }}>
         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={BackIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>FAQS</Text>
      <View style={styles.container}>
        {data?.map((faq) => (
          <View key={faq.id} style={styles.faqContainer}>
            <TextInput
              style={styles.questionInput}
              placeholder="Question"
              value={editedFaqs[faq.id]?.question || faq.question}
              onChangeText={(text) => handleInputChange(faq.id, 'question', text)}
              editable={editedFaqs[faq.id] !== undefined}
            />
            <TextInput
              style={styles.answerInput}
              placeholder="Answer"
              value={editedFaqs[faq.id]?.answer || faq.answer}
              onChangeText={(text) => handleInputChange(faq.id, 'answer', text)}
              editable={editedFaqs[faq.id] !== undefined}
            />
            {editedFaqs[faq.id] ? (
              <Button
                title="Save Changes"
                onPress={() => handleSaveChanges(faq.id)}
              />
            ) : (
              <Button
                title="Edit"
                onPress={() => handleEditButton(faq.id)}
              />
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop:120,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop:100,
  },
  faqContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
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
  questionInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 5,
  },
  answerInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 5,
  },
});

export default Faqs;
