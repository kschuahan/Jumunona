import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  Image,
  Pressable,
} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import React, { useState } from 'react';
import MasonryList from '@react-native-seoul/masonry-list';
import { dimensions } from '../utils/sizes';
import { colors } from '../utils/AppColors';
import LinearGradient from 'react-native-linear-gradient';
import { fontFamily } from '../utils/Fonts';
import SearchIcon from '../../assets/Icons/searchIcon.svg';
import ChevronDownOutline from '../../assets/Icons/chevronDownOutlline.svg';
import EllipsisHorizontal from '../../assets/Icons/ellipsis-horizontal.svg';
// import HoodieIcon from '../../assets/Icons/hoodieIcon.svg';
import ImageIcon from '../../assets/Icons/image-outline.svg';
import { RouteNames } from '../utils/RouteNames';

interface Category {
  id: number;
  desc: string;
}
interface Product {
  id: number;
  imageURL: string | any;
  desc: string;
}
const categoryData: Category[] = [
  { id: 1, desc: "Men's" },
  { id: 2, desc: "Women's" },
  { id: 3, desc: 'Child' },
  { id: 4, desc: 'Baby' },
  { id: 5, desc: 'Home' },
  { id: 6, desc: 'Electro' },
  { id: 7, desc: 'Auto' },
  { id: 8, desc: 'Home' },
  { id: 9, desc: 'Beauty' },
  { id: 10, desc: 'Suits' },
  { id: 11, desc: 'Accesso' },
  { id: 12, desc: 'Make-Up' },
];
const mensCategoryData: Category[] = [
  { id: 1, desc: 'Hoodies' },
  { id: 2, desc: 'Pants' },
  { id: 3, desc: 'Overalls' },
  { id: 4, desc: 'Casual Shorts' },
  { id: 5, desc: 'Short Jacket' },
  { id: 6, desc: '衬衫' },
  { id: 7, desc: '运动套装' },
  { id: 8, desc: '羽绒服' },
  { id: 9, desc: '西装' },
  { id: 10, desc: 'More...' },
];
const shoeImageURL = require('../../assets/shoe.jpg');
const china = require('../../assets/china.png');
const data: Product[] = [
  {
    id: 1,
    imageURL: shoeImageURL,
    desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 2,
    imageURL: shoeImageURL,
    desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 3,
    imageURL: shoeImageURL,
    desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 4,
    imageURL: shoeImageURL,
    desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 5,
    imageURL: shoeImageURL,
    desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 6,
    imageURL: shoeImageURL,
    desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 7,
    imageURL: shoeImageURL,
    desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 8,
    imageURL: shoeImageURL,
    desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 9,
    imageURL: shoeImageURL,
    desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 10,
    imageURL: shoeImageURL,
    desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
];

const HeaderCategoryScreen = () => (
  <View style={styles.headerContainer}>
    <View style={styles.searchBarBG}>
      <SearchIcon width={17} height={17} style={styles.searchIcon} />
      <TextInput style={styles.searchInput} placeholder="Suggested Category" />
    </View>
  </View>
);

const CategoryScreen: React.FC = ({ navigation }) => {
  const [activeItemPrimaryCategory, setActiveItemPrimaryCategory] = useState(1);
  return (
    <View style={styles.container}>
      <HeaderCategoryScreen />
      <View style={styles.primaryCategories}>
        <FlatList
          style={styles.primaryCategoriesContent}
          data={categoryData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => {
            return item.id.toString();
          }}
          renderItem={({ item }) => {
            return (
              <View style={{ flex: 1, marginRight: 22 }}>
                <TouchableOpacity
                  onPress={() => setActiveItemPrimaryCategory(item.id)}>
                  <Text
                    style={{
                      fontSize: 16,
                      color:
                        activeItemPrimaryCategory === item.id
                          ? '#ff7600'
                          : 'black',
                      fontWeight: '400',
                    }}>
                    {item.desc}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
        <View style={styles.downArrowButton}>
          <LinearGradient
            colors={[colors.whiteF2F2F2, colors.whiteF6F6F6]}
            start={{ x: 0.4, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              height: 20,
              width: 4,
              backgroundColor: '#7E7D7D29',
              borderRadius: 100,
            }}
          />
          <TouchableOpacity
            style={{
              marginStart: -10,
              marginEnd: -20
            }} onPress={() => {
              navigation.navigate(RouteNames.categories)
            }}>
            <ChevronDownOutline />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollable}>
        <View style={styles.secondaryCategoriesBG}>
          <FlatList
            scrollEnabled={false}
            data={mensCategoryData}
            keyExtractor={item => {
              return item.id.toString();
            }}
            numColumns={5}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flex: 1,
                    marginTop: 8,
                  }}>
                  {item.id === 10 ? (
                    <TouchableOpacity onPress={() => {
                      navigation.navigate(RouteNames.categories)

                    }} style={{ alignItems: 'center' }}>
                      <EllipsisHorizontal width={24} height={50} />
                      <Text
                        style={{ fontSize: 13, color: colors.balc111111, fontWeight: '400' }}>
                        Ещё
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => {
                      navigation.navigate(RouteNames.product_search_screen)

                    }} style={{ alignItems: 'center' }}>
                      <ImageIcon width={50} height={50} />
                      <Text
                        style={{ fontSize: 13, color: colors.balc111111, fontWeight: '400' }}>
                        {item.desc}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            }}
          />
        </View>
        <View style={styles.productsGrid}>
          <MasonryList
            data={data}
            keyExtractor={item => {
              return item.id;
            }}
            numColumns={2}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{
                    borderRadius: 12,
                    backgroundColor: '#ffffff',
                    marginHorizontal: 4.5,
                    marginVertical: 4,
                    width: 'auto',
                    borderColor: '#f1f1f1',
                    marginTop: 9,
                    flex: 0.5,
                    paddingBottom: 8,
                  }}
                  onPress={() => {
                    navigation.navigate(RouteNames.product_detail)

                  }}

                >
                  <Image
                    source={item.imageURL}
                    style={{
                      height: 265,
                      paddingHorizontal: 1,
                      width: 'auto',
                      borderRadius: 12,
                      backgroundColor: '#f1f1f1',

                      marginBottom: 8,
                    }}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      paddingLeft: 7,
                      marginTop: 2,
                    }}>
                    <Image
                      source={china}
                      style={{ height: 15, width: 15, marginTop: 3 }}
                    />
                    <Text
                      style={{
                        marginLeft: 4,
                        fontSize: 13,
                        color: colors.black,
                        fontWeight: '500',
                      }}
                      numberOfLines={1}>
                      Футболка
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingLeft: 8,
                      marginTop: 3,
                    }}>
                    <View style={{ flexDirection: 'row', width: '30%' }}>
                      <Text
                        style={{
                          fontSize: 17,
                          color: '#ff7600',
                          fontFamily: fontFamily.bold,
                        }}>
                        999
                      </Text>
                      <Text
                        style={{
                          paddingTop: 6,
                          color: '#ff7600',
                          fontSize: 12,
                          fontFamily: fontFamily.bold,
                        }}>
                        c.
                      </Text>
                    </View>
                    <Text
                      numberOfLines={1}
                      style={{
                        width: '70%',
                        color: '#AAAAAA',
                        paddingTop: 3,
                        fontFamily: fontFamily.regular,
                        fontSize: 10.5,
                        marginTop: 4,
                      }}>
                      {item.desc}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    alignSelf: 'center',
  },
  headerContainer: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    borderRadius: 24,
    paddingTop: 12,
    paddingBottom: 4,
    width: dimensions.width,
    paddingHorizontal: 8,
  },
  searchBarBG: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width: '100%',
    height: 37,
    borderRadius: 24,
  },
  searchIcon: {
    color: '#999999',
    marginLeft: 11.18,
  },
  searchInput: {
    height: 37,
    width: 'auto',
    marginLeft: 11.13,
    backgroundColor: '#ffffff',
    fontFamily: fontFamily.regular,
    fontSize: 15,
  },

  primaryCategories: {
    flexDirection: 'row',
    width: dimensions.width,
    height: 35,
    gap: 6,
    backgroundColor: colors.white,
    borderRadius: 13,
  },
  primaryCategoriesContent: {
    paddingTop: 5,
    paddingLeft: 16,
    flex: 0.9,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 13,
  },
  downArrowButton: {
    flexDirection: 'row',
    height: '100%',
    flex: 0.1,
    borderTopRightRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingRight: 10,
    paddingBottom: 4,
  },
  scrollable: {
    paddingTop: 0,
    backgroundColor: '#F6F6F6',
  },
  secondaryCategoriesBG: {
    width: dimensions.width,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 12,
    paddingHorizontal: 6,
    paddingBottom: 6.5,
    borderBottomRightRadius: 12,
  },
  productsGrid: {
    flex: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginTop: 9,
    marginHorizontal: 4,
    marginBottom: 4,
    backgroundColor: '#FFFFFF',
  },
});
