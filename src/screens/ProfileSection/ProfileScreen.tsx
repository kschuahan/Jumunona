import { Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from '../../utils/AppStyles';
import { imagesUrl } from '../../utils/AppIcons';
import { colors } from '../../utils/AppColors';
import { AppString } from '../../utils/AppStrings';
import LinearGradient from 'react-native-linear-gradient';
import { dimensions } from '../../utils/sizes';
import { RouteNames } from '../../utils/RouteNames';
import { fontFamily } from '../../utils/Fonts';
import ChevronFwdOutlineIcon from '../../../assets/Icons/ForwardBlack.svg';
import heartOutlineIcon from '../../../assets/Icons/heartOutline.svg';
import checkmarkCircleOutlineIcon from '../../../assets/Icons/checkMarkCircle.svg';
import timeOutlineIcon from '../../../assets/Icons/timeOutine.svg';
import terminalOutlineIcon from '../../../assets/Icons/terminalOutline.svg';
import locationOutlineIcon from '../../../assets/Icons/locationOutline.svg';
import personOutlineIcon from '../../../assets/Icons/myAccount.svg';
import chatBubbleOutlineIcon from '../../../assets/Icons/chatbubbleEllipsisIcon.svg';
import helpCircleOutlineIcon from '../../../assets/Icons/helpCircleOutline.svg';
import recycleIcon from '../../../assets/Icons/recycle.svg';
import arrowUndoOutline from '../../../assets/Icons/arrowUndoOutline.svg';
import SettingsOutlineIcon from '../../../assets/Icons/settingsOutline.svg';
import Heart from '../../../assets/Icons/Heart.svg';
import Wallet from '../../../assets/Icons/Wallet.svg';
import { SvgUri } from 'react-native-svg';
import Review from '../../../assets/Icons/Review.svg';
import Treatment from '../../../assets/Icons/Treatment.svg';
import Sent from '../../../assets/Icons/Sent.svg';
import NotPaid from '../../../assets/Icons/NotPaid.svg';
import Body from '../../../assets/Icons/Body.svg';
import Address from '../../../assets/Icons/Address.svg';
import help from '../../../assets/Icons/Help.svg';
import Team from '../../../assets/Icons/Team.svg';
import Reviews from '../../../assets/Icons/Reviews.svg';
import { getAPICall } from '../../Netowork/Apis';
import { ProfileAPIs, reloadData } from '../../Netowork/Constants';
import { CommonModal } from '../HomeScreen';
import { ProgressView, RetryWhenErrorOccur } from '../../components/Dialogs';
import { localeData } from 'moment';
import { useIsFocused } from '@react-navigation/native';

const ProfileScreen = (props: any) => {
  const navigation = props.navigation

  const [data, setData] = useState<CommonModal>();
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused()


  useEffect(() => {
    if (reloadData.profileRefresh) {
      setData(undefined)
      reloadData.profileRefresh = false
      callAPI()
    }
  }, [isFocused])



  useEffect(() => {
    callAPI()
  }, [])


  const callAPI = () => {
    setLoading(true)
    getAPICall(ProfileAPIs.getprofile, (res: any) => {
      setLoading(false)
      setData(res)
    })
  }


  return (
    data && data.isSuccess ? <ScrollView
      contentContainerStyle={{ flex: 1 }}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>

        <Profile
          data={data.data.data}
          onClick={() => {
            props.navigation.navigate(RouteNames.setting);
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 23.25,
            marginHorizontal: 30,
            justifyContent: 'space-between',
          }}>
          <IconWithText
            SvgSource={Heart}
            width={21}
            height={21}
            title={AppString.want_to}
            onPress={() => {
              props.navigation.navigate(RouteNames.favorite);
            }}
            gap={4}
          />
          <IconWithText
            SvgSource={checkmarkCircleOutlineIcon}
            width={21}
            height={21}
            title={AppString.subscription}
            onPress={() => { navigation.navigate(RouteNames.subscribers_screen) }}
            gap={4}

          />
          <IconWithText
            SvgSource={timeOutlineIcon}
            width={21}
            height={21}
            title={AppString.story}
            onPress={() => {
              navigation.navigate(RouteNames.historyScreen)
            }}
            gap={4}

          />
          <IconWithText
            SvgSource={Wallet}
            width={21}
            height={21}
            title={AppString.wallet}
            onPress={() => {
              navigation.navigate(RouteNames.walletScreen)
            }}
            gap={4}

          />
        </View>

        <MyOrder navigation={navigation} />
        <View
          style={{
            backgroundColor: colors.white,
            marginTop: 9,
            padding: 8,
            paddingVertical: 20,
            borderRadius: 13,
          }}>
          <View
            style={[
              styles.profile,
              { marginTop: undefined, marginHorizontal: 15 },
            ]}>
            <IconWithText
              SvgSource={Address}
              width={21}
              height={21}
              color={colors.lightRed}
              title={AppString.address}
              onPress={() => {
                navigation.navigate(RouteNames.myAddress)
              }}
              gap={6}
            />
            <IconWithText
              SvgSource={Body}
              width={21}
              height={21}
              color={colors.lightRed}
              title={AppString.body}
              onPress={() => {

                props.navigation.navigate(RouteNames.bodyData)
              }}
              gap={6}

            />
            <IconWithText
              SvgSource={Team}
              width={21}
              height={21}
              color={colors.lightRed}
              title={AppString.team}
              onPress={() => { }}
              gap={6}

            />
            <IconWithText
              SvgSource={Reviews}
              width={21}
              height={21}
              color={colors.lightRed}
              title={AppString.reviews}
              onPress={() => {
                props.navigation.navigate(RouteNames.myReviews);
              }}
              gap={6}

            />
            <IconWithText
              SvgSource={help}
              width={21}
              height={21}
              color={colors.lightRed}
              title={AppString.help}
              onPress={() => {
                navigation.navigate(RouteNames.help_and_feedback)

              }}
              gap={6}

            />
          </View>
        </View>

        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: 13,
            padding: 8,
            paddingBottom: 17,
            position: 'absolute',
            bottom: 16,
            width: Dimensions.get('window').width - 12,
            marginHorizontal: 6,
            paddingStart: 14,
            paddingEnd: 6,
          }}>
          <Text
            style={[
              styles.textStyle,
              {
                fontSize: 13,
                marginStart: 16,
                marginBottom: 20,
                marginTop: -8,
                color: colors.black141414,
                fontWeight: '500',
                fontFamily: undefined,
              },
            ]}>
            {AppString.status_of_order}
          </Text>

          <ProfileProduct
            title="Отзыв"
            time=""
            subTitle="Ожидает оценки"
            buttonText={AppString.write}
            onClick={() => {
              navigation.navigate(RouteNames.review)
            }}
          />
        </View>
      </View>
    </ScrollView>
      : loading ? (
        <ProgressView />
      ) : (
        <RetryWhenErrorOccur
          data={data}
          onClick={() => {
            setData(undefined);
            callAPI();
          }}
        />
      )
  );
};

