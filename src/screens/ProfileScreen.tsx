import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '../utils/AppStyles'
import { imagesUrl } from '../utils/AppIcons'
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from '../utils/AppColors';
import { AppString } from '../utils/AppStrings';
import { Card } from 'react-native-paper'
import { LinearGradient } from "expo-linear-gradient";


const ProfileScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}><View style={styles.container}>

      <Profile />
      <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 20, justifyContent: 'space-between' }}>
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
    </View></ScrollView>
  )
}

const MyOrder = () => {

  return <Card style={{ backgroundColor: colors.white, marginTop: 20, padding: 8 }}>
    <View>
      <View style={[styles.profile, { marginTop: undefined, alignItems: 'center' }]}>
        <Text style={[styles.textStyle, { fontSize: 16, fontWeight: 'bold' }]}>{AppString.my_order}</Text>
        <Ionicons name={'chevron-forward-outline'} color={colors.black} size={18} />

      </View>
      <View style={[styles.profile, { marginTop: 20, marginHorizontal: 2 }]}>
        <IconWithText isVisible={true} title={AppString.not_paid} icon='heart-outline' onClick={() => {

        }} />
        <IconWithText isVisible={true} title={AppString.treatment} icon='checkmark-circle-outline' onClick={() => {

        }} />
        <IconWithText isVisible={true} title={AppString.sent} icon='time-outline' onClick={() => {

        }} />
        <IconWithText isVisible={true} title={AppString.review} icon='chatbubble-outline' onClick={() => {

        }} />
        <IconWithText title={AppString.return} icon='arrow-undo-outline' onClick={() => {

        }} />
      </View>
    </View>
  </Card>
}

const Profile = () => {

  return <View style={styles.profile}>
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <Image source={{ uri: imagesUrl.profile }} style={{ height: 58, width: 58, borderRadius: 28 }} />
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={[styles.textStyle, { fontSize: 20, fontWeight: 'bold' }]}>User name</Text>

        <Text style={[styles.textStyle, {}]}>Nickname92</Text>

      </View>
    </View>
    <TouchableOpacity style={{ paddingEnd: 10 }}>
      <Ionicons name={'settings-outline'} color={colors.black} size={26} />
    </TouchableOpacity>
  </View>
}

const IconWithText = ({ title, icon = "image-outline", isVisible = false, onClick }) => {

  return <TouchableOpacity onPress={onClick} style={{ alignItems: "center" }}>
    <Ionicons name={icon} size={36} />
    {isVisible ? <LinearGradient
      colors={["#FF7600", "#FF7600"]}
      start={{ x: 0.4, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ position: 'absolute', borderRadius: 100, end: 6, top: -5 }}
    >
      <Text style={[styles.textStyle, { color: colors.white, padding: 2, paddingHorizontal: 6, fontSize: 10 }]}>1</Text>
    </LinearGradient> : null}
    <Text style={{ fontSize: 13 }}>{title}</Text>
  </TouchableOpacity>

}

export default ProfileScreen

