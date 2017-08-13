import React, { Component } from 'react';
import {AppRegistry, View, Text, TouchableOpacity} from 'react-native';
import Menu from "./Menu";
import Shop from "./Shop/Shop";
import checkLogin from '../../api/checkLogin';
import getToken from '../../api/getToken';
import global from '../global';
import Drawer from 'react-native-drawer';

export default class Main extends Component{
  componentDidMount(){
    getToken()
    .then(token => checkLogin(token))
    .then(res => global.onSignIn(res.user))
    .catch(err => console.log(err));
  }
  GotoAuthen(){
    const { navigator } = this.props;
    navigator.push({name: 'AUTHENTICATION'});
  }
  GotoChangeInfo(){
    const { navigator } = this.props;
    navigator.push({name: 'CHANGE_INFO'});
  }
  GotoOrderHistory(){
    const { navigator } = this.props;
    navigator.push({name: 'OrderHistory'});
  }
  closeControlPanel = () => {
    this._drawer.close()
  };
  openControlPanel = () => {
    this._drawer.open()
  };
  render(){
    const { navigator } = this.props;
    return(
      <Drawer
        tapToClose
        openDrawerOffset={0.4}
        ref={(ref) => { this._drawer = ref; }}
        content={<Menu navigator={navigator} />}
        >
        <Shop open={this.openControlPanel.bind(this)} />

      </Drawer>
    );
  }
}
