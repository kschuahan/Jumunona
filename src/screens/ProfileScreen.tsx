import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '../utils/AppStyles'
import { imagesUrl } from '../utils/AppIcons'
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from '../utils/AppColors';
import { AppString } from '../utils/AppStrings';
import { Card } from 'react-native-paper'
import { LinearGradient } from "expo-linear-gradient";
import { dimensions } from '../utils/sizes';
import { RouteNames } from '../utils/RoutesNames';
import { fontFamilty } from '../utils/Fonts';


const ProfileScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>

        <Profile onClick={() => {
          navigation.navigate(RouteNames.setting)
        }} />
        <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 30, justifyContent: 'space-between' }}>
          <IconWithText title={AppString.want_to} icon='heart-outline' onClick={() => {

          }} />
          <IconWithText title={AppString.subscription} icon='checkmark-circle-outline' onClick={() => {

          }} />
          <IconWithText title={AppString.story} icon='time-outline' onClick={() => {

          }} />
          <IconWithText title={AppString.wallet} icon='terminal-outline' onClick={() => {

          }} />

        </View>

        <MyOrder />
        <View style={{
          backgroundColor: colors.white, marginTop: 10, padding: 8,
          paddingVertical: 20, borderRadius: 13
        }}>
          <View style={[styles.profile, { marginTop: undefined, marginHorizontal: 15 }]}>

            <IconWithText iconColor={colors.lightRed} title={AppString.address} icon='location-outline' onClick={() => {

            }} />
            <IconWithText size={21} iconColor={colors.lightRed} title={AppString.body} icon='checkmark-circle-outline' onClick={() => {

            }} />
            <IconWithText size={21} iconColor={colors.lightRed} title={AppString.team} icon='person-outline' onClick={() => {

            }} />
            <IconWithText size={21} iconColor={colors.lightRed} title={AppString.reviews} icon='chatbubble-outline' onClick={() => {

            }} />
            <IconWithText size={21} iconColor={colors.lightRed} title={AppString.help} icon='help-circle-outline' onClick={() => {

            }} />
          </View>
        </View>

        <View style={{
          backgroundColor: colors.white, borderRadius: 13,
          padding: 8, paddingBottom: 10, position: 'absolute', bottom: 10, width: dimensions.width - 12, marginHorizontal: 6
        }}>
          <Text style={[styles.textStyle, { fontSize: 13, fontWeight: '500', marginBottom: 20 }]}>{AppString.status_of_order}</Text>

          <ProfileProduct title='Отзыв' time='' subTitle='Ожидает оценки' buttonText={AppString.write} />

        </View>
      </View></ScrollView>
  )
}

const MyOrder = () => {

  return <View style={{ backgroundColor: colors.white, marginTop: 10, padding: 8, borderRadius: 13, }}>
    <View>
      <View style={[styles.profile, { marginTop: undefined, alignItems: 'center' }]}>
        <Text style={[styles.textStyle, { fontSize: 16, fontWeight: '600' }]}>{AppString.my_order}</Text>
        <Ionicons name={'chevron-forward-outline'} color={colors.black} size={18} />

      </View>
      <View style={[styles.profile, { marginTop: 20, marginHorizontal: 2, marginBottom: 20 }]}>
        <IconWithText end={12} isVisible={true} title={AppString.not_paid} icon='heart-outline' onClick={() => {

        }} />
        <IconWithText end={12} isVisible={true} title={AppString.treatment} icon='checkmark-circle-outline' onClick={() => {

        }} />
        <IconWithText end={12} isVisible={true} title={AppString.sent} icon='time-outline' onClick={() => {

        }} />
        <IconWithText end={-2} isVisible={true} title={AppString.review} icon='chatbubble-outline' onClick={() => {

        }} />
        <IconWithText title={AppString.return} icon='arrow-undo-outline' onClick={() => {

        }} />
      </View>
      <View style={{ marginBottom: 10 }}>
        <ProfileProduct />
      </View>
    </View>
  </View>
}



const ProfileProduct = ({ title = 'Ожидает оплаты', subTitle = AppString.left, time = "23 : 50 : 33", buttonText = AppString.pay }) => {

  return (
    <View style={styles.profileProduct}>
      <View
        style={{ flexDirection: "row", width: "60%", alignItems: "center" }}
      >
        <Image
          source={{ uri: imagesUrl.profile }}
          style={{ height: 44, width: 44, borderRadius: 8 }}
        />
        <View style={{ marginStart: 10 }}>
          <Text
            style={[
              styles.textStyle,
              { fontSize: 13, fontWeight: "500", fontFamily: "SegoeUI" },
            ]}
          >
            {title}
          </Text>
          <Text
            style={[
              styles.textStyle,
              { color: colors.lightOrange, fontFamily: fontFamilty.regular },
            ]}
          >
            {time}{" "}
            <Text style={[styles.textStyle, { color: colors.grey }]}>
              {subTitle}
            </Text>
          </Text>
        </View>
      </View>
      <CommonButton text={buttonText} onClick={() => { }} />
    </View>
  );
}


const CommonButton = ({ text = AppString.pay, endColor = colors.endOrange,
  startorange = colors.startOrange, onClick }) => {

  return (
    <TouchableOpacity onPress={onClick}>
      <LinearGradient
        colors={[startorange, endColor]}
        start={{ x: 0.4, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          padding: 10,
          paddingVertical: 6,
          borderRadius: 1000,
          marginEnd: 10,
        }}
      >
        <Text
          style={[
            styles.textStyle,
            { color: colors.white, fontFamily: "SegoeUI" },
          ]}
        >
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const Profile = ({ onClick }) => {

  return (
    <View style={styles.profile}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: imagesUrl.profile }}
          style={{ height: 70, width: 70, borderRadius: 35, marginStart: 9 }}
        />
        <View style={{ paddingHorizontal: 20, gap: 4 }}>
          <Text
            style={[
              styles.textStyle,
              { fontSize: 21, fontFamily: fontFamilty.bold },
            ]}
          >
            User name
          </Text>

          <Text
            style={[
              styles.textStyle,
              { color: colors.grey, fontSize: 13, fontFamily: fontFamilty.regular },
            ]}
          >
            Nickname92
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={onClick} style={{ paddingEnd: 9 }}>
        <Ionicons name={"settings-outline"} color={colors.black} size={22} />
      </TouchableOpacity>
    </View>
  );
}

const IconWithText = ({ title, icon = "image-outline", isVisible = false, onClick, iconColor = colors.black, size = 22.63, end = 6 }) => {

  return (
    <TouchableOpacity onPress={onClick} style={{ alignItems: "center", gap: 4 }}>
      <Ionicons name={icon} color={iconColor} size={size} />
      {isVisible ? (
        <LinearGradient
          colors={["#FF7600", "#FF7600"]}
          start={{ x: 0.4, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ position: "absolute", borderRadius: 200, end: end, top: -5, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text
            style={[
              styles.textStyle,
              {
                color: colors.white,
                padding: 3,
                paddingHorizontal: 6,
                fontSize: 10,
                fontFamily: fontFamilty.regular,
              },
            ]}
          >
            1
          </Text>
        </LinearGradient>
      ) : null}
      <Text style={{ fontSize: 13, fontFamily: "SegoeUI" }}>{title}</Text>
    </TouchableOpacity>
  );

}

export default ProfileScreen

