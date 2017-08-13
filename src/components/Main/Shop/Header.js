import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import icLogo from "../../../media/appIcon/ic_logo.png";
import icMenu from "../../../media/appIcon/ic_menu.png";
import global from '../../global';
import search from '../../../api/searchProduct';

const { height } = Dimensions.get('window');

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtSearch: ''
    };
  }
  onSearch() {
    const { txtSearch } = this.state;
    this.setState({ txtSearch : ''});
    search(txtSearch)
      .then(arrProduct => global.setArraySearch(arrProduct))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.row1}>
          <TouchableOpacity onPress={this.props.onOpen}>
            <Image source={icMenu} style={styles.iconStyle} />
          </TouchableOpacity>
          <Text style={styles.titleStyle} >Wearing a Dress</Text>
          <Image source={icLogo} style={styles.iconStyle} />
        </View>
        <TextInput style={styles.textinput}
          placeholder="Bạn muốn mua gì hôm nay?"
          underlineColorAndroid='transparent'
          value={this.state.txtSearch}
          onChangeText={text => this.setState({ txtSearch: text })}
          onFocus={() => global.gotoSearch()}
          onSubmitEditing={this.onSearch.bind(this)}

        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    height: height / 8,
    backgroundColor: "#34B098",
    padding: 10,
    justifyContent: 'space-around'
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  textinput: {
    height: height / 18,
    backgroundColor: "white",
    paddingLeft: 10,
    paddingVertical: 0,
  },
  iconStyle: {
    height: 25,
    width: 25
  },
  titleStyle: {
    color: "white",
    fontSize: 20,
    paddingBottom: 5,
  }
});
