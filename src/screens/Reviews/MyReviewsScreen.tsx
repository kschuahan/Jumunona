import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../../utils/AppStyles';
import { colors } from '../../utils/AppColors';
import { AppString } from '../../utils/AppStrings';
import { imagesUrl } from '../../utils/AppIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import EllipsisHorizontal from '../../../assets/Icons/ellipsis-horizontal.svg';
import ChevronBackOutline from '../../../assets/Icons/chevronBackOutline.svg';
import { fontFamily } from '../../utils/Fonts';
import { RouteNames } from '../../utils/RouteNames';
import { CustomHeader } from '../../components/Header';

const MyReviewsScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: AppString.my_reviews,
      headerRight: () => (
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <EllipsisHorizontal width={24} height={24} />
        </TouchableOpacity>
      ),

      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ alignItems: 'center' }}>
          <ChevronBackOutline width={15} height={15} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const [reviewList, setReviewList] = useState([0, 0, 0, 0]);
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1 }}>
      <CustomHeader navigation={navigation} title={AppString.my_reviews} />

      <FlatList
        data={reviewList}
        renderItem={item => {
          return <ReviewBox />;
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<FooterView />}
      />
    </SafeAreaView>
  );
};

const ReviewBox = ({ }) => {
  return (
    <View
      style={[
        styles.container,
        {
          borderRadius: 13,
          backgroundColor: colors.white,
          marginHorizontal: 10,
          marginVertical: 4.5,
          padding: undefined,
          paddingHorizontal: 10,
        },
      ]}>
      <Text
        style={[
          styles.textStyle,
          {
            paddingVertical: 13,
            fontSize: 14,
            lineHeight: 17,
          },
        ]}>
        {AppString.review_example}
      </Text>
      <ReviewProduct title="Ожидает оплаты" subTitle="Ожидает оплаты" />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 13,
          paddingBottom: 10,
        }}>
        <Text style={[styles.textStyle, { fontSize: 12, color: '#959595' }]}>
          2022-03-11
        </Text>

        <Text style={[styles.textStyle, { fontSize: 12, color: '#979797' }]}>
          Просмотров 100
        </Text>
      </View>
    </View>
  );
};

const ReviewProduct = ({
  title = 'Product Name',
  subTitle = AppString.left,
  time = '23 : 50 : 33',
}) => {
  return (
    <View style={[style.reviewProduct]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: imagesUrl.shoes }}
          style={{ height: 63, width: 63, borderRadius: 10, margin: 3 }}
        />
        <View
          style={{
            flex: 1,
            alignContent: 'flex-start',
            flexDirection: 'column',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'space-between',
              paddingHorizontal: 7,
              paddingTop: 7,
            }}>
            <Text style={[styles.textStyle, { fontSize: 14 }]}>{title}</Text>

            <Text style={[styles.textStyle, { fontSize: 14 }]}>368с.</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 7,
            }}>
            <Text style={[styles.textStyle, { fontSize: 14, color: '#959595' }]}>
              Light grey; XL
            </Text>

            <Text
              style={[
                styles.textStyle,
                {
                  fontSize: 14,
                  fontFamily: fontFamily.regular,
                  color: '#999999',
                },
              ]}>
              x1
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const FooterView = ({ }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 25,
        paddingBottom: 35,
      }}>
      <View
        style={{
          backgroundColor: '#999999',
          width: 20,
          height: 1.5,
          alignSelf: 'center',
        }}
      />
      <Text
        style={[
          styles.textStyle,
          {
            fontSize: 12,
            fontWeight: '500',
            color: '#999999',
            alignSelf: 'center',
            paddingHorizontal: 4,
          },
        ]}>
        {AppString.reviews_for_last_180_days}
      </Text>
      <View
        style={{
          backgroundColor: '#999999',
          width: 20,
          height: 1.5,
          alignSelf: 'center',
        }}
      />
    </View>
  );
};

export default MyReviewsScreen;

const style = StyleSheet.create({
  reviewProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 13,
  },
});
