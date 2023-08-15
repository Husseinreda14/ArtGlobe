import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  View,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
//   import BackIcon from "../../../assets/BackIcon.png";
//   import { useDispatch, useSelector } from "react-redux";
//   import NotificationImage from "../../../assets/NotificationImage.png";
//   import { GetUserNotifications } from "../../Redux/User/UserActions";
//   import moment from "moment";
//   import { useIsFocused } from "@react-navigation/native";
//   import Logo from "../../../assets/Logo.png";
//   import { getFriendRequests } from "../../Redux/Friend/FriendActions";
import notification from "./../../assets/icon.png";
//gt logic

const Notification = ({ navigation }) => {
  // const { userinfo, userNotifications } = useSelector(
  //   (store) => store.userReducer
  // );

  //     const { friendRequests } = useSelector((store) => store.FriendReducer);
  //     const isFocused = useIsFocused();
  //     const dispatch = useDispatch();
  //     const [Friend,setFriend]=useState(0);
  //     const [page, setPage] = useState(1);
  //     const [loading, setLoading] = useState(false);
  //     const [userdata, setuserdata] = useState([]);
  //   // console.log(friendRequests.length);
  //     useEffect(() => {
  //       dispatch(getFriendRequests());
  //       dispatch(GetUserNotifications(page));
  //     }, [dispatch, page]);
  //     useEffect(() => {
  //       dispatch(getFriendRequests());
  //      setFriend(friendRequests.length)
  //     }, [dispatch,isFocused]);

  //     useEffect(() => {
  //       setLoading(true);
  //       setuserdata((prevData) => [...prevData, ...userNotifications]);
  //       setLoading(false);

  //     }, [userNotifications,isFocused]);

  //     const handleScroll = (event) => {
  //       const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
  //       const paddingToBottom = 20;
  //       if (
  //         layoutMeasurement.height + contentOffset.y >=
  //         contentSize.height - paddingToBottom
  //       ) {
  //         // User has reached the end of scroll, load more data
  //         if (!loading) {
  //           setLoading(true);
  //           setPage((prevPage) => prevPage + 1);
  //         }
  //       }
  //     };

  return (
    <View style={styles.Container}>
      <View
        style={{
          height: 210,
          width: "100%",
          backgroundColor: "#fff",
          borderBottomLeftRadius: 50,
        }}
      >
        <View style={styles.Header}>
          {/* <TouchableOpacity
              style={{
                backgroundColor: "transparent",
                height: 20,
                width: 20,
                marginLeft: 30,
                marginTop: 20,
              }}
              onPress={() => navigation.goBack()}
            >
              <Image
                source={BackIcon}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity> */}
        </View>
        <Text
          style={{
            fontFamily: "Axiforma-ExtraBold",
            fontSize: 22,
            color: "#3A3A3A",
            marginLeft: 30,
            marginTop: 20,
          }}
        >
          Notification
        </Text>
        {/* <Image
            source={{
              uri: userinfo?.userprofile?.avatar,
            }}
            style={{
              height: 60,
              width: 60,
              resizeMode: "contain",
              position: "absolute",
              right: 30,
              top: 40,
              borderWidth: 4,
              borderColor: "#ECECEC",
              borderRadius: 50,
            }}
          /> */}
        <TouchableOpacity
          style={styles.BtnCont}
          onPress={() => navigation.navigate("FriendRequests")}
        >
          {/* <Text style={styles.BtnTxt}>
            {" "}
            Friend Requests {Friend !== 0 && `(${Friend})`}{" "}
          </Text> */}
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View
          //   key={index}
          style={[
            styles.NotificationContainer,
            Platform.OS === "ios" && styles.IosNotificationContainer,
          ]}
        >
          <View style={{ width: "60%", paddingLeft: 30 }}>
            <Text
              style={{
                fontFamily: "Axiforma-ExtraBold",
                fontSize: 14,
                marginBottom: 20,
                marginTop: 30,
              }}
            >
              New Product
            </Text>
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 10,
              }}
            >
              Check the new Product
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "40%",
              paddingRight: 30,
            }}
          >
            <Text
              style={{
                fontSize: 8,
                fontFamily: "Poppins-SemiBold",
                marginRight: 20,
              }}
            >
              9/10/2022
            </Text>
            <Image
              source={notification}
              style={{
                height: 100,
                width: 80,
                position: "absolute",
                right: 0,
                borderTopLeftRadius: 20,
              }}
            />
          </View>
        </View>
        <View
          //   key={index}
          style={[
            styles.NotificationContainer,
            Platform.OS === "ios" && styles.IosNotificationContainer,
          ]}
        >
          <View style={{ width: "60%", paddingLeft: 30 }}>
            <Text
              style={{
                fontFamily: "Axiforma-ExtraBold",
                fontSize: 14,
                marginBottom: 20,
                marginTop: 30,
              }}
            >
              New Product
            </Text>
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 10,
              }}
            >
              Check the new Product
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "40%",
              paddingRight: 30,
            }}
          >
            <Text
              style={{
                fontSize: 8,
                fontFamily: "Poppins-SemiBold",
                marginRight: 20,
              }}
            >
              9/10/2022
            </Text>
            <Image
              source={notification}
              style={{
                height: 100,
                width: 80,
                position: "absolute",
                right: 0,
                borderTopLeftRadius: 20,
              }}
            />
          </View>
        </View>

        {/* {loading && ( */}
        {/* <View style={styles.LoadingContainer}>
          <Text>Loading...</Text>
        </View> */}
        {/* )} */}
      </ScrollView>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  Header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 20,
  },
  BtnCont: {
    width: 200,
    height: 45,
    borderRadius: 50,
    backgroundColor: "#A2E287",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginLeft: 30,
  },
  NotificationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    height: 220,
    paddingTop: 50,
    marginTop: -50,
    zIndex: -2,
    borderBottomLeftRadius: 50,
    // paddingHorizontal: 30,
  },
  IosNotificationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    height: 220,
    paddingTop: 50,
    marginTop: -50,
    zIndex: -2,
    borderBottomLeftRadius: 50,
    // paddingHorizontal: 30,
  },
  BtnTxt: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Poppins-Bold",
  },
  ViewTxt: {
    fontSize: 16,
    fontFamily: "Poppins-Light",
    color: "#7ED957",
  },
  LoadingContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
});
