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
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { AppString } from '../../utils/AppStrings';
import { colors } from '../../utils/AppColors';
import { appIcons, imagesUrl, productImages } from '../../utils/AppIcons';
import LinearGradient from 'react-native-linear-gradient';
import { onShare } from '../../utils/Common';
import SelectProductSizeColorScreen, { ColorSizeBottomSheetMode } from './SelectProductSizeColorScreen';
import ProuductGuanteeScreen from './ProductGuarnteeScreen';
import ProductImageScreeen from './ProductImageScreeen';
import CharacterSticsScreen from './CharactersticsScreen';
import { ProductSizeChartSceen } from './ProductSizeChartSceen';
import { RouteNames } from '../../utils/RouteNames';
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
import Chars from '../../../assets/Icons/Chars.svg';
import Guaranty from '../../../assets/Icons/Guaranty.svg';
import Sizes from '../../../assets/Icons/Sizes.svg';
import ColorIcon from '../../../assets/Icons/ColorIcon.svg';
import { getAPICall, postAPICall } from '../../Netowork/Apis';
import { CommonModal } from '../HomeScreen';
import { ProductAPIs, ReviewApis } from '../../Netowork/Constants';
import { ProgressView, RetryWhenErrorOccur } from '../../components/Dialogs';
import { getCharachterstics } from '../../utils/DataManipulation';
import moment from 'moment';
import { ShareJumu } from '../../utils/Share';
import { BackLogo } from '../../components/Header';

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

