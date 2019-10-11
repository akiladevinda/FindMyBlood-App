/** 
 * FindMyBlood 
 * Routing Screens of Application
 */

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { fromRight } from 'react-navigation-transitions';
//All routing pages importing
import SplashScreen from "../screens/SplashScreen/SplashScreen";
import MainScreen from "../screens/Auth/MainScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";

//Creating Stack Navigator for All Routes in Application
const AppNavigator = createStackNavigator({
  //   SplashScreen: {
  //     screen:SplashScreen,
  //     navigationOptions: { 
  //       header: null,  
  //       gesturesEnabled: false 
  //     },   
  //   },

  MainScreen: {
        screen:MainScreen,
        navigationOptions: { 
          header: null,  
          gesturesEnabled: false 
        },   
      },

    LoginScreen: {
          screen:LoginScreen,
          navigationOptions: { 
            header: null,  
            gesturesEnabled: false 
          },   
      },
     RegisterScreen: {
        screen:RegisterScreen,
        navigationOptions: { 
          header: null,  
          gesturesEnabled: false 
        },   
    },
    HomeScreen: {
          screen:HomeScreen,
          navigationOptions: { 
            header: null,  
            gesturesEnabled: false 
          },   
      },
}, {
    transitionConfig: () => fromRight(),
});
    
  //Make App Navigator to creating app container
  const AppContainer = createAppContainer(AppNavigator);

  //exporting App Conrainer with all routing pages
  export default AppContainer;
  
  