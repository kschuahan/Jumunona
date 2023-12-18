import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { colors } from '../../utils/AppColors';
import { useEffect, useState } from 'react';
import { onShare } from '../../utils/Common';
import { ReviewUser } from './ProductDetailScreen';

import ArrowRedoOutlineIcon from '../../../assets/Icons/arrowRedoOutline.svg';
import CartOutlineIcon from '../../../assets/Icons/cartOutlineIcon.svg';
import EllipsisHorizontalIcon from '../../../assets/Icons/ellipsis-horizontal.svg';
import ChevronBackOutlineIcon from '../../../assets/Icons/chevronBackOutline.svg';
import SearchIcon from '../../../assets/Icons/searchIcon.svg';
import { fontFamily } from '../../utils/Fonts';
import Share from '../../../assets/Icons/Share.svg';
import CartIcon from '../../../assets/Icons/Carts.svg';
import EllipsisHorizontal from '../../../assets/Icons/ellipsis-horizontal.svg';
const reviewFilter = [
  { id: 1, desc: "Don't lose color(8)" },
  { id: 2, desc: 'Good Fabric(12)' },
  { id: 3, desc: 'Soft Soul(1)' },
];
const filterOptions = [
  { id: 1, desc: 'Все' },
  { id: 2, desc: 'Изображение' },
  { id: 3, desc: 'Хорошие' },
  { id: 4, desc: 'Средние' },
  { id: 5, desc: 'Плохие' },
];

export const ProudctReviewsScreen = ({ navigation }) => {
  const [selectedFactory, setSelectedFactory] = useState(1);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',

      headerRight: () => (
        <View style={{ flexDirection: 'row', gap: 34, alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              onShare();
            }}
            style={{ alignItems: 'center', marginStart: -20 }}>
            <Share />
          </TouchableOpacity>

          <TouchableOpacity style={{ alignItems: 'center', marginStart: -20 }}>
            <CartIcon />
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center', marginStart: -20 }}>
            <EllipsisHorizontal width={24} height={24} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ alignItems: 'center', marginStart: -25 }}>
            <ChevronBackOutlineIcon height={15} width={15} />
          </TouchableOpacity>

          <SearchView />
        </View>
      ),
      headerStyle: {
        backgroundColor: colors.white,
      },

      headerShadowVisible: false,
    });
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 2 }}>
        <FlatList
          style={style.primaryCategoriesContent}
          data={filterOptions}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => {
            return item.id.toString();
          }}
          renderItem={({ item }) => {
            return (
              <View style={{ paddingHorizontal: 4.5 }}>
                <TouchableOpacity onPress={() => setSelectedFactory(item.id)}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: selectedFactory === item.id ? '#ff7600' : 'black',
                    }}>
                    {item.desc}
                    <Text
                      style={{
                        fontSize: 14,
                        color:
                          selectedFactory === item.id ? '#ff7600' : colors.grey,
                      }}>
                      {item.id != 1 ? '(' + item.id + ')' : ''}
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={reviewFilter}
          horizontal
          keyExtractor={item => {
            return item.id.toString();
          }}
          style={{ flexWrap: 'wrap', marginVertical: 9, marginStart: 9 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => { }}
                style={{
                  backgroundColor: colors.white,
                  marginEnd: 13,
                  borderRadius: 20,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.balc111111,
                    paddingHorizontal: 12,
                    textAlign: 'center',
                    paddingVertical: 10,
                  }}>
                  {item.desc}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <View
          style={{
            flex: 1,
            paddingVertical: 12,
            backgroundColor: colors.white,
            borderTopRightRadius: 13,
            borderTopLeftRadius: 13,
          }}>
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            scrollEnabled={false}
            keyExtractor={item => {
              return item.toString();
            }}
            style={{ paddingHorizontal: 13, borderRadius: 13, height: '100%' }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return <ReviewUser />;
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const SearchView = () => {
  const [search, setSearch] = useState('');

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.whiteF6F6F6,
        borderRadius: 19,
        marginStart: 10
      }}>
      {/* <Ionicons
        name="search"
        size={17}
        style={{marginStart: 15}}
        color={colors.grey}
      /> */}
      <SearchIcon width={15} height={15} style={{ marginStart: 15 }}
      />

      <TextInput
        value={search}
        placeholder={'Футболки'}
        style={style.searchTextInput}
        placeholderTextColor={colors.grey}
        onChangeText={text => {
          setSearch(text);
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  searchTextInput: {
    height: 33,
    width: '77%',
    marginStart: 11,
    fontFamily: 'SegoeUI',
    fontSize: 15,
    padding: 0
  },
  primaryCategoriesContent: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
    paddingHorizontal: 10,
    paddingBottom: 10,
    flexWrap: 'wrap',
  },
});
