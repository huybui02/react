import React, { Component } from 'react';
import {ScrollView, Text} from 'react-native';
import Collection from "./Collection"
import Category from "./Category";
import TopProduct from "./TopProduct";

export default class Home extends Component{
  render(){
    const { types, topProducts } = this.props;
    return(
      <ScrollView style={{backgroundColor:"#DBDBD8",flex:1}}>
      <Collection navigator={this.props.navigator} />
      <Category navigator={this.props.navigator} types={types}  />
      <TopProduct navigator={this.props.navigator} topProducts={topProducts} />
      </ScrollView>
    );
  }
}
