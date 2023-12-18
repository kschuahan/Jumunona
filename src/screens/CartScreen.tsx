import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {ScrollView} from 'react-native-virtualized-view';
import React from 'react';
import {RadioButton} from 'react-native-paper';
import ChevronFwdOutlineIcon from '../../assets/Icons/chevronForwardOutline.svg';
import EditIcon from '../../assets/Icons/editIcon.svg';

const shoeImageURL = require('../../assets/shoe.jpg');
const china = require('../../assets/china.png');
interface CartItemData {
  id: string;
  storeName: string;
  articleName: string;
  articleColor: string;
  articleSize: string;
  imageURL: string;
  price: number;
  quantity: number;
  radioButtonStore: boolean;
  radioButtonItem: boolean;
}

const cartItemData: CartItemData[] = [
  {
    id: '1',
    storeName: '店铺名称',
    articleName: '若过度长的话只显示第一行',
    articleColor: 'White',
    articleSize: 'M',
    imageURL: shoeImageURL,
    price: 999,
    quantity: 1,
    radioButtonStore: false,
    radioButtonItem: false,
  },
  {
    id: '2',
    storeName: '店铺名称',
    articleName: '若过度长的话只显示第一行',
    articleColor: 'Red',
    articleSize: 'L',
    imageURL: shoeImageURL,
    price: 299,
    quantity: 2,
    radioButtonStore: false,
    radioButtonItem: false,
  },
  {
    id: '3',
    storeName: '店铺名称',
    articleName: '若过度长的话只显示第一行',
    articleColor: 'Black',
    articleSize: 'XL',
    imageURL: shoeImageURL,
    price: 9999,
    quantity: 3,
    radioButtonStore: false,
    radioButtonItem: false,
  },
  {
    id: '4',
    storeName: '店铺名称',
    articleName: '若过度长的话只显示第一行',
    articleColor: 'White',
    articleSize: 'M',
    imageURL: shoeImageURL,
    price: 999,
    quantity: 1,
    radioButtonStore: false,
    radioButtonItem: false,
  },
];

const CartScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            marginTop: 24,
            position: 'absolute',
            marginLeft: 16,
          }}>
          <Text style={{fontSize: 21, fontFamily: 'SegoeUIBold'}}>Cart</Text>
          <Text
            style={{
              marginTop: 3,
              marginLeft: 8,
              fontSize: 14,
              fontWeight: '900',
              color: '#14100D',
              fontFamily: 'SegoeUI',
            }}>
            {`(${34})`}
          </Text>
        </View>
        <TouchableOpacity
          style={{marginTop: 28, position: 'absolute', paddingLeft: 351.6}}>
          <EditIcon height={16} width={16} style={{borderColor: '#666666'}} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <FlatList
          style={styles.addItemCard}
          data={cartItemData}
          keyExtractor={item => {
            return item.id;
          }}
          numColumns={1}
          renderItem={item => {
            return (
              <View
                style={{
                  flex: 1,
                  height: 169,
                  width: '99%',
                  backgroundColor: '#ffffff',
                  borderRadius: 13,
                  marginVertical: 4,
                  elevation: 3,
                }}>
                <View
                  style={{
                    flex: 0.2,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <RadioButton
                    value={item.item.id}
                    color="#FF7600"
                    uncheckedColor=""
                  />
                  <Image
                    source={china}
                    style={{width: 20, height: 20, marginTop: 0}}
                  />
                  <Text style={{paddingLeft: 8, paddingTop: 0}}>店铺名称</Text>
                  <ChevronFwdOutlineIcon
                    width={8}
                    height={10}
                    style={{
                      borderColor: '#CDCDCD',
                      marginTop: 2,
                      marginLeft: 8,
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 0.8,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <RadioButton value="" />
                  <Image
                    source={shoeImageURL}
                    style={{width: 110, height: 110, borderRadius: 11}}
                  />
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'space-between',
                    }}>
                    <View style={{padding: 10}}>
                      <Text style={{fontSize: 14, fontWeight: '800'}}>
                        若过度长的话只显示第一行
                      </Text>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#F9F9F9',
                          width: 89,
                          height: 25,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 5,
                          marginTop: 8,
                        }}>
                        <Text style={{color: '#999999'}}>
                          {item.item.articleColor}; {item.item.articleSize};
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={{color: '#FF7600', fontSize: 25, padding: 10}}>
                      {item.item.price}c.
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />

        <FlatList
          style={styles.addItemCard}
          data={cartItemData}
          keyExtractor={item => {
            return item.id;
          }}
          numColumns={1}
          renderItem={item => {
            return <View>{/* <Text>{item.item.articleName}</Text> */}</View>;
          }}
        />
        <FlatList
          style={styles.addItemCard}
          data={cartItemData}
          keyExtractor={item => {
            return item.id;
          }}
          numColumns={1}
          renderItem={item => {
            return <View>{/* <Text>{item.item.articleName}</Text> */}</View>;
          }}
        />
      </ScrollView>
      {/* <View
        style={{
          position: 'absolute',
          bottom: 0,
          height: 64,
          width: '99%',
          backgroundColor: '#ffffff',
          borderTopEndRadius: 13,
          borderTopStartRadius: 13,
        }}
      /> */}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
    elevation: 5,
    shadowColor: '#000000',
    borderBottomEndRadius: 13,
    borderBottomStartRadius: 13,
    width: '100%',
    height: 60,
    marginBottom: 4,
  },
  scrollView: {
    width: '98%',
  },
  addItemCard: {
    paddingLeft: 2,
  },
});
