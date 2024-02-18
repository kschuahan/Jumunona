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
import { RouteNames } from '../../utils/RouteNames';
import { getAPICall } from '../../Netowork/Apis';
import { ReviewApis } from '../../Netowork/Constants';
import { CommonModal } from '../HomeScreen';
import { ProgressView, RetryWhenErrorOccur } from '../../components/Dialogs';
import { styles } from '../../utils/AppStyles';

const filterOptions = [
  { id: 1, desc: 'Все', rating: 0 },
  { id: 2, desc: 'Изображение', rating: -1 },
  { id: 3, desc: 'Хорошие', rating: 4 },
  { id: 5, desc: 'Плохие', rating: 2 },
];

export const ProudctReviewsScreen = ({ navigation, route }) => {
  const [selectedFactory, setSelectedFactory] = useState(0);
  const [data, setData] = useState<CommonModal>()
  const [loading, setLoading] = useState(false)

  const [reviewList, setReviewList] = useState()



  useEffect(() => {
    callAPI()
  }, [])

  useEffect(() => {
    if (data && data.data && data.isSuccess) {
      const filterImages = data.data.data.filter((it: any) => it.images.length > 0)
      filterOptions[1].id = filterImages.length
      const badFilter = data.data.data.filter((it: any) => it.rating <= 2)
      filterOptions[3].id = badFilter.length
      const filter = data.data.data.filter((it: any) => it.rating >= 4)
      filterOptions[2].id = filter.length
      setReviewList(data.data.data)
      // setRefresh(!refresh)
    }
  }, [loading])

  const callAPI = () => {
    setLoading(true)
    const id = route.params && route.params.productId ? route.params.productId : '65b8c1a8b03f0c815947e1e7'
    getAPICall(ReviewApis.getReviews + `${id}`, (res: any) => {
      setLoading(false)
      setData(res)

    })
  }

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

          <TouchableOpacity onPress={() => {
            navigation.navigate(RouteNames.cartScreen)
          }} style={{ alignItems: 'center', marginStart: -20 }}>
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

  return (data && data.data && data.isSuccess ?
    <View style={{ flex: 1 }}>
      <View>
        <FlatList
          style={style.primaryCategoriesContent}
          data={filterOptions}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => {
            return item.id.toString();
          }}
          renderItem={({ item, index }) => {
            return (
              <View style={{ paddingHorizontal: 4.5 }}>
                <TouchableOpacity onPress={() => {
                  setSelectedFactory(index)
                  if (item.rating == -1) {
                    const filter = data.data.data.filter((it: any) => it.images.length > 0)
                    setReviewList(filter)
                  } else if (item.rating == 0) {
                    setReviewList(data.data.data)
                  } else if (item.rating == 2) {
                    const filter = data.data.data.filter((it: any) => it.rating <= item.rating)
                    setReviewList(filter)
                  } else {
                    const filter = data.data.data.filter((it: any) => it.rating >= item.rating)
                    setReviewList(filter)
                  }
                }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      color: selectedFactory === index ? '#ff7600' : 'black',
                    }}>
                    {item.desc}
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color:
                          selectedFactory === index ? '#ff7600' : colors.grey,
                      }}>
                      {item.id != 1 ? '(' + item.id + ')' : ''}
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
        <FlatList
          data={data.data.mostlyUsedWords}
          horizontal
          keyExtractor={item => {
            return item.word.toString();
          }}
          style={{ flexWrap: 'wrap', marginVertical: 9, marginStart: 9 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => { }}
                style={{
                  backgroundColor: colors.white,
                  marginEnd: 5,
                  borderRadius: 20,
                  height: 26,
                  justifyContent: 'center'
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.balc111111,
                    paddingHorizontal: 12,
                    textAlign: 'center',
                    fontWeight: '400'
                  }}>
                  {item.word}{`(${item.count})`}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <ReviewLay reviewList={reviewList} data={data.data.data} />
    </View> : loading ? <ProgressView /> : <RetryWhenErrorOccur data={data} onClick={() => {
      setData(undefined)
      callAPI()
    }} />
  );
};

const ReviewLay = ({ reviewList, data }) => {

  return <View
    style={{
      flex: 1,
      paddingVertical: 12,
      backgroundColor: colors.white,
      borderTopRightRadius: 13,
      borderTopLeftRadius: 13,
      paddingHorizontal: 13, borderRadius: 13, height: '100%'
    }}>
    {
      reviewList == undefined ? <ReviewUser data={data} size={113} isScroll={true} />
        : reviewList.length > 0 ?
          <ReviewUser data={reviewList} size={113} isScroll={true} /> :
          <View style={{ flex: 1 }}>
            <Text style={[styles.textStyle, {
              color: colors.lightOrange,
              paddingVertical: 100,
              fontSize: 16, fontWeight: 'bold', textAlign: 'center'
            }]}>No reviews</Text>
          </View>
    }
  </View>
}


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
