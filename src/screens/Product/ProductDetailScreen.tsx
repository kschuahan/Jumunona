import { styles } from '../../utils/AppStyles';
import {
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useRef, useState } from 'react';
import { AppString } from '../../utils/AppStrings';
import { fontFamily } from '../../utils/Fonts';
import { colors } from '../../utils/AppColors';
import { appIcons, imagesUrl, productImages } from '../../utils/AppIcons';
import { dimensions } from '../../utils/sizes';
import LinearGradient from 'react-native-linear-gradient';
import { onShare } from '../../utils/Common';
import SelectProductSizeColorScreen from './SelectProductSizeColorScreen';
import ProuductGuanteeScreen from './ProductGuarnteeScreen';
import ProductImageScreeen from './ProductImageScreeen';
import CharacterSticsScreen from './CharactersticsScreen';
import { ProductSizeChartSceen } from './ProductSizeChartSceen';
import { RouteNames } from '../../utils/RouteNames';
import AddSelectProductSizeColorScreen from './AddSelectProductSizeColorScreen';
import BuySelectProductSizeColorScreen from './BuySelectProductSizeColorScreen';
import ArrowRedoOutline from '../../../assets/Icons/arrowRedoOutline.svg';
import CartIcon from '../../../assets/Icons/Carts.svg';
import EllipsisHorizontal from '../../../assets/Icons/ellipsis-horizontal.svg';
import ChevronBackOutline from '../../../assets/Icons/chevronBackOutline.svg';
import ArchiveOutline from '../../../assets/Icons/Shops.svg';
import ChatbubbleEllipsisOutline from '../../../assets/Icons/Message.svg';
import HeartOutline from '../../../assets/Icons/heartOutline.svg';
import HeartRed from '../../../assets/Icons/heartRed.svg';
import SearchIcon from '../../../assets/Icons/searchIcon.svg';
import Share from '../../../assets/Icons/Share.svg';
import Forward from '../../../assets/Icons/Forward.svg';
import CheckGrey from '../../../assets/Icons/CheckGrey.svg';
import Star from '../../../assets/Icons/Star.svg';
import GreyStar from '../../../assets/Icons/GreyStar.svg';
import OrangeStar from '../../../assets/Icons/OrangeStar.svg';

import Cube from '../../../assets/Icons/Cube.svg';
import Profile from '../../../assets/Icons/Profile.svg';

import { AirbnbRating, Rating } from 'react-native-ratings';
import Chars from '../../../assets/Icons/Chars.svg';
import Guaranty from '../../../assets/Icons/Guaranty.svg';
import Sizes from '../../../assets/Icons/Sizes.svg';
import ColorIcon from '../../../assets/Icons/ColorIcon.svg';
import StarRating from 'react-native-star-rating-widget';

const shoeImageURL = appIcons.shoeImageURL;
const china = appIcons.china;
const reviewFilter = [
  { id: 1, desc: "Don't lose color(8)" },
  { id: 2, desc: 'Good Fabric(12)' },
  { id: 3, desc: 'Soft Soul(1)' },
];
interface Product {
  id: number;
  imageURL: string | any;
  desc: string;
}

interface Position {
  y: number;
  name: string;
}
export const data: Product[] = [
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
];

const imagesArray = [1, 2, 3, 4, 5];
const postionsArray: Position[] = [
  {
    y: 50,
    name: 'Продукт',
  },
  {
    y: 550,
    name: 'Отзывы',
  },
  {
    y: 1050,
    name: 'Детали',
  },
  {
    y: 1700,
    name: 'Еще',
  },
];

