import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import Splash from "./Screen/Splash";
import Home from "./Screen/Home";

import MainPage from "./Screen/MainPage";
import Notification from "./Screen/Notification";
import Signin from "./Screen/Signin";
import Category from "./Screen/Category";
import Partner from "./Screen/Partner";

function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Signin"
          component={Signin}
          options={{ headerShown: false }}
        /><Stack.Screen
        name="Partner"
        component={Partner}
        options={{ headerShown: false }}
      />
         <Stack.Screen
          name="Category"
          component={Category}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;
