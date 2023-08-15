import React, { Component, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  ScrollView,
  PixelRatio,
  ImageBackground,
  Modal,
  TextInput
} from "react-native";
import { BlurView } from 'expo-blur';

import Add from "./../../assets/Images/Group10048.png";
import notification from "./../../assets/Images/Vector(1).png";
import rectangle from "./../../assets/Images/Rectangle5505.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from 'expo-image-picker';

import axios from "axios";
const  Home=({ navigation })=> {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [newImage, setNewImage] = useState('');
  const [showPassword, setShowPassword] = useState('');

const [newTitle, setNewTitle] = useState('');
const [newDesc, setNewDesc] = useState('');
const [newEmail, SetEmail] = useState('');
const [newUsername, setNewUsername] = useState('');
const [newPassword, setNewPassword] = useState('');
const queryClient = useQueryClient(); 
  const [pixelDensity, setPixelDensity] = useState(0);
  const handleRefetch = async () => {
    await queryClient.invalidateQueries("myCategories");
  };
  const handleRefetch1 = async () => {
    await queryClient.invalidateQueries("partners");
  };
  // AsyncStorage.clear()
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [adminModelVisible, setAdminModelVisible] = useState(false);
  const openModal = () => {
    setIsModalVisible(true);
  };
  const openModal1 = () => {
    setIsModalVisible1(true);
  };
  const OpenAdminModel = () => {
    setAdminModelVisible(true);
  };
  
  const closeModal = () => {
    setIsModalVisible(false);
    setNewDesc("");
        setNewImage("");
        setNewTitle("");
  };
  const closeModal1 = () => {
    setIsModalVisible1(false);
    setNewDesc("");
    setNewImage("");
    setNewTitle("");
  };
  const closeAdminModel = () => {
    setAdminModelVisible(false);
    SetEmail("");
    setNewPassword("");
    setNewUsername("");

  };
  const handleSubmit =async () => {
    const token=await AsyncStorage.getItem("token")
   
   
    const formData = new FormData(); // Initialize FormData here
  
    // Append data to formData
    formData.append('title', newTitle);
    formData.append('desc', newDesc);
  

      const uriParts = newImage.split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append('Image', {
        uri: newImage,
        name: `image.${fileType}`,
        type: `image/${fileType}`,
      });
    
   

    try {
  

        const response = await axios.post(
          `http://${global.IP}:3003/category/createCategory`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              authorization: `Bearer ${token}`,
            },
          }
        );
        setNewDesc("");
        setNewImage("");
        setNewTitle("");
await handleRefetch()
    
        
        closeModal(); 
        // Handle response as needed
  
      
      } catch (error) {
       alert(error)
      }
  
  };


  const handleLogout =async () => {
    await AsyncStorage.clear()
    navigation.reset({
      index: 0,
      routes: [{ name: 'Signin' }],
    });
  };


  const handleAddNewAdmin =async () => {
    const token=await AsyncStorage.getItem("token")
   
    try {
  

        const response = await axios.post(
          `http://${global.IP}:3003/auth/addAdmin`,
          {email:newEmail,password:newPassword,username:newUsername},
          {
            headers: {
           
              authorization: `Bearer ${token}`,
            },
          }
        );
        SetEmail("");
        setNewPassword("");
        setNewUsername("");

    
        
        closeAdminModel(); 
        // Handle response as needed
  alert("admin Added Successfully")
      
      } catch (error) {
        alert(error.response.data.message)
      }
  
  };
  const handlePartnerSubmit =async () => {
    const token=await AsyncStorage.getItem("token")
   
   
    const formData = new FormData(); // Initialize FormData here
  
    // Append data to formData
    formData.append('title', newTitle);
    
  

      const uriParts = newImage.split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append('Image', {
        uri: newImage,
        name: `image.${fileType}`,
        type: `image/${fileType}`,
      });
    
   

    try {
  

        const response = await axios.post(
          `http://${global.IP}:3003/trustedBy/create`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              authorization: `Bearer ${token}`,
            },
          }
        );
        setNewDesc("");
        setNewImage("");
        setNewTitle("");
     await   handleRefetch1()
   
        
        closeModal1(); 
        // Handle response as needed
  
      
      } catch (error) {
       
      }
  
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["myCategories"],
    queryFn: () =>
      axios.get(`http://${global.IP}:3003/category/getCategories`).then((res) => {
        return res.data.categories;
      }),
  });
  const { isLoading: isLoadingStats, error: errorStats, data: dataStats  } = useQuery({
    queryKey: ["partners"],
    queryFn: () =>
      axios.get(`http://${global.IP}:3003/trustedby/getAll`).then((res) => {
        return res.data.trustedByList;
      }),
  });
  const openImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
    });
  
    if (result.canceled) {
      return // Update the newImage state with the selected image URI
    }
    setNewImage(result.uri);
  };
  
 
  
  useEffect(() => {
   
    async function fetchUsername() {
      try {
        const userName = await AsyncStorage.getItem('username');
        const Role=await AsyncStorage.getItem("role");
        setUsername(userName);
        setRole(Role)
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    }

    fetchUsername();

    // Get the pixel density of the device's screen
    const density = PixelRatio.get();
    setPixelDensity(density);
  }, []); 
  if(isLoading && isLoadingStats){
    return  <Text style={{ fontSize: 20, fontWeight: "bold", color: "#3A3A3A" }}>
    Welcome  !
  </Text>;
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#3A3A3A" }}>
          Welcome {username} !
        </Text>

        <View style={{ flexDirection: "row", gap: 4 }}>
        {role=="Super-Admin" && (
  <TouchableOpacity onPress={OpenAdminModel}>
    <Image source={Add} style={{ width: 30, height: 30 }} />
  </TouchableOpacity>
)}
          <Image source={notification} style={{ width: 25, height: 28 }} />
        </View>
      </View>
      {/* <View>
        <ImageBackground
          source={rectangle}
          style={{
            width: "100%",
            height: 100,

            overflow: "hidden",
            marginTop: "10%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            //i want this text in the previous image
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "80%",
              marginBottom: "3%",
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{ fontSize: 25, color: "#1C3AAB", fontWeight: "bold" }}
              >
                1200 $
              </Text>
              <Text style={{ fontSize: 10, color: "#3A3A3A" }}>
                Total Profit Raised
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#7ED957",
                width: 134,

                height: 45,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 15, color: "#ffffff", fontWeight: "bold" }}
              >
                This Month
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "10%",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#3A3A3A",
          }}
        >
          Categories
        </Text>
        {/* <Image source={Add} style={{ width: 30, height: 30 }} /> */}
        <TouchableOpacity onPress={openModal}>
    <Image source={Add} style={{ width: 30, height: 30 }} />
  </TouchableOpacity>
      </View>
      <View>
   
      <Modal visible={isModalVisible} animationType="slide" transparent>
  <View style={styles.modalContainer}>
  <BlurView intensity={100} style={styles.blurView}>
  {newImage && (
      <Image style={styles.modalImage} source={{ uri: newImage }} />
    )}
     {!newImage && (
    
    <TouchableOpacity  onPress={openImagePicker} style={styles.addButtonModal}>
      <Text style={styles.addButtonText}>Add Image</Text>
    </TouchableOpacity>
     )}
    
    <TextInput
      style={styles.input}
      placeholder="Title"
      value={newTitle}
      onChangeText={setNewTitle}
    />
    <TextInput
      style={styles.input}
      placeholder="Description"
      value={newDesc}
      onChangeText={setNewDesc}
    />
    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
      <Text style={styles.buttonText}>Add</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={closeModal}>
      <Text style={styles.buttonText}>Cancel</Text>
    </TouchableOpacity>
    </BlurView>
  </View>
</Modal>
<Modal visible={adminModelVisible} animationType="slide" transparent>
  <View style={styles.modalContainer}>
  <BlurView intensity={100} style={styles.blurView}>
 
    
    <TextInput
      style={styles.input}
      placeholder="Email"
      value={newEmail}
      onChangeText={SetEmail}
    />
    <TextInput
      style={styles.input}
      placeholder="Username"
      value={newUsername}
      onChangeText={setNewUsername}
    />
    <View style={styles.passwordContainer}>
  <TextInput
    style={styles.passwordInput}
    placeholder="Password"
    secureTextEntry={!showPassword}
    value={newPassword}
    onChangeText={setNewPassword}
  />
  <TouchableOpacity
    onPress={() => setShowPassword(!showPassword)}
    style={styles.passwordToggle}
  >
    <Text style={styles.passwordToggleText}>
      {showPassword ? "Hide" : "Show"}
    </Text>
  </TouchableOpacity>
</View>
    <TouchableOpacity style={styles.button} onPress={handleAddNewAdmin}>
      <Text style={styles.buttonText}>Add</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={closeAdminModel}>
      <Text style={styles.buttonText}>Cancel</Text>
    </TouchableOpacity>
    </BlurView>
  </View>
</Modal>







  
</View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 4,
          marginTop: "10%",
          height: 200,
        }}
      >
     
     {data.map((category) => (
       <TouchableOpacity
       key={category.id}
       style={styles.categoryContainer}
       onPress={() => navigation.navigate('Category', { category })} // Handle category press
     >
       <View style={styles.imageContainer}>
         <Image source={{ uri: category.Image }} style={styles.image} />
         <Text style={styles.title}>{category.title}</Text>
       </View>
     </TouchableOpacity>
      ))}

      </View>
     
      


      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "10%",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#3A3A3A",
          }}
        >
          Partners
        </Text>
        {/* <Image source={Add} style={{ width: 30, height: 30 }} /> */}
        <TouchableOpacity onPress={openModal1}>
    <Image source={Add} style={{ width: 30, height: 30 }} />
  </TouchableOpacity>
      </View>
      <View>
   
      <Modal visible={isModalVisible1} animationType="slide" transparent>
  <View style={styles.modalContainer}>
  <BlurView intensity={100} style={styles.blurView}>
  {newImage && (
      <Image style={styles.modalImage} source={{ uri: newImage }} />
    )}
     {!newImage && (
    
    <TouchableOpacity  onPress={openImagePicker} style={styles.addButtonModal}>
      <Text style={styles.addButtonText}>Add Image</Text>
    </TouchableOpacity>
     )}
    
    <TextInput
      style={styles.input}
      placeholder="Title"
      value={newTitle}
      onChangeText={setNewTitle}
    />
    {/* <TextInput
      style={styles.input}
      placeholder="Description"
      value={newDesc}
      onChangeText={setNewDesc}
    /> */}
    <TouchableOpacity style={styles.button} onPress={handlePartnerSubmit}>
      <Text style={styles.buttonText}>Add</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={closeModal1}>
      <Text style={styles.buttonText}>Cancel</Text>
    </TouchableOpacity>
    </BlurView>
  </View>