export const ProductDetailScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [butShow, setBuyShow] = useState(false);
  const [guranty, setOnGauranty] = useState(false);

  const [addShow, setAddShow] = useState(false);

  const handleViewableItemsChanged = useRef(({ viewableItems, changed }) => {
    if (changed && changed.length > 0) {
      // console.log("Visible items are", viewableItems[0].index);
      // console.log("Changed in this iteration", changed[0]);
      setActiveIndex(changed[0].index);
    }
  });
  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',

      headerRight: () => (
        <View style={{
          flexDirection: 'row', gap: 34, alignItems: 'center', marginBottom: -2
        }}>
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
            marginBottom: -2

          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ alignItems: 'center', marginStart: -25, marginEnd: 5 }}>
            <ChevronBackOutline width={15} height={15} />
          </TouchableOpacity>

          <SearchView />
        </View>
      ),
      headerStyle: {
        backgroundColor: colors.white,
      },

      headerShadowVisible: false,
    });
  }, []);

  const [currentPosition, setCurrentPosition] = useState(0);
  const [selectPosition, setSelectPosition] = useState(0);

  const [like, setLike] = useState(false);
  const scrollRef = useRef<ScrollView>()
  const handleScroll = (event: Object) => {
    //  console.log(event.nativeEvent.contentOffset.y);
    if (event.nativeEvent.contentOffset.y < 50) {
      setCurrentPosition(0);
      setSelectPosition(0)
    } else if (
      event.nativeEvent.contentOffset.y >= 50 &&
      event.nativeEvent.contentOffset.y < 550
    ) {
      setCurrentPosition(50);
      setSelectPosition(0)

    } else if (
      event.nativeEvent.contentOffset.y >= 550 &&
      event.nativeEvent.contentOffset.y < 1050
    ) {
      setCurrentPosition(550);
      setSelectPosition(1)

    } else if (
      event.nativeEvent.contentOffset.y >= 1050 &&
      event.nativeEvent.contentOffset.y < 1400
    ) {
      setCurrentPosition(1050);
      setSelectPosition(2)
    } else if (event.nativeEvent.contentOffset.y > 1400) {
      setCurrentPosition(1700);
      setSelectPosition(3)
    }
  };

  const [showImages, setShowImages] = useState(-1);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ paddingTop: -10 }}>
        <View style={[styles.container, { padding: undefined }]}>
          <View>
            <FlatList
              style={{ flexGrow: 0 }}
              horizontal={true}
              snapToAlignment="center"
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              data={productImages}
              decelerationRate={'normal'}
              scrollEventThrottle={16}
              onViewableItemsChanged={handleViewableItemsChanged.current}
              viewabilityConfig={{
                viewAreaCoveragePercentThreshold: 50,
                waitForInteraction: true,
                minimumViewTime: 5,
              }}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => {
                    setShowImages(index);
                  }}
                  style={[{ padding: 0 }]}>
                  <Image
                    source={{ uri: item }}
                    style={{
                      width: Dimensions.get('window').width,
                      height: 375,
                    }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              )}
            />
            <Text
              style={[
                styles.textStyle,
                {
                  position: 'absolute',
                  bottom: 10,
                  end: 9,
                  color: colors.white,
                  height: 23,
                  width: 38,
                  textAlign: 'center',
                  paddingTop: 4,
                  backgroundColor: 'rgba(0, 0,0, .6 )',
                  fontSize: 10,
                  borderRadius: 12,
                },
              ]}>
              {activeIndex + 1 + '/' + productImages.length}
            </Text>
          </View>

          <ProductDetails />
          <ProductDesclamenation isGauranty={guranty} onGauranctCancle={() => {
            setOnGauranty(false)
          }} />
          <View style={{ paddingHorizontal: 9 }}>
            <ReviewsSection
              viewAllReviews={() => {
                navigation.navigate(RouteNames.product_review_screen);
              }}
            />
            <ShopView navigation={navigation} />
          </View>
          <ProductImages
            onClick={(index: number) => {
              setShowImages(index);
            }}
          />
          <RelatedProducts
            onclick={() => {
              navigation.push(RouteNames.product_detail);
            }}
          />
        </View>
      </ScrollView>
      {currentPosition > 0 ? (
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: colors.white,
            justifyContent: 'space-between',
            paddingBottom: 4,
            borderBottomLeftRadius: 13,
            borderBottomRightRadius: 13,
            shadowOpacity: 0.4,
            shadowRadius: 5,
            shadowOffset: { width: 5, height: 5 },
            paddingHorizontal: 4,
            elevation: 4,
            position: 'absolute',
          }}>
          <FlatList
            data={postionsArray}
            horizontal
            keyExtractor={item => {
              return item.y.toString();
            }}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectPosition(index)

                    if (index == 0) {
                      scrollRef.current?.scrollTo(0, 0, true)
                      // setCurrentPosition(50)
                    } else if (index == 1) {
                      scrollRef.current?.scrollTo(552, 0, true)

                      // setCurrentPosition(550)
                    }
                    else if (index == 2) {
                      scrollRef.current?.scrollTo(1052, 0, true)
                      // setCurrentPosition(1050)
                    } else {
                      scrollRef.current?.scrollTo(1702, 0, true)
                      //setCurrentPosition(1700)
                    }
                  }}
                  style={{
                    flexDirection: 'column',
                    width: Dimensions.get('window').width / postionsArray.length,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color:
                        currentPosition == item.y
                          ? colors.lightOrange
                          : colors.black333333,
                      paddingBottom: 3,
                    }}>
                    {item.name}
                  </Text>
                  {currentPosition == item.y ? (
                    <View
                      style={{
                        backgroundColor: colors.lightOrange,
                        height: 2,
                        width: 26,
                      }}
                    />
                  ) : null}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
      <View
        style={{
          backgroundColor: colors.white,
          position: 'absolute',
          bottom: 0,
          width: Dimensions.get('window').width,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 34,
          paddingTop: 6,
          flexDirection: 'row',
          borderTopStartRadius: 13,
          borderTopEndRadius: 13,
          shadowColor: colors.black,
          elevation: 10
        }}>
        <View style={{ flexDirection: 'row', marginStart: 36, gap: 40 }}>
          <TouchableOpacity style={{ alignItems: 'center', marginStart: -20 }}>
            <ArchiveOutline width={24} height={24} color={colors.startOrange} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate(RouteNames.chat_screen);
            }}
            style={{ alignItems: 'center', marginStart: -20 }}>
            <ChatbubbleEllipsisOutline width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setLike(!like);
            }}
            style={{
              alignItems: 'center',
              marginStart: -20,
            }}>
            {like ? (
              <HeartRed width={24} height={24} />
            ) : (
              <HeartOutline width={24} height={24} />
            )}
            {/* <Ionicons
              name={like ? 'heart' : 'heart-outline'}
              size={24}
              color={like ? colors.lightRed : colors.grey}
            /> */}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <CommonButton
            startorange={colors.yellowStart}
            endColor={colors.yellowEnd}
            onClick={() => {
              setAddShow(true);
            }}
          />
          <CommonButton
            text={AppString.buy}
            onClick={() => {
              setBuyShow(true);
            }}
          />
        </View>
      </View>
      <ProductImageScreeen
        isShow={showImages != -1}
        pos={showImages != -1 ? showImages : 0}
        onClose={() => {
          setShowImages(-1);
        }}
      />

      <AddSelectProductSizeColorScreen
        isShow={addShow}
        onClose={() => {
          setAddShow(false);
        }}
        onGuranty={() => {
          setOnGauranty(true)
        }}
      />
      <BuySelectProductSizeColorScreen
        isShow={butShow}
        onClose={() => {
          setBuyShow(false);
        }}
        onGuranty={() => {
          setOnGauranty(true)
        }}
      />
    </View>
  );
};
// MARK: - Review Section
const ReviewsSection = ({ viewAllReviews, text = '' }) => {
  return (
    <View
      id={'reviewSection'}
      style={{
        borderRadius: 13,
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}>
      <TextWithIcon Icon={null} title={AppString.review + "(300+)"} onClick={viewAllReviews} />
      <FlatList
        data={reviewFilter}
        horizontal
        keyExtractor={item => {
          return item.id.toString();
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                height: 30,
                paddingHorizontal: 12,
                borderRadius: 15,
                backgroundColor: colors.orangeFCEDE8,
                marginEnd: 10,
                marginBottom: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => { }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: colors.orangeF66123,
                  }}>
                  {item.desc}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <ReviewUser text={text} />
    </View>
  );
};

export const ReviewUser = ({ text = 'Серый XL', size = 81 }) => {
  return (
    <View>
      <FlatList
        data={[1, 2]}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          <View style={{ marginBottom: 10, marginTop: index == 0 ? 5 : 30 }}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={{ width: 40, height: 40, borderRadius: 20 }}
                source={{ uri: imagesUrl.profile }}
              />
              <View
                style={{
                  flex: 1,
                  alignContent: 'flex-start',
                  flexDirection: 'column',
                  paddingStart: 8,
                  gap: 4
                }}>
                <Text style={[styles.textStyle, { fontSize: 15 }]}>
                  user****ame
                </Text>

                <Text
                  style={[
                    styles.textStyle,
                    { fontSize: 12, color: colors.grey },
                  ]}>
                  26.10.2022
                </Text>
              </View>
              <RatingView rating={3.5} />
            </View>

            {text != '' ? (
              <Text
                style={[
                  styles.textStyle,
                  {
                    fontSize: 14,
                    marginTop: 12.5,
                    color: colors.grey,
                  },
                ]}>
                {text}
              </Text>
            ) : null}
            <Text
              style={[
                styles.textStyle,
                {
                  fontSize: 14,
                  paddingTop: 2,
                  marginTop: text == '' ? 10 : 4,
                  color: colors.balc111111,
                },
              ]}>Very good quality多能显示2行-----------</Text>

            {index != 0 ? (
              <FlatList
                style={{ marginTop: 15 }}
                data={[1, 2, 3, 4, 5]}
                renderItem={({ item }) => (
                  <View style={{ marginHorizontal: size == 81 ? 1 : 3 }}>
                    <Image
                      source={{ uri: imagesUrl.shoes }}
                      style={{ width: size, height: size, borderRadius: 6 }}
                    />
                  </View>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            ) : null}
          </View>
        )}
      />
    </View>
  );
};

const CommonButton = ({
  text = AppString.add_to_cart,
  endColor = colors.endOrange,
  startorange = colors.startOrange,
  onClick,
}) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <LinearGradient
        colors={[startorange, endColor]}
        start={{ x: 0.4, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 1000,
          marginEnd: 8,
          height: 38,
          width: 107,
          paddingHorizontal: 19,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text
          style={[
            styles.textStyle,
            { color: colors.white, fontWeight: 'bold', fontSize: 14 },
          ]}>
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const ProductDesclamenation = ({ isGauranty = false, onGauranctCancle }) => {
  const [showColorSize, setShowColorSize] = useState(false);
  const [showGurantees, setShowGurantees] = useState(isGauranty);

  const [showCharacterstics, setShowCharacterstics] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);

  useEffect(() => {
    setShowGurantees(isGauranty)
  }, [isGauranty])

  return (
    <View
      style={{
        marginTop: 12,
        marginHorizontal: 9,
        backgroundColor: colors.white,
        borderRadius: 12,
        paddingTop: 8.5,
        paddingEnd: 13.56,
        paddingStart: 12.5,
        marginBottom: 10,
        paddingBottom: 4,
      }}>
      <Text
        style={[
          styles.textStyle,
          {
            fontSize: 14,
            alignSelf: 'flex-end',
            marginEnd: 42,
            paddingBottom: 2,
          },
        ]}>
        {'Выбран: 7 дюймовый'}
      </Text>
      <TextWithIcon
        Icon={ColorIcon}
        title="2 цветов на выбор"
        onClick={() => {
          setShowColorSize(true);
        }}
      />
      <TextWithIcon
        Icon={Guaranty}
        title="Доставка • Возврат • Цена"
        onClick={() => {
          setShowGurantees(true);
        }}
      />
      <TextWithIcon
        Icon={Chars}
        title="Бренд • Материал • Метод обработки"
        onClick={() => {
          setShowCharacterstics(true);
        }}
      />
      <TextWithIcon
        Icon={Sizes}
        title="Ширина плеч • Ширина груди • Длина рукава"
        onClick={() => {
          setShowSizeChart(true);
        }}
      />
      <SelectProductSizeColorScreen
        isShow={showColorSize}
        onClose={() => {
          setShowColorSize(false);
        }}
        onGuranty={() => {
          setShowGurantees(true);
        }}
      />
      <ProuductGuanteeScreen
        isShow={showGurantees}
        onClose={() => {
          setShowGurantees(false);
          onGauranctCancle()
        }}
      />
      <CharacterSticsScreen
        isShow={showCharacterstics}
        onClose={() => {
          setShowCharacterstics(false);
        }}
      />
      <ProductSizeChartSceen
        isShow={showSizeChart}
        onClose={() => {
          setShowSizeChart(false);
        }}
      />
    </View>
  );
};

const TextWithIcon = ({
  title = AppString.address,
  padding = 16,
  Icon = Forward,
  onClick,
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        styles.profile,
        { marginTop: undefined, alignItems: 'center', paddingBottom: padding, },
      ]}>
      {Icon != undefined ? (
        <Icon />
        // <Ionicons name={icon} color={colors.extraGrey} size={15} />
      ) : null}

      <Text
        style={[
          styles.textStyle,
          {
            fontSize: Icon == null ? 15 : 14,
            fontWeight: Icon == null ? '500' : '400',
            width: '92%',

          },
        ]}
        numberOfLines={1}
      >
        {' '}
        {title}
      </Text>
      {/* <Ionicons
        name={'chevron-forward-outline'}
        color={colors.extraGrey}
        size={15}
      /> */}
      <Forward style={{ marginTop: 6 }} />
    </TouchableOpacity>
  );
};