export const ProductDetailScreen = ({ navigation, route }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [guranty, setOnGauranty] = useState(false);
  const [data, setData] = useState<CommonModal>()
  const [shopData, setShopData] = useState<CommonModal>()
  const [reviewData, setReviewData] = useState<CommonModal>()

  const [loading, setLoading] = useState(false)
  const [favLoading, setFavLoading] = useState(false)
  const [showColorSize, setShowColorSize] = useState(false);
  const [sizeColorBottomSheetMode, setSizeColorBottomSheetMode] = useState(ColorSizeBottomSheetMode.selectSize)
  const [images, setImages] = useState(data && data.data.data
    && data.data.data.productImages &&
    data.data.data.productImages.length > 0 ?
    data.data.data.productImages : productImages)

  const [desImages, setDesImages] = useState(data && data.data.data
    && data.data.data.discriptionPath &&
    data.data.data.discriptionPath.length > 0 ?
    data.data.data.discriptionPath : productImages)
  const [imagesType, setImageType] = useState(-1)

  useEffect(() => {
    callAPI()
  }, [])

  const addFav = () => {
    setFavLoading(true)
    postAPICall({ productId: [route.params && route.params.id ? route.params.id : '65b8c1a8b03f0c815947e1e7'] },
      ProductAPIs.favoriteProduct, true,
      (res: any) => {
        setFavLoading(false)
        setFavourite(!isFav);
      })
  }

  const removeFav = () => {
    setFavLoading(true)
    postAPICall({ productId: [route.params && route.params.id ? route.params.id : '65b8c1a8b03f0c815947e1e7'] },
      ProductAPIs.removeFavourite, true,
      (res: any) => {
        setFavLoading(false)
        setFavourite(!isFav);
      })
  }

  const callAPI = () => {
    setLoading(true)
    const id = route.params && route.params.id ? route.params.id : '65b8c1a8b03f0c815947e1e7'
    callShopsApi(id)
    callReviewApi(id)
    getAPICall(ProductAPIs.getProductDetails + `${id}`, (res: any) => {
      setLoading(false)
      setData(res)
      if (res.data) {

        setImages(res.data.data.productImages.length ? res.data.data.productImages : productImages)
        setDesImages(res.data.data.discriptionPath.length ? res.data.data.discriptionPath : productImages)

        setFavourite(res.data.data.isFavourite)
        // console.warn("color options", res.data.data.attributes.attribute1.attr1.data)
      }
    })
  }


  const callShopsApi = (id: string) => {

    getAPICall(ProductAPIs.getShopsProduct + `${id}`, (res: any) => {
      setShopData(res)
    })
  }


  const callReviewApi = (id: string) => {
    getAPICall(ReviewApis.getReviews + `${id}`, (res: any) => {
      setReviewData(res)
    })
  }


  const handleViewableItemsChanged = useRef(({ viewableItems, changed }) => {
    if (changed && changed.length > 0) {
      // console.log("Visible items are", viewableItems[0].index);
      // console.log("Changed in this iteration", changed[0]);
      setActiveIndex(changed[0].index);
    }
  });

  const [currentPosition, setCurrentPosition] = useState(0);
  const [selectPosition, setSelectPosition] = useState(0);

  const [isFav, setFavourite] = useState(false);
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
    data && data.data && data.isSuccess ? <View style={{ flex: 1 }}>
      <CustomDetailHeader navigation={navigation} />
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
              data={images}
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
                    setImageType(0)
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
              {activeIndex + 1 + '/' + images.length}
            </Text>
          </View>

          <ProductDetails item={data.data.data} />
          <ProductDesclamenation
            item={data.data.data}
            isGauranty={guranty}
            onGauranctCancle={() => {
              setOnGauranty(false)
            }}
            onShowColorSize={() => {
              setSizeColorBottomSheetMode(ColorSizeBottomSheetMode.selectSize)
              setShowColorSize(true)

            }} />
          <View style={{ paddingHorizontal: 9 }}>
            <ReviewsSection
              data={reviewData}
              viewAllReviews={() => {
                const id = route.params && route.params.id ? route.params.id : '65b8c1a8b03f0c815947e1e7'
                navigation.navigate(RouteNames.product_review_screen,
                  { productId: id });
              }}
            />
            <ShopView data={shopData} navigation={navigation} route={route} />
          </View>
          <ProductImages
            images={desImages}
            onClick={(index: number) => {
              setShowImages(index);
            }}
          />
          <RelatedProducts item={data.data.recommendedProducts}
            onclick={(item: any) => {
              navigation.push(RouteNames.product_detail, { id: item._id });
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
              navigation.navigate(RouteNames.chat_screen, { id: data.data.data.supplierUserId });
            }}
            style={{ alignItems: 'center', marginStart: -20 }}>
            <ChatbubbleEllipsisOutline width={24} height={24} />
          </TouchableOpacity>
          {
            favLoading ? <ActivityIndicator size={"small"} style={{ alignSelf: 'center', justifyContent: "center", alignItems: "center", marginStart: -20, }} color={colors.lightOrange} /> :
              <TouchableOpacity
                onPress={() => {
                  if (isFav) {
                    removeFav()
                  } else {
                    addFav()
                  }
                }}
                style={{
                  alignItems: 'center',
                  marginStart: -20,
                }}>
                {isFav ? (
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
          }
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <CommonButton
            startorange={colors.yellowStart}
            endColor={colors.yellowEnd}
            onClick={() => {
              setSizeColorBottomSheetMode(ColorSizeBottomSheetMode.addToCart)
              setShowColorSize(true);
            }}
          />
          <CommonButton
            text={AppString.buy}
            onClick={() => {
              setSizeColorBottomSheetMode(ColorSizeBottomSheetMode.buyNow)
              setShowColorSize(true);
            }}
          />
        </View>
      </View>
      <ProductImageScreeen
        data={imagesType == 0 ? images : desImages}
        isShow={showImages != -1}
        pos={showImages != -1 ? showImages : 0}
        onClose={() => {
          setImageType(1)
          setShowImages(-1);
        }}
      />
      <SelectProductSizeColorScreen
        navigation={navigation}
        productDetail={data.data.data}
        displayImage={images[0]}
        currentMode={sizeColorBottomSheetMode}
        isShow={showColorSize}
        onClose={() => {
          setShowColorSize(false);
        }}
        onGuranty={() => {
          setOnGauranty(true)
        }}
        onGoToCart={() => {
          setShowColorSize(false);
          navigation.navigate(RouteNames.cartScreen)
        }}
      />

    </View> : loading ? <ProgressView /> : <RetryWhenErrorOccur data={data} onClick={() => {
      setData(undefined)
      callAPI()
    }} />
  );
};
// MARK: - Review Section
const ReviewsSection = ({ data, viewAllReviews, text = '' }) => {
  return (
    data && data.isSuccess ? <View
      id={'reviewSection'}
      style={{
        borderRadius: 13,
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}>
      <TextWithIcon Icon={null} title={`${AppString.review}(${data.data.data.length}+)`} onClick={viewAllReviews} />
      <FlatList
        data={data.data.mostlyUsedWords}
        horizontal
        keyExtractor={item => {
          return item.word.toString();
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
                  {item.word}{`(${item.count})`}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <ReviewUser data={data.data.data ? data.data.data.filter((it: any, index: number) => index < 3) : []} text={text} />
    </View> : null
  );
};

export const ReviewUser = ({ data, text = 'Серый XL', size = 81, isScroll = false }) => {
  return (
    <View>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        scrollEnabled={isScroll}
        renderItem={({ item, index }) => (
          <View style={{ marginBottom: 10, marginTop: index == 0 ? 5 : 30 }}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={{ width: 40, height: 40, borderRadius: 20 }}
                source={{ uri: item.profile != '' ? item.profile : imagesUrl.profile }}
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
                  {item.userName}
                </Text>

                <Text
                  style={[
                    styles.textStyle,
                    { fontSize: 12, color: colors.grey },
                  ]}>
                  {moment(item.updatedDate).format('DD-MM-YYYY')}
                </Text>
              </View>
              <RatingView rating={item.rating} />
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
                {`${item.productColour && item.productColour != '' ? item.productColour : 'Gray'} ${item.productSize && item.productSize != '' ? item.productSize : 'XL'}`}
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
              ]}>{item.review}</Text>

            <FlatList
              style={{ marginTop: 15 }}
              data={item.images}
              renderItem={({ item }) => (
                <View style={{ marginHorizontal: size == 81 ? 1 : 3 }}>
                  <Image
                    source={{ uri: item }}
                    style={{ width: size, height: size, borderRadius: 6 }}
                  />
                </View>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
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

const ProductDesclamenation = ({ isGauranty = false, item, onGauranctCancle, onShowColorSize }) => {
  const [showGurantees, setShowGurantees] = useState(isGauranty);

  const [showCharacterstics, setShowCharacterstics] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);


  const [colorSize, setColorSize] = useState(`${item.attributes.attribute1.attr1.data.length} цветов на выбор`)

  useEffect(() => {
    //finding the colors and size from the list
    const color = item.attributes.attribute1.attr1
    const cartItemIndex = color.data.findIndex((element) => (element.isItemInCart));
    console.log("Index 11", cartItemIndex);

    if (cartItemIndex != -1) {
      // const index = color.data.findIndex((element) => (element.attirbutedID ===
      //   color.data[cartItemIndex].attirbutedID));
      // console.log("Index 11", index);

      const sizes = color.data[cartItemIndex].att2.data
      const cartItemIndex1 = sizes.findIndex((element) => (element.isItemInCart));
      console.log("Index 11", cartItemIndex1);

      if (cartItemIndex1 != -1) {
        // const index1 = sizes.findIndex((element) => (element.attirbutedID ===
        //   sizes[cartItemIndex1].attirbutedID));
        setColorSize(color.data[cartItemIndex].attributeValue + " • " + sizes[cartItemIndex1].attributeValue)

        // setSelecteItem(filter[index1].attributeID)
        console.log("Index", cartItemIndex1);
      }
    }


  }, [])

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
      {/* <Text
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
      </Text> */}
      <TextWithIcon
        Icon={ColorIcon}
        title={colorSize}
        onClick={onShowColorSize}
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
        title={getCharachterstics(item.attributes.ruAttribute)}
        onClick={() => {
          setShowCharacterstics(true);
        }}
      />
      {/* <TextWithIcon
        Icon={Sizes}
        title="Ширина плеч • Ширина груди • Длина рукава"
        onClick={() => {
          setShowSizeChart(true);
        }}
      /> */}

      <ProuductGuanteeScreen
        isShow={showGurantees}
        onClose={() => {
          setShowGurantees(false);
          onGauranctCancle()
        }}
      />
      <CharacterSticsScreen
        data={item.attributes.ruAttribute}
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

const ShopView = ({ data, navigation, route }) => {

  // console.warn(data)

  return (data && data.isSuccess ?
    <View
      style={{
        borderRadius: 13,
        backgroundColor: colors.white,
        padding: 10,
        marginTop: 12,
      }}>
      <TouchableOpacity onPress={() => {
        navigation.navigate(RouteNames.shopHomeScreen, { productId: route.params && route.params.id ? route.params.id : '65b8c1a8b03f0c815947e1e7' })

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
            {data.data.data.shopData.shopName}
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
              {data.data.data.shopData.ratings}
            </Text>

            <Cube style={{ marginEnd: 3.5 }} />
            <Text style={[styles.textStyle, { fontSize: 11, marginEnd: 19.5 }]}>
              {data.data.data.shopData.productShiped}
            </Text>

            <Profile style={{ marginEnd: 3.5 }} />
            <Text style={[styles.textStyle, { fontSize: 11, marginEnd: 19.5 }]}>
              {data.data.data.shopData.followers}
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
      <ShopFeaturedProduct data={data.data.data.shopData.shopProducts} onClick={(item: any) => {
        navigation.push(RouteNames.product_detail, {
          id: item._id,
        });
      }} />
    </View > : null
  );
};

const ShopFeaturedProduct = ({ data, onClick }) => {
  return (
    <FlatList
      data={data.slice(0, 6)}
      keyExtractor={item => {
        return item._id.toString();
      }}
      scrollEnabled={false}
      numColumns={3}
      style={{ marginEnd: -2.5 }}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity onPress={() => onClick(item)}
            style={{
              backgroundColor: '#ffffff',
              marginHorizontal: 2.5,
              flex: 1 / 3,
              height: 160,
              borderColor: '#f1f1f1',
              marginTop: 12,
            }}>
            <Image
              source={
                item.images !== ''
                  ? { uri: item.images }
                  : appIcons.shoeImageURL
              } style={{
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
                {item.name}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#ff7600',
                }}>
                {item.price ? item.price : '58'}c.
              </Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const ProductImages = ({ images, onClick }) => {
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
      {images.map((item, index) => (
        <TouchableOpacity
          onPress={() => {
            onClick(index);
          }}
          style={{ paddingBottom: 8 }}>
          <Image
            source={{ uri: item }}
            style={{ width: '100%', height: 385 }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const RelatedProducts = ({ item, onclick }) => {
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
        data={item}
        keyExtractor={item => {
          return item._id.toString();
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
                onclick(item)
              }}>
              <Image
                source={item.images != '' ? { uri: item.images } : appIcons.shoeImageURL}
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
                    fontSize: 13,
                    fontWeight: '500',
                    color: colors.black
                  }}
                  numberOfLines={1}>
                  {item.name ? item.name : 'Футболка'}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row', paddingLeft: 8, paddingTop: 4,
                  justifyContent: 'space-between'
                }}>
                <View style={{ flexDirection: 'row', width: '30%' }}>
                  <Text
                    style={{
                      fontSize: 17,
                      color: '#ff7600',
                      fontWeight: 'bold'
                    }}>
                    {item.price ? item.price : "999"}
                  </Text>
                  <Text
                    style={{
                      paddingTop: 6,
                      color: '#ff7600',
                      fontSize: 11,
                      fontWeight: '400'
                    }}>
                    c.
                  </Text>
                </View>
                <Text
                  numberOfLines={1}
                  style={{
                    color: '#AAAAAA',
                    paddingTop: 3,

                    fontWeight: '400',
                    fontSize: 11
                  }}>
                  {`${item.views}${AppString.views}`}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const ProductDetails = ({ item }) => {


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
            {item.price ? item.price + 'с.' : ''}
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
            {item.strikePrice ? item.strikePrice + 'c.': ''}
          </Text>
        </View>
        <RatingView rating={item.rating ? item.rating : 4} />
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
          {item.productName}
        </Text>
      </View>

      <Text
        style={[
          styles.textStyle,
          {
            fontSize: 13,
            color: colors.grey,
            alignSelf: 'flex-end',
            marginTop: 2,
            paddingBottom: 6,
          },
        ]}>
        {`продано ${item.soldUnits ? item.soldUnits : '15'}`}
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
        width: '70%'
      }}>

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

const CustomDetailHeader = ({navigation}) => {
  return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", backgroundColor: colors.white, padding: 8 }}>
                <BackLogo navigation={navigation} />
                <SearchView />
        
          <TouchableOpacity
            onPress={() => {
              ShareJumu()
            }}
          >
            <Share />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            navigation.navigate(RouteNames.cartScreen)
          }} style={{ alignItems: 'center',}}>
            <CartIcon />
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center'}}>
            <EllipsisHorizontal width={24} height={24} />
          </TouchableOpacity>
        </View>
            
  )
}

export default ProductDetailScreen;