const MyOrder = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: colors.white,
        marginTop: 10.5,
        padding: 8,
        paddingTop: 4,
        borderRadius: 13,
      }}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(RouteNames.myOrder, { type: 'Все' })

          }}
          style={[
            styles.profile,
            { marginTop: 5, alignItems: 'center', marginStart: 12 },
          ]}>
          <Text style={[styles.textStyle, { fontSize: 15, fontWeight: '500' }]}>
            {AppString.my_order}
          </Text>
          <ChevronFwdOutlineIcon color={colors.black} width={12} height={12} />
        </TouchableOpacity>
        <View
          style={[
            styles.profile,
            { marginTop: 18.89, marginHorizontal: 2, marginBottom: 15 },
          ]}>
          <IconWithText
            SvgSource={NotPaid}
            end={12}
            isVisible={true}
            color={colors.balc111111}
            title={AppString.not_paid}
            onPress={() => {
              navigation.navigate(RouteNames.myOrder, { type: AppString.not_paid })
            }}
            width={21}
            height={21}
            gap={3}
          />
          <IconWithText
            SvgSource={Treatment}
            end={12}
            isVisible={true}
            color={colors.balc111111}
            title={AppString.processing}
            onPress={() => {
              navigation.navigate(RouteNames.myOrder, { type: AppString.processing })

            }}
            width={21}
            height={21}
            gap={4}

          />
          <IconWithText
            SvgSource={Sent}
            width={21}
            height={21}
            isVisible={true}
            color={colors.balc111111}
            title={AppString.sent}
            onPress={() => {
              navigation.navigate(RouteNames.myOrder, { type: AppString.sent })

            }}
            gap={4}

          />
          <IconWithText
            SvgSource={Review}
            end={-2}
            isVisible={true}
            color={colors.balc111111}
            title={AppString.review}
            onPress={() => {
              navigation.navigate(RouteNames.myOrder, { type: AppString.review })

            }}
            width={21}
            height={21}
            gap={4}

          />
          <IconWithText
            SvgSource={arrowUndoOutline}
            title={AppString.return}
            color={colors.balc111111}
            width={21}
            height={21}
            onPress={() => {
              navigation.navigate(RouteNames.return_exchange)

            }}
            gap={4}

          />
        </View>
        <View style={{ marginBottom: 8, marginHorizontal: 1 }}>
          <ProfileProduct onClick={() => {
            navigation.navigate(RouteNames.cartConfirmOrder)

          }} />
        </View>
      </View>
    </View>
  );
};