export const RatingView = ({ rating = 3.5, count = 5,
  size = 12, ms = 3, Icon = OrangeStar,
  EmptyStar = GreyStar, onClick = (number: number) => { }, disabled = true }) => {
  const ratingArray = [1, 2, 3, 4, 5];
  return (
    <View>

      {/* <AirbnbRating count={count} reviewSize={rating} selectedColor={colors.endOrange} size={11}
        isDisabled showRating={false} /> */}

      {/* <Rating
        ratingImage={appIcons.star}
        ratingColor='#FC4A1A'
        ratingBackgroundColor='#D9D9D9'
        ratingCount={5}
        imageSize={12}
        style={{ paddingVertical: 10 }}
      /> */}
      {/* <StarRating
        maxStars={5}
        starSize={15}
        color='#FC4A1A'
        enableHalfStar={true}
        emptyColor='#D9D9D9'
        rating={rating} onChange={function (rating: number): void {
          console.log(rating);

        }} /> */}
      <FlatList
        data={ratingArray}
        scrollEnabled={false}
        horizontal
        keyExtractor={item => {
          return item.toString();
        }}
        renderItem={({ item, index }) =>
          <TouchableOpacity disabled={disabled} onPress={() => onClick(index)}>{rating > index ? <Icon height={size} width={size} style={{ marginStart: ms }} /> :
            <EmptyStar height={size} width={size} style={{ marginStart: ms }} />}</TouchableOpacity>
        }
      />
    </View>
  );
};

