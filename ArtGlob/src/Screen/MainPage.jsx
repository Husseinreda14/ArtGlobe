import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

class MainPage extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1, height: "100%", width: "100%" }}>
          <TouchableOpacity
            style={{
              margin: 10,
            }}
            onPress={() => this.props.navigation.navigate("Splash")}
          >
            <Text>Splash Screen</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              margin: 10,
            }}
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              margin: 10,
            }}
            onPress={() => this.props.navigation.navigate("Signin")}
          >
            <Text>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              margin: 10,
            }}
            onPress={() => this.props.navigation.navigate("Notification")}
          >
            <Text>Notifcation</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              margin: 10,
            }}
            onPress={() => this.props.navigation.navigate("")}
          >
            <Text>Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              margin: 10,
            }}
            onPress={() => this.props.navigation.navigate("")}
          >
            <Text>Users</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              margin: 10,
            }}
            onPress={() => this.props.navigation.navigate("")}
          >
            <Text>Add Category</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              margin: 10,
            }}
            onPress={() => this.props.navigation.navigate("")}
          >
            <Text>Setting</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              margin: 10,
            }}
            onPress={() => this.props.navigation.navigate("")}
          >
            <Text>Add Addmin</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default MainPage;

const styles = StyleSheet.create({
  container: {
    marginTop: "15%",

    flex: 1,
  },
});
