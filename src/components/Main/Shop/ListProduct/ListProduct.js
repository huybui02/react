import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, 
        ListView, RefreshControl } from 'react-native';
import backList from "../../../../media/appIcon/backList.png";
import sp1 from "../../../../media/temp/sp1.jpeg";
import getListProduct from '../../../../api/getListProduct';
const url = 'http://192.168.1.8/api/images/product/';
function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
export default class ListProduct extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      listProducts: ds,
      refreshing : false,
      page : 1
    };
    this.arr = [];
  }
  componentDidMount() {
    const idType = this.props.category.id;
    getListProduct(idType, 1)
    .then(arrProduct => {
      this.arr = arrProduct;
      this.setState({ listProducts: this.state.listProducts.cloneWithRows(this.arr) });
    })
    .catch(err => console.log(err));
  }
  goBack() {
    const { navigator } = this.props;
    navigator.pop();
  }
  gotoDetail(product) {
    const { navigator } = this.props;
    navigator.push({ name: "PRODUCT_DETAIL", product });
  }
  render() {
    const { container, wrapper, header, backStyle, titleStyle, productContainer,
      productImage, productInfo, lastRowInfo, txtName, txtPrice, txtMaterial,
      txtColor, txtShowDetail, cham } = styles;
    const { category } = this.props;
    return (
      <View style={container}>
          <View style={wrapper}>
            <View style ={header}>
              <TouchableOpacity onPress={this.goBack.bind(this)} >
                <Image source={backList} style={backStyle}/>
              </TouchableOpacity>
                <Text style={titleStyle}>{category.name}</Text>
                <View style={{width : 30}}></View>
            </View>
            <ListView
                  removeClippedSubviews={false}
                  dataSource={this.state.listProducts}
                  renderRow={product =>(
                    <View style={productContainer}>
                        <Image style={productImage} source={{ uri: `${url}${product.images[0]}`}}/>
                        <View style={productInfo}>
                            <Text style={txtName}>{toTitleCase(product.name)}</Text>
                            <Text style={txtPrice}>{product.price}$</Text>
                            <Text style={txtMaterial}>{toTitleCase(product.material)}</Text>
                            <View  style={lastRowInfo}>
                              <Text style={txtColor}>{product.color}</Text>
                              <View style={cham}></View>
                              <TouchableOpacity onPress={()=> this.gotoDetail(product)}>
                                <Text style={txtShowDetail}>Show Details</Text>
                              </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                  )}
                  refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={()=>{
                          this.setState({ refreshing : true});
                          const newPage = this.state.page + 1;
                          const idType = this.props.category.id;
                          getListProduct(idType, newPage)
                          .then(arrProduct => {
                              this.arr = arrProduct.concat(this.arr);
                              this.setState({ listProducts: this.state.listProducts.cloneWithRows(this.arr),
                              refreshing : false                              
                              });
                          })
                        }}
                    />
                  }
            />
          </View>
      </View>
    );
  }
}
/*
 <ScrollView style={wrapper}>
          <View style ={header}>
            <TouchableOpacity onPress={this.goBack.bind(this)} >
              <Image source={backList} style={backStyle}/>
            </TouchableOpacity>
              <Text style={titleStyle}>{category.name}</Text>
              <View style={{width : 30}}></View>
          </View>
          <View style={productContainer}>
              <Image style={productImage} source={sp1}/>
              <View style={productInfo}>
                  <Text style={txtName}>Lace Sleeve Si</Text>
                  <Text style={txtPrice}>177$</Text>
                  <Text style={txtMaterial}>Material Silk</Text>
                  <View  style={lastRowInfo}>
                    <Text style={txtColor}>Color RoyalBlue</Text>
                    <View style={cham}></View>
                    <TouchableOpacity>
                      <Text style={txtShowDetail}>Show Details</Text>
                    </TouchableOpacity>
                  </View>
              </View>
          </View>

        </ScrollView>
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DBDBDB',
    flex: 1,

  },
  wrapper: {
    backgroundColor: '#fff',
    shadowColor: '#2E272B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    paddingHorizontal: 10,

  },
  header: {
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  backStyle: {
    height: 30,
    width: 30,
  },
  titleStyle: {
    fontSize: 20,
    color: '#B10D65',
    fontFamily: 'Avenir',
  },
  productInfo: {
    justifyContent: 'space-between',
    marginLeft: 15,
    flex: 1,
  },
  productContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderTopColor: "#F0F0F0",
    borderBottomColor: "#fff",
    borderLeftColor: "#fff",
    borderRightColor: "#fff",
    borderWidth: 1,

  },
  productImage: {
    width: 90,
    height: (90 * 452) / 361,

  },
  lastRowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  txtName: {
    fontFamily: 'Avenir',
    fontSize: 20,
    fontWeight: '400',
    color: '#BCBCBC',

  },
  txtPrice: {
    fontFamily: 'Avenir',
    color: '#B10D65',
  },
  txtMaterial: {
    fontFamily: 'Avenir',
  },
  txtColor: {
    fontFamily: 'Avenir',
  },
  txtShowDetail: {
    color: '#B10D65',
    fontSize: 11,
  },
  cham: {
    backgroundColor: 'cyan',
    height: 16,
    width: 16,
    borderRadius: 8,
  }


});