// MARK: - Shop Detail

const ShopView = ({ navigation }) => {
  return (
    <View
      style={{
        borderRadius: 13,
        backgroundColor: colors.white,
        padding: 10,
        marginTop: 12,
      }}>
      <TouchableOpacity onPress={() => {
        navigation.navigate(RouteNames.shopHomeScreen)

      }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{ width: 55, height: 55, borderRadius: 27 }}
          source={{ uri: imagesUrl.shoes }}
        />
        <View
          style={{
            flex: 1,
            alignContent: 'flex-start',
            flexDirection: 'column',
            marginTop: -8,
            paddingStart: 10,
            gap: 3,
          }}>
          <Text style={[styles.textStyle, { fontSize: 17, fontWeight: '500' }]}>
            {' '}
            <Image
              source={appIcons.china}
              style={{
                width: 15,
                height: 15,
              }}
              resizeMode="cover"
            />{' '}
            Shop name name
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginStart: 5,
              alignContent: 'center'
            }}>
            <Star style={{ marginEnd: 3.5 }} />
            <Text style={[styles.textStyle, { fontSize: 11, marginEnd: 19.5 }]}>
              4.5
            </Text>

            <Cube style={{ marginEnd: 3.5 }} />
            <Text style={[styles.textStyle, { fontSize: 11, marginEnd: 19.5 }]}>
              2 505
            </Text>

            <Profile style={{ marginEnd: 3.5 }} />
            <Text style={[styles.textStyle, { fontSize: 11, marginEnd: 19.5 }]}>
              50 000
            </Text>
          </View>
        </View>
        <CheckGrey

          style={{ paddingLeft: 10, paddingRight: 3 }}
          color={'#CCCCCC'}
        />
      </TouchableOpacity>
      <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 13 }}>
        <TouchableOpacity onPress={() => {
          navigation.push(RouteNames.shopHomeScreen)

        }} style={[style.button]}>
          <Text
            style={{
              fontSize: 13,
              color: colors.lightOrange,
              paddingHorizontal: 10,
            }}>
            {AppString.all_goods}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.push(RouteNames.shopHomeScreen)

        }} style={style.button}>
          <Text
            style={{
              fontSize: 13,
              color: colors.lightOrange,
              paddingHorizontal: 10,
            }}>
            {AppString.categories}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: colors.greyF4F4F4,
          marginBottom: 14,
        }}
      />
      <View style={{ marginStart: -4, marginBottom: 4 }}>
        <TextWithIcon
          Icon={null}
          padding={0}
          title={AppString.featured}
          onClick={() => {
            navigation.push(RouteNames.shopHomeScreen)

          }}
        />
      </View>
      <ShopFeaturedProduct onClick={() => {
        navigation.push(RouteNames.product_detail)

      }} />
    </View >
  );
};

