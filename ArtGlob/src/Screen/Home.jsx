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
  TextInput,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  Linking,
  Alert
} from "react-native";
import { BlurView } from 'expo-blur';
  import { BarChart, LineChart } from 'react-native-chart-kit';
import Add from "./../../assets/Images/Group10048.png";
import notification from "./../../assets/Images/Vector(1).png";
import rectangle from "./../../assets/Images/Rectangle5505.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from 'expo-image-picker';

import axios from "axios";
import StatsBar from "./StatsBar";

const  Home=({ navigation })=> {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  const [newImage, setNewImage] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const RecentlyJoinedUser = ({ user }) => {
    return (
      <TouchableOpacity    onPress={() => navigation.navigate('UserPage', { user })} >
        <View style={styles.userContainer}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.username}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const ContactUs = ({ user }) => {
    const handleReply = () => {
      const subject = 'Reply to Your Message  from ArtGlobe';
      const body = `Dear ${user.email},\n\n`;
  
      // Open Gmail with pre-filled subject and body
      const mailtoUrl = `mailto:${user.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
  
      Linking.openURL(mailtoUrl);
    };
  
    return (
  
        <View style={styles.userContainer}>
         
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.email}</Text>
            <Text style={styles.email}>{user.message}</Text>
             <TouchableOpacity style={styles.replyButton} onPress={handleReply}>
          <Text style={styles.replyButtonText}>Reply</Text>
        </TouchableOpacity>
          </View>
        </View>

    );
  };
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
  // const [chart, setChart] = useState();
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
   
   if(newImage=="" ||newTitle==""|| newDesc==""){
    Alert.alert("All Fields are required")
   }
 else{   const formData = new FormData(); // Initialize FormData here
  
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
          `${global.IP}/category/createCategory`,
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
  
        }  
       
      catch (error) {
       alert(error)
      }
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
      if(newUsername=="" || newPassword=="" ||newEmail==""){
Alert.alert("All fields are required!")
      }
  

       else{ const response = await axios.post(
          `${global.IP}/auth/addAdmin`,
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
  Alert.alert("admin Added Successfully")
        }
      } catch (error) {
        Alert.alert(error.response.data.message)
      }
  
  };
  const handlePartnerSubmit =async () => {
    const token=await AsyncStorage.getItem("token")
   
   if(newTitle=="" ||newImage==""){
    Alert.alert("All fields are required")
   }
  else{  const formData = new FormData(); // Initialize FormData here
  
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
          `${global.IP}/trustedBy/create`,
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
    }
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["myCategories"],
    queryFn: () =>
      axios.get(`${global.IP}/category/getCategories`).then((res) => {
        return res.data.categories;
      }),
  });
 
  
  const { isLoading: isLoadingStats, error: errorStats, data: dataStats  } = useQuery({
    queryKey: ["partners"],
    queryFn: () =>
      axios.get(`${global.IP}/trustedby/getAll`).then((res) => {
        return res.data.trustedByList;
      }),
  });
  const { isLoading: isLoadingStats1, error: errorStats1, data: dataStats1  } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      axios.get(`${global.IP}/product/getAll`).then((res) => {
        return res.data.products;
      }),
  });
  const { isLoading: isLoadingStats2, error: errorStats2, data: dataStats2 } = useQuery({
    queryKey: ['stats'],
    queryFn: () =>
      axios.get(`${global.IP}/user/getStatistics`).then((res) => {
        return res.data.data;
      }),
  });
  const { isLoading: isLoadingStats3, error: errorStats3, data: dataStats3 } = useQuery({
    queryKey: ['recent'],
    queryFn: () =>
      axios.get(`${global.IP}/user/getRecentlyJoinedUsers`,
     
      ).then((res) => {
        return res.data.users;
      }),
  });
  const { isLoading: isLoading4, error: errorStats4, data: dataStats4 } = useQuery({
    queryKey: ['contact'],
    queryFn: () =>
      axios.get(`${global.IP}/user/GetContactUs`,
     
      ).then((res) => {
        return res.data.Contact;
      }),
  });
 
  
  const openImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access media library is required!');
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
        const token=await AsyncStorage.getItem("token")
        setUsername(userName);
        setRole(Role)
        setToken(token)
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    }

    fetchUsername();

    // Get the pixel density of the device's screen
    const density = PixelRatio.get();
    setPixelDensity(density);
  }, []); 
  if(isLoading && isLoadingStats && isLoadingStats1 && isLoadingStats2 &&isLoadingStats3 && isLoading4){
    return   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator size="large" color="#38164A" />
  </View>
  }
  if(errorStats && error && errorStats1 &&errorStats2 &&errorStats3 &&errorStats4){
   return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
   <ActivityIndicator size="large" color="#38164A" /> </View>
  }
  const stats = ({ item }) => {
    return (
      <View
        style={{
          height: "100%",
          padding: "3%",
          width: "15%",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            height: "80%",
            backgroundColor: "rgba(160, 214, 255, 0.23)",
            borderRadius: 20,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              width: "100%",
              height: `${Math.min(
                (item.finished_steps / item.steps) * 100,
                100
              )}%`,

              backgroundColor: "#A0D6FF",
              borderRadius: 20,
            }}
          ></View>
        </View>
        <Text
          style={{
            fontFamily: "Poppins-Light",
            fontSize: 7,
            color: "#3A3A3A",
            alignSelf: "center",
          }}
        >
          {item.createdAt.substring(0, 3)}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={{ height: "100%" ,paddingHorizontal:8}}>
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#3A3A3A" ,marginTop:10}}>
          Welcome {username} !
        </Text>

        <View style={{ flexDirection: "row", gap: 10 ,marginBottom:20}}>
        {role=="Super-Admin" && (
  <TouchableOpacity onPress={OpenAdminModel}>
    <Image source={Add} style={{ width: 30, height: 30 ,marginTop:10}} />
  </TouchableOpacity>
)}
          {/* <Image source={notification} style={{ width: 25, height: 28 }} /> */}
        </View>
      </View>
      <View>
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
          Stats
        </Text>
        {/* <Image source={Add} style={{ width: 30, height: 30 }} /> */}

      </View>
     
   <StatsBar data={{
          labels: ['Sellers', 'Buyers', 'Products', 'Orders', 'Reviews'],
          datasets: [
            {
              data: [dataStats2?.Sellers, dataStats2?.buyers, dataStats2?.Products, dataStats2?.orders, dataStats2?.userReviews],
            
            },
          ],
        }}/>
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
  <Text style={{
    // backgroundColor: "#38164A",
    paddingVertical: 10,
    marginBottom:30,
    color:"black",
  fontWeight:"bold",
    fontSize:20,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  }}>Add Admin</Text>
    <View style={styles.passwordContainer}>
    <TextInput
      style={styles.passwordInput}
      placeholder="Email"
      value={newEmail}
      onChangeText={SetEmail}
    />
    </View>
    <View style={styles.passwordContainer}>
    <TextInput
      style={styles.passwordInput}
      placeholder="Username"
      value={newUsername}
      onChangeText={setNewUsername}
    />
    </View>
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
          gap: 7,
          marginTop: "10%",
          justifyContent: 'center',
    alignItems: 'center',
          
        }}
      >
     
     {data &&(data?.map((category) => (
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
      )))}

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
          Products
        </Text>
        {/* <Image source={Add} style={{ width: 30, height: 30 }} /> */}

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








  
</View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 7,
          marginTop: "10%",
          justifyContent: 'center',
    alignItems: 'center',
          
        }}
      >
     
     {dataStats1 &&(dataStats1?.map((product) => (
       <TouchableOpacity
       key={product.id}
       style={styles.categoryContainer}
       onPress={() => navigation.navigate('Product', { product })} // Handle category press
     >
       <View style={styles.imageContainer}>
         <Image source={{ uri: product.coverImage }} style={styles.image} />
         {/* <Text style={styles.title}>{product.title}</Text> */}
       </View>
     </TouchableOpacity>
      )))}

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
          gap: 7,
          marginTop: "10%",
          justifyContent: 'center',
    alignItems: 'center',
        }}
      >
     
     {dataStats &&(dataStats?.map((partner) => (
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
      )))}

      </View>
      
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
          Recently Joined Users
        </Text>
        {/* <Image source={Add} style={{ width: 30, height: 30 }} /> */}

      </View>
   
    
      <View style={styles.usersList}>
      {dataStats3?.map((user) => (
        <RecentlyJoinedUser key={user.id} user={user} />
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
         Messages 
        </Text>
        {/* <Image source={Add} style={{ width: 30, height: 30 }} /> */}

      </View>
   
    
      <View style={styles.usersList}>
      {dataStats4?.map((user) => (
        <ContactUs key={user.id} user={user} />
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
          About
        </Text>
        {/* <Image source={Add} style={{ width: 30, height: 30 }} /> */}

      </View>
   
    <View style={styles.buttonBox}>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Privacy")} >
          <Text style={styles.buttonText}>Privacy </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("AboutUs")} > 
          <Text style={styles.buttonText}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}  onPress={()=>navigation.navigate("Faqs")}>
          <Text style={styles.buttonText}>FAQS</Text>
        </TouchableOpacity>
      </View>
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
  <Text style={styles.logoutButtonText}>Logout</Text>
</TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
    
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
    usersList: {
      padding: 10,
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginVertical: 5,
      borderRadius: 5,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    email: {
      fontSize: 14,
      color: '#555',
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
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop:20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor:"black",
    borderRadius: 10,
    padding: 20,
  },
  button: {
    backgroundColor: '#38164A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
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
  replyButton: {
    backgroundColor:"#38164A",
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  replyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight:"bold"
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
   
    flex: 1, // Make sure the container takes the available space vertically
  },
  scrollView: {
    flex: 1, // Allow the ScrollView to take the available space
    marginHorizontal: 20,
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
    resizeMode: "stretch",
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