const ProfileProduct = ({
  title = 'Ожидает оплаты',
  subTitle = AppString.left,
  time = '23 : 50 : 33',
  buttonText = AppString.pay,
  onClick
}) => {
  return (
    <View style={styles.profileProduct}>
      <View style={{ flexDirection: 'row', width: '60%', alignItems: 'center' }}>
        <Image
          source={{ uri: imagesUrl.shoes }}
          style={{ height: 44, width: 44, borderRadius: 8 }}
        />
        <View style={{ marginStart: 10 }}>
          <Text
            style={[
              styles.textStyle,
              { fontSize: 13, fontWeight: '500', fontFamily: fontFamily.regular },
            ]}>
            {title}
          </Text>
          <Text
            style={[
              styles.textStyle,
              { color: colors.lightOrange, fontFamily: fontFamily.regular },
            ]}>
            {time}{' '}
            <Text style={[styles.textStyle, { color: colors.grey }]}>
              {subTitle}
            </Text>
          </Text>
        </View>
      </View>
      <CommonButton text={buttonText} onClick={onClick} />
    </View>
  );
};

const CommonButton = ({
  text = AppString.pay,
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
          paddingStart: 9.5,
          paddingEnd: 5.01,
          paddingVertical: 6,
          borderRadius: 1000,
          height: 28,
          marginEnd: 10,
        }}>
        <Text
          style={[
            styles.textStyle,
            { color: colors.white, fontFamily: fontFamily.regular },
          ]}>
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const Profile = ({ data, onClick }) => {
  return (
    <View style={styles.profile}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{ uri: data.profileImage ? data.profileImage : imagesUrl.profile }}
          style={{ height: 70, width: 70, borderRadius: 35, marginStart: 9 }}
        />
        <View style={{ paddingHorizontal: 20, gap: 4 }}>
          {data ? <Text
            style={[
              styles.textStyle,
              { fontSize: 21, fontFamily: fontFamily.bold },
            ]}>
            {data.userName ? data.userName : 'User name'}
          </Text> : null}

          <Text
            style={[
              styles.textStyle,
              {
                color: colors.grey,
                fontSize: 14,
                fontFamily: fontFamily.regular,
              },
            ]}>
            Nickname92
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={onClick} style={{ paddingEnd: 9 }}>
        <SettingsOutlineIcon color={colors.black} width={22} height={22} />
      </TouchableOpacity>
    </View>
  );
};

const IconWithText = ({
  title,
  SvgSource = recycleIcon,
  width = 21,
  height = 21,
  isVisible = false,
  onPress,
  color = colors.black,
  end = 6,
  gap = 9.5
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ alignItems: 'center', gap: gap }}>
      <SvgSource height={height} width={width} color={color} />
      {isVisible ? (
        <LinearGradient
          colors={['#FF7600', '#FF7600']}
          start={{ x: 0.4, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: 'absolute',
            borderRadius: 200,
            end: end,
            top: -5,

            justifyContent: 'center',
            alignItems: 'center',

          }}>
          <Text
            style={[
              styles.textStyle,
              {
                color: colors.white,
                padding: 3,
                paddingHorizontal: 6,
                fontSize: 10,
                fontFamily: fontFamily.regular,
              },
            ]}>
            1
          </Text>
        </LinearGradient>
      ) : null}
      <Text style={{ fontSize: 13, color: colors.black, fontFamily: fontFamily.regular }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ProfileScreen;
