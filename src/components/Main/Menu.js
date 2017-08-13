import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Dimensions} from 'react-native';
import global from '../global';
import saveToken from '../../api/saveToken';
import profileIcon from "../../media/temp/profile.png";

export default class Menu extends Component{
  constructor(props){
    super(props);
    this.state = { user : null };
    global.onSignIn = this.onSignIn.bind(this);
  }
  onSignOut(user){
    this.setState({ user : null });
    saveToken('');
  }
  onSignIn(user){
    this.setState({ user });
    
  }
  GotoAuthen(){
    const { navigator } = this.props;
    navigator.push({name: 'AUTHENTICATION'});
  }
  GotoChangeInfo(){
    const { navigator } = this.props;
    navigator.push({name: 'CHANGE_INFO', user: this.state.user });
  }
  GotoOrderHistory(){
    const { navigator } = this.props;
    navigator.push({name: 'OrderHistory'});
  }
  render(){
    const { user } = this.state;
    const logoutJSX = (
      <View>
          <TouchableOpacity style={styles.btnStyle}>
              <Text style={styles.btnText} onPress={this.GotoAuthen.bind(this)}>ĐĂNG NHẬP</Text>
          </TouchableOpacity>
      </View>
    );
    const loginJSX = (
      <View style={styles.menu}>
          <Text style={styles.username}>{user ? user.name : ''}</Text>
          <View>
            <TouchableOpacity style={styles.btnSignInStyle} onPress={this.GotoOrderHistory.bind(this)}>
                <Text style={styles.btnTextSignIn}>Lịch sử đơn hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSignInStyle} onPress={this.GotoChangeInfo.bind(this)}>
                <Text style={styles.btnTextSignIn}>Thay đổi thông tin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSignInStyle }>
                <Text style={styles.btnTextSignIn} onPress={this.onSignOut.bind(this)}>Thoát</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
    const mainJSX = this.state.user ? loginJSX : logoutJSX;
    return(
      <View style={styles.container}>
        <Image source={profileIcon} style={styles.profile}></Image>
        { mainJSX }
      </View>
    );
  }
}
const {width} = Dimensions.get('window');
const wi = (width / 2);
const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#34B098',
      borderRightWidth: 3,
      borderColor: '#fff',
      alignItems:"center"
    },
    profile:{
      width: 120,
      height: 120,
      marginBottom: 10,
      marginTop: 30,
    },
    btnStyle: {
      height:50,
      width: wi,
      backgroundColor: '#fff',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop : 50,
    },
    btnSignInStyle: {
      height:50,
      width: wi,
      backgroundColor: '#fff',
      borderRadius: 5,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 10,
    },
    btnTextSignIn : {
        color: '#34B098',
        fontSize: 15,

    },
    btnText : {
      color: '#34B098',
      fontSize: 15,

    },
    menu:{
      //loginContainer
      flex : 1,
      justifyContent:'space-around',
      alignItems:'center'
    },
    username:{
      color: '#fff',
      fontSize: 25,
    }

});
