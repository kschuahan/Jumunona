import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import LinearGradient from 'react-native-linear-gradient';
import MasonryList from '@react-native-seoul/masonry-list';
import {dimensions} from '../utils/sizes';
import {RouteNames} from '../utils/RouteNames';
import {colors} from '../utils/AppColors';
import React from 'react';
import {fontFamily} from '../utils/Fonts';

import EllipsisHorizontal from '../../assets/Icons/ellipsis-horizontal.svg';
import ImageOutline from '../../assets/Icons/image-outline.svg';

interface Product {
  id: number;
  imageURL: string | any;
  desc: string;
}
interface Category {
  id: number;
  desc: string;
}
const numColumns = 5;
const shoeImageURL = require('../../assets/shoe.jpg');
const data: Product[] = [
  {
    id: 1,
    imageURL: shoeImageURL,
    desc: '600+просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 2,
    imageURL: shoeImageURL,
    desc: '600+просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 3,
    imageURL: shoeImageURL,
    desc: '600+просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 4,
    imageURL: shoeImageURL,
    desc: '600+просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 5,
    imageURL: shoeImageURL,
    desc: '600+просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 6,
    imageURL: shoeImageURL,
    desc: '600+просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 7,
    imageURL: shoeImageURL,
    desc: '600+просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 8,
    imageURL: shoeImageURL,
    desc: '600+просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 9,
    imageURL: shoeImageURL,
    desc: '600+просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 10,
    imageURL: shoeImageURL,
    desc: '600+просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
];

const categoryData: Category[] = [
  {id: 1, desc: 'Men'},
  {id: 2, desc: 'Women'},
  {id: 3, desc: 'Child'},
  {id: 4, desc: 'Shoes'},
  {id: 5, desc: 'Bags'},
  {id: 6, desc: 'Electro'},
  {id: 7, desc: 'Auto'},
  {id: 8, desc: 'Home'},
  {id: 9, desc: 'Beauty'},
  {id: 10, desc: 'Suits'},
  // { id: 11, desc: "Accesso" },
  // { id: 12, desc: "Make-Up" },
];
const china = require('../../assets/china.png');

const HeaderItem = ({onSearchClick}) => (
  <View style={styles.header}>
    <TextInput
      style={styles.searchBox}
      placeholder="Спортивная обувь"
      placeholderTextColor="#727272"
    />
    <TouchableOpacity style={styles.button} onPress={onSearchClick}>
      <LinearGradient
        colors={['#FF7600', '#FC4A1A']}
        start={{x: 0.4, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.linearGradient}>
        <Text style={styles.searchButtonText}>Поиск</Text>
      </LinearGradient>
    </TouchableOpacity>
  </View>
);

const MainCategoriesItem = ({navigation}) => (
  <View style={{width: '100%'}}>
    <FlatList
      style={styles.categories}
      scrollEnabled={false}
      data={categoryData}
      keyExtractor={item => {
        return item.id.toString();
      }}
      numColumns={5}
      renderItem={({item, index}) => {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            {item.id === 10 ? (
              <TouchableOpacity onPress={()=>{
                navigation.navigate(RouteNames.categories)

              }} style={{alignItems: 'center'}}>
                <EllipsisHorizontal width={24} height={38} />
                <Text
                  style={{
                    fontSize: 13,
                    color: colors.black,
                    paddingBottom: 10,
                    fontWeight:'400'
                  }}>
                  ещё
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => {
                navigation.navigate(RouteNames.product_search_screen)

              }}  style={{alignItems: 'center'}}>
                <ImageOutline width={50} height={38} />
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight:'400',
                    color: colors.black,
                    paddingBottom: 10,
                  }}>
                  {item.desc}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        );
      }}
    />
  </View>
);

const HomeScreen: React.FC = ({navigation}) => {
  return (
    <View style={styles.container}>
      <HeaderItem
        onSearchClick={() => {
          navigation.navigate(RouteNames.product_search_screen, { isRoute: true })
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <MainCategoriesItem navigation={navigation}/>
        <View style={styles.grid}>
          <MasonryList
            data={data}
            keyExtractor={item => {
              return item.id;
            }}
            style={{marginHorizontal: 7}}
            numColumns={2}
            renderItem={({item}) => {
              return (
                <Pressable
                  style={[styles.gridViewItemStyle, {paddingBottom: 8}]}
                  onPress={() => {
                    navigation.navigate(RouteNames.product_detail);
                  }}>
                  <Image
                    source={item.imageURL}
                    style={[
                      styles.gridViewItemImage,
                      {height: item.id === 1 ? 220 : 255},
                    ]}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      paddingLeft: 7,
                      marginTop: 2,
                    }}>
                    <Image source={china} style={{height: 15, width: 15}} />
                    <Text
                      style={{
                        marginLeft: 4,
                        fontSize: 13,
                        paddingBottom: 1,
                        fontWeight: '500',
                        color: colors.black
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
                    <View style={{flexDirection: 'row', width: '30%'}}>
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
                        marginTop: 4,
                        fontSize: 10.5,
                        fontFamily: fontFamily.regular,
                      }}>
                      {item.desc}
                    </Text>
                  </View>
                </Pressable>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.whiteF6F6F6,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingHorizontal: 12,
  },
  searchBox: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 24,
    backgroundColor: colors.white,
    borderColor: '#ff7600',
    height: 36,
    paddingEnd: 90,
    fontSize: 15,
    paddingLeft: 12,
    fontFamily: fontFamily.regular,
  },
  button: {
    marginLeft: -82.5,
  },
  linearGradient: {
    borderRadius: 24,
    height: 31,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    fontFamily: fontFamily.regular,
  },
  scrollView: {
    flex: 9 / 10,
    paddingTop: 4,
    backgroundColor: colors.whiteF6F6F6,
  },

  categories: {
    borderRadius: 13,
    backgroundColor: '#ffffff',
    marginHorizontal: 12,
    marginBottom: 8,
    marginTop: 4,
    paddingHorizontal: 2,
    paddingTop: 12,
    paddingBottom: 4,
  },
  gridItem: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns, //approxiamte a square
  },
  grid: {
    flex: 1,
    width: dimensions.width,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginBottom: 8,
    alignSelf: 'stretch',
  },
  gridViewItemStyle: {
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginHorizontal: 4.5,
    marginVertical: 4.5,
    width: 'auto',
  },
  gridViewItemImage: {
    paddingHorizontal: 1,
    width: 'auto',
    borderRadius: 10,
    marginBottom: 8,
  },
});
