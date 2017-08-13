import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, Image, StyleSheet, TextInput, Alert
} from 'react-native';
import getToken from '../../api/getToken';
import changeInfoApi from '../../api/changeInfo';
import global from '../global';
import backSpecial from '../../media/appIcon/backs.png';

export default class ChangeInfo extends Component {
    constructor(props) {
        super(props);
        const { name, address, phone } = props.user;
        this.state = {
            txtName: name,
            txtAddress: address,
            txtPhone: phone
        };
    }
    alertSuccess(){
         Alert.alert(
            'THÔNG BÁO',
            'Thay đổi thông tin thành công!!',
            [
                { text: 'OK', onPress: this.goBackToMain.bind(this) }
            ],
            { cancelable: false }
        );
    }
    change(){
        const { txtName, txtAddress, txtPhone } = this.state;
        getToken()
        .then(token =>changeInfoApi(token, txtName, txtAddress, txtPhone))
        .then(user =>{ 
            this.alertSuccess();
            global.onSignIn(user);
         })
        .catch(err => console.log(err))
    }
    goBackToMain() {
        const { navigator } = this.props;
        navigator.pop();
    }

    render() {
        const {
            wrapper, header, headerTitle, backIconStyle, body,
            signInContainer, signInTextStyle, textInput
        } = styles;
        const { txtName, txtAddress, txtPhone } = this.state;
        return (
            <View style={wrapper}>
                <View style={header}>
                    <View />
                    <Text style={headerTitle}>User Infomation</Text>
                    <TouchableOpacity onPress={this.goBackToMain.bind(this)}>
                        <Image source={backSpecial} style={backIconStyle} />
                    </TouchableOpacity>
                </View>
                <View style={body}>
                    <TextInput
                        underlineColorAndroid='transparent' 
                        style={textInput}
                        placeholder="Nhập vào tên bạn"
                        autoCapitalize="none"
                        value={txtName}
                        onChangeText={text => this.setState({ ...this.state, txtName: text })}
                    />
                    <TextInput
                        underlineColorAndroid='transparent' 
                        style={textInput}
                        placeholder="Nhập vào địa chỉ"
                        autoCapitalize="none"
                        value={txtAddress}
                        onChangeText={text => this.setState({ ...this.state, txtAddress: text })}
                    />
                    <TextInput
                        underlineColorAndroid='transparent' 
                        style={textInput}
                        placeholder="Nhập vào số điện thoại"
                        autoCapitalize="none"
                        value={txtPhone}
                        onChangeText={text => this.setState({ ...this.state, txtPhone: text })}
                    />
                    <TouchableOpacity style={signInContainer}>
                        <Text style={signInTextStyle} onPress={this.change.bind(this)}>Thay đổi thông tin</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#fff' },
    header: { flex: 1, backgroundColor: '#2ABB9C', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 },// eslint-disable-line
    headerTitle: { fontFamily: 'Avenir', color: '#fff', fontSize: 20 },
    backIconStyle: { width: 30, height: 30 },
    body: { flex: 10, backgroundColor: '#F6F6F6', justifyContent: 'center' },
    textInput: {
        height: 45,
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        fontFamily: 'Avenir',
        paddingLeft: 20,
        borderRadius: 20,
        marginBottom: 20,
        borderColor: '#2ABB9C',
        borderWidth: 1
    },
    signInTextStyle: {
        color: '#FFF', fontFamily: 'Avenir', fontWeight: '600', paddingHorizontal: 20
    },
    signInContainer: {
        marginHorizontal: 20,
        backgroundColor: '#2ABB9C',
        borderRadius: 20,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    signInStyle: {
        flex: 3,
        marginTop: 50
    }
});