</Modal>







  
</View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 4,
          marginTop: "10%",
          height: 200,
        }}
      >
     
     {dataStats.map((partner) => (
       <TouchableOpacity
       key={partner.id}
       style={styles.categoryContainer}
       onPress={() => navigation.navigate('Partner', { partner })} // Handle category press
     >
       <View style={styles.imageContainer}>
         <Image source={{ uri: partner.Image }} style={styles.image} />
         <Text style={styles.title}>{partner.title}</Text>
       </View>
     </TouchableOpacity>
      ))}

      </View>
      
    </View>
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
  <Text style={styles.logoutButtonText}>Logout</Text>
</TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: '#38164A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: 'center', // Center the button horizontally
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButton: {
    width: 30,
    height: 30,
    backgroundColor: '#38164A', // Or any desired background color
    borderRadius: 15, // Half of width or height to make it a circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    height:20,
    width:100
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    color: "#333",
  },
  passwordToggle: {
    padding: 8,
  },
  passwordToggleText: {
    color: "#38164A",
  },
  addButtonModal:{
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage:{
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#38164A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    marginLeft: "2%",
    marginRight: "2%",
    marginTop: "10%",
    flexDirection: "column",
  },

  categoryContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(160, 214, 255, 0.3)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  image: {
    width: 100,
    height: 100,
    // marginBottom: 8/,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    alignItems:"center",
    marginTop:"auto" // Center the text horizontally within the imageContainer
  },
});

export default Home;
