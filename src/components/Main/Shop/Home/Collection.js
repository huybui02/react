import React, { Component } from 'react';
import {View, Text, Image, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

import bannerImage from "../../../../media/temp/banner.jpg";

const { height, width } = Dimensions.get('window');
export default class Collection extends Component{
  gotoListProduct(){
    const { navigator } = this.props;
    navigator.push({ name: 'LIST_PRODUCT', category: { name: 'SPRING COLLECTION', id: 'COLLECTION' } });
  }
  render(){
    return(
      <View style={styles.wrapper}>
        <View style={{justifyContent:'center', height: 50}}>
          <Text style={styles.textStyle}>SPRING COLLECTION</Text>
        </View>
        <TouchableOpacity  style={{flex:4, justifyContent:'flex-end'}} onPress={this.gotoListProduct.bind(this)}>
          <Image source={bannerImage} style={styles.imageStyle} />
        </TouchableOpacity> 
      </View>
    );
}
}
const imgWidth = width - 40;
const imgHeight = (imgWidth / 933) * 465;
const styles = StyleSheet.create({
  wrapper: {
    width : width - 20,
    backgroundColor:"white",
    margin:10,
    shadowColor: "#2E272B",
    shadowOffset:{ width: 0, height: 3},
    shadowOpacity: 0.2,
    padding: 10,
    paddingTop: 0
  },
  textStyle: {
    fontSize: 25,
    color: '#AFAEAF'
  },
  imageStyle : {
    height: imgHeight,
    width : imgWidth
  }

});
