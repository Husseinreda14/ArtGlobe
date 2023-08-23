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
import Product from "./Screen/Product";
import Reviews from "./Screen/Reviews";

import AboutUs from "./Screen/aboutUs";
import Privacy from "./Screen/Privacy";
import Faqs from "./Screen/faqs";
import UserPage from "./Screen/UserPage";

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
          
        />
           <Stack.Screen
          name="Faqs"
          component={Faqs}
          options={{ headerShown: false }}
          
        />
         <Stack.Screen
          name="Privacy"
          component={Privacy}
          options={{ headerShown: false }}
          
        />
         <Stack.Screen
          name="Reviews"
          component={Reviews}
          options={{ headerShown: false }}
          
        />
          <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{ headerShown: false }}
          
        />
         <Stack.Screen
          name="Product"
          component={Product}
          options={{ headerShown: false }}/>
          <Stack.Screen
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
        name="UserPage"
        component={UserPage}
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
