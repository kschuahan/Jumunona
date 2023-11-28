import React, { useEffect, useState } from "react"
import { StyleSheet, FlatList, KeyboardAvoidingView, TouchableOpacity, View, Text, TextInput, Pressable, Platform } from "react-native"
import { RouteNames } from "../../utils/RoutesNames"
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "../../utils/AppStyles";
import { AppString } from "../../utils/AppStrings";
import { fontFamilty } from "../../utils/Fonts";
import { colors } from "../../utils/AppColors";
import { LinearGradient } from "expo-linear-gradient";
import { refresh } from "@react-native-community/netinfo";

const DeleteAccount = ({ navigation }) => {

  useEffect(() => {

    navigation.setOptions({
      headerTitle: RouteNames.deleteAccount,
      headerRight: (() => <TouchableOpacity style={{ alignItems: "center" }}>
        <Ionicons name="ellipsis-horizontal-outline" size={24} />
      </TouchableOpacity>),

      headerLeft: () => (
        <TouchableOpacity onPress={() => {
          navigation.goBack()
        }} style={{ alignItems: "center" }}>
          <Ionicons name="chevron-back-outline" size={24} />
        </TouchableOpacity>
      )

    })
  }, [])


  const reaonseArray = [{ title: AppString.need_to_turn_off_your_phone, isSelected: false },
  { title: AppString.need_to_turn_off_email, isSelected: false },
  { title: AppString.security_privacy, isSelected: false },
  { title: AppString.addition_account, isSelected: false },
  { title: AppString.difficulty_with_shopping, isSelected: false },
  { title: AppString.other, isSelected: false }]

  const [reasonString, setReasonString] = useState<String>()
  const [reasonItems, setReasonItems] = useState(reaonseArray)
  const [selectedIndex, setSelectedIndex] = useState<Number>()
  const [isRefreshing, setIsRefreshing] = useState(false)
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container} keyboardVerticalOffset={100}>
      <FlatList
        contentContainerStyle={{justifyContent: "flex-end"}}
        data={reasonItems}
        showsVerticalScrollIndicator = {false}
        renderItem={({ item, index }) => {
          return <ReasonCell
            item={item}
            index={index}
            onSelect={(index) => {
              reasonItems[index].isSelected = !reasonItems[index].isSelected

              if (selectedIndex != undefined) {
                if (selectedIndex == index) {
                  setSelectedIndex(undefined)
                } else {
                  reasonItems[selectedIndex].isSelected = false
                  setSelectedIndex(index)
                }
              } else {
                setSelectedIndex(index)
              }
              setReasonItems(reasonItems)
              setIsRefreshing(!isRefreshing)
              
            }}
          
          />
        }}
        ItemSeparatorComponent={separator}
        ListHeaderComponent={header}
        ListFooterComponent={
          <FooterView
            value={reasonString}
            onChangeText={(text: string) => {
              setReasonString(text)
            }}
            onDelete={ () => {
              navigation.navigate(RouteNames.confirmDeleteAccount)
            }}
          />
        }
      />
    </KeyboardAvoidingView>
  )

}
const header = ({ }) => {
  return (
    <View style={{ backgroundColor: colors.white, borderTopLeftRadius: 13, borderTopRightRadius: 13 }}>
      <Text
        style={[styles.textStyle, { fontFamily: fontFamilty.semibold, fontSize: 20, paddingTop: 25, paddingBottom: 10, paddingHorizontal: 11 }]}
      >
        {AppString.please_select_a_reason}
      </Text>
    </View>
  )
}

const ReasonCell = ({ item, index, onSelect }) => {


  return (
    <Pressable onPress={() => {
      onSelect(index)
    }
    }
    >
      <View
        style={
          { flexDirection: "row", justifyContent: "space-between", paddingVertical: 15, paddingHorizontal: 11, backgroundColor: colors.white }
        }
      >

        <Text
          style={[styles.textStyle,
                {
                  fontFamily: fontFamilty.regular,
                  fontSize: 16
                }]}
        >
          {item.title}
        </Text>
        <Ionicons 
          name={item.isSelected ? "checkmark-circle" : "ellipse-outline"} 
          size={25} 
          color={item.isSelected ? colors.endOrange : "#CECECE"}
         />

      </View>
    </Pressable>
  )
}

const separator = () => {
  return <View style={{ height: 1, backgroundColor: colors.darkWhite }} />
}

const FooterView = ({ value, onChangeText, onDelete }) => {
  return (
    <View style={{}}>
      <TextInput
        style={[styles.textStyle, {
          textAlignVertical: 'top',
          height: 75,
          padding: 8,
          fontFamily: fontFamilty.regular,
          fontSize: 16,
          backgroundColor: colors.white, 
          borderBottomLeftRadius: 13,
          borderBottomRightRadius: 13,
          borderWidth: 1,
          borderColor: colors.endOrange
        }]}
        placeholder={AppString.please_provide_a_reason}
        placeholderTextColor={'grey'}
        value={value}
        multiline={true}
        numberOfLines={5}
        editable={true}
        onChangeText={onChangeText}
      />
      <TouchableOpacity
        onPress={() => {
          onDelete()
        }}
        style={{ paddingTop: 14 }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={["#FE8C00", "#FC4A1A"]}
          style={{
            elevation: 4,
            height: 46,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 23,
          }}
        >
          <Text
            style={{ fontSize: 18, color: "#ffffff", fontFamily: fontFamilty.bold }}
          >
            {AppString.next_step}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  iconStyle: {
    borderRadius: 12.5
  },
});

export default DeleteAccount