const ShopFeaturedProduct = ({ onClick }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => {
        return item.id.toString();
      }}
      scrollEnabled={false}
      numColumns={3}
      style={{ marginEnd: -2.5 }}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity onPress={onClick}
            style={{
              backgroundColor: '#ffffff',
              marginHorizontal: 2.5,
              flex: 1 / 3,
              height: 160,
              borderColor: '#f1f1f1',
              marginTop: 12,
            }}>
            <Image
              source={item.imageURL}
              style={{
                height: 108,
                width: '100%',
                borderRadius: 6,
                backgroundColor: '#f1f1f1',

                marginBottom: 8,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '400',
                  color: colors.balc111111
                }}
                numberOfLines={1}>
                Название това...
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#ff7600',
                }}>
                999c.
              </Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const ProductImages = ({ onClick }) => {
  return (
    <View>

      <View style={{
        justifyContent: 'center', alignItems: 'center',
        flexDirection: 'row', paddingTop: 15,
        paddingBottom: 12, gap: 10
      }}>
        <View
          style={{
            height: 0.5,
            width: 55,
            borderRadius: 0.5,
            marginTop: 3,
            backgroundColor: '#DDDDDD',
          }}
        />
        <Text
          style={{
            fontSize: 12.5,
            color: '#666666',

            alignSelf: 'center',
          }}>
          Детали
        </Text>
        <View
          style={{
            height: 0.5,
            width: 55,
            marginTop: 3,

            borderRadius: 0.5,
            backgroundColor: '#DDDDDD',
          }}
        />
      </View>
      {imagesArray.map((item, index) => (
        <TouchableOpacity
          onPress={() => {
            onClick(index);
          }}
          style={{ paddingBottom: 8 }}>
          <Image
            source={{ uri: imagesUrl.shoes }}
            style={{ width: '100%', height: 385 }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const RelatedProducts = ({ onclick }) => {
  return (
    <View style={{ marginBottom: 100, paddingStart: 9 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: 1,
            width: 50,
            borderRadius: 0.5,
            backgroundColor: colors.lightOrange,
          }}
        />
        <View
          style={{
            height: 2,
            width: 2,
            borderRadius: 1,
            backgroundColor: colors.lightOrange,
          }}
        />

        <Text
          style={{
            fontSize: 14,
            color: colors.lightOrange,
            fontFamily: 'SegoeUI',
            paddingTop: 20,
            paddingBottom: 17,
            paddingHorizontal: 5,
            alignSelf: 'center',
          }}>
          Ещё
        </Text>
        <View
          style={{
            height: 2,
            width: 2,
            borderRadius: 1,
            backgroundColor: colors.lightOrange,
          }}
        />
        <View
          style={{
            height: 1,
            width: 50,
            borderRadius: 0.5,
            backgroundColor: colors.lightOrange,
          }}
        />
      </View>
      <FlatList
        data={data}
        keyExtractor={item => {
          return item.id.toString();
        }}
        scrollEnabled={false}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                borderRadius: 13,
                backgroundColor: '#ffffff',
                marginEnd: 9,
                marginVertical: 4,
                flex: 0.5,
                height: 326,
                borderColor: '#f1f1f1',
                marginTop: 8,
              }}
              onPress={() => {
                onclick();
              }}>
              <Image
                source={appIcons.shoeImageURL}
                style={{
                  height: 265,
                  paddingHorizontal: 1,
                  width: 'auto',
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,

                  backgroundColor: '#f1f1f1',

                  marginBottom: 7,
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  paddingLeft: 7,
                }}>
                <Image
                  source={china}
                  style={{ height: 15, width: 15 }}
                />
                <Text
                  style={{
                    marginLeft: 4,
                    fontSize: 15,
                    fontWeight: '500',
                    color: colors.black
                  }}
                  numberOfLines={1}>
                  Футболка
                </Text>
              </View>
              <View
                style={{ flexDirection: 'row', paddingLeft: 8, paddingTop: 4 }}>
                <View style={{ flexDirection: 'row', width: '30%' }}>
                  <Text
                    style={{
                      fontSize: 17,
                      color: '#ff7600',
                      fontFamily: 'SegoeUI',
                    }}>
                    999
                  </Text>
                  <Text
                    style={{
                      paddingTop: 6,
                      color: '#ff7600',
                      fontSize: 12,
                      fontFamily: 'SegoeUI',
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
                    fontFamily: 'SegoeUI',
                  }}>
                  {item.desc}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const ProductDetails = () => {
  return (
    <View
      style={{
        marginTop: 12,
        marginHorizontal: 9,
        backgroundColor: colors.white,
        borderRadius: 12,
        paddingVertical: 8.5,
        paddingEnd: 8,
        paddingStart: 12,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          paddingEnd: 4,
        }}>
        <View style={{ flexDirection: 'row', gap: 8.5 }}>
          <Text
            style={[
              styles.textStyle,
              { fontSize: 21, color: colors.lightOrange },
            ]}>
            {'178с.'}
          </Text>
          <Text
            style={[
              styles.textStyle,
              {
                fontSize: 21,
                color: colors.greyCCCCCCE3,
                textDecorationLine: 'line-through',
              },
            ]}>
            {'178с.'}
          </Text>
        </View>
        <RatingView />
      </View>
      <View style={{ flexDirection: 'row', gap: 6, marginTop: 2, width: '100%' }}>
        <Text
          style={[
            styles.textStyle,
            { fontSize: 16, fontWeight: '600', width: '95%' },
          ]}>
          <Image
            source={appIcons.china}
            style={{
              width: 15,
              height: 15,
              marginTop: 5,
            }}
            resizeMode="cover"
          />{' '}
          {'ORT Product name子子子子子子子子子子子子男 子子子子子子子子'}
        </Text>
      </View>

      <Text
        style={[
          styles.textStyle,
          {
            fontSize: 13,
            color: colors.grey,
            alignSelf: 'flex-end',
            marginTop: -20,
            paddingBottom: 6,
          },
        ]}>
        {'продано 15'}
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  searchTextInput: {
    height: 33,
    marginStart: 4,
    fontFamily: 'SegoeUI',
    fontSize: 15,
    padding: 0,
    width: '80%'
  },
  primaryCategoriesContent: {
    paddingTop: 8,
    paddingLeft: 16,
    flex: 0.9,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 12,
  },
  button: {
    marginTop: 10,
    marginBottom: 12,
    height: 27,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 100,
    borderWidth: 0.8,
    borderColor: colors.lightOrange,
  },
});

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
        width: '90%'
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

export default ProductDetailScreen;
