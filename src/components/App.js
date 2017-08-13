import React, { Component } from 'react';
import {AppRegistry, View, Text} from 'react-native';

import Authentication from "./Authentication/Authentication";
import ChangeInfo from "./ChangeInfo/ChangeInfo";
import Main from "./Main/Main";
import OrderHistory from "./OrderHistory/OrderHistory";
import refreshToken from '../api/refreshToken';
import NavigationExperimental from 'react-native-deprecated-custom-components';

export default class App extends Component{
  componentDidMout(){
      setInterval(refreshToken, 5000);
  }
  render(){
    return(
      <NavigationExperimental.Navigator
       initialRoute={{name:"MAIN"}}
        renderScene={(route, navigator)=>{
          switch(route.name){
          case "MAIN" : return <Main navigator={navigator} />;
          case "CHANGE_INFO" : return <ChangeInfo navigator={navigator} user={route.user}/>;
          case "AUTHENTICATION" : return <Authentication navigator={navigator} />;
          default: return <OrderHistory navigator={navigator} />;
        }
        }}
        configureScene={route=>{
          if(route.name == "AUTHENTICATION") return NavigationExperimental.Navigator.SceneConfigs.FloatFromRight;
          return NavigationExperimental.Navigator.SceneConfigs.FloatFromLeft;
        }}
      />
    );
  }
}
