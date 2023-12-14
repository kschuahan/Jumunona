import { TouchableOpacity, View, Text, Pressable } from "react-native"
import { RouteNames } from "../../utils/RoutesNames"
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "../../utils/AppStyles";
import { useEffect, useState } from "react";
import { colors } from "../../utils/AppColors";
import { fontFamilty } from "../../utils/Fonts";
import { AppString } from "../../utils/AppStrings";
import { ScrollView } from "react-native-virtualized-view";
import { LinearGradient } from "expo-linear-gradient";
import { FailAccDeletePopup, VerifyDeleteAccountDialog } from "../../components/Dialogs";

const ConfirmDeleteAccount = ({ navigation }) => {

  useEffect(() => {

    navigation.setOptions({
      headerTitle: AppString.deleting_an_account,
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

  const [agreeToTnC, setAgreeToTnC] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showFailurePop, setShowFailurePop] = useState(false)
  return (
    <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
      <TitleDesciptionView title={AppString.by_deleting_you_waive_rights_Title} desc={AppString.by_deleting_you_waive_rights_Desc} />
      <TitleDesciptionView title={AppString.the_following_conditions_must_be_met_Title} desc={AppString.the_following_conditions_must_be_met_Desc} />
      <AgreeTermsVew isSelected={agreeToTnC} onSelect={() => {
        setAgreeToTnC(!agreeToTnC)
      }} />

      <TouchableOpacity
        onPress={() => {
          setShowConfirm(true)
        }}
        style={{ paddingBottom: 100 }}
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
            style={{ fontSize: 16, color: colors.white, fontFamily: "SegoeUIBold" }}
          >
            {AppString.confirm_delete}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <VerifyDeleteAccountDialog
        isShow={showConfirm}
        onConfirm={() => {
          setShowConfirm(false)
          setShowFailurePop(true)
        }} onCancel={() => {
          setShowConfirm(false)
        }} />

      <FailAccDeletePopup
        isShow={showFailurePop}
        onConfirm={() => {
          setShowFailurePop(false)
        }} onCancel={() => {
          setShowFailurePop(false)
        }} />
    </ScrollView>
  )
}

const TitleDesciptionView = ({ title, desc }) => {
  return (
    <View style={{ paddingVertical: 14 }}>
      <Text style={{ fontSize: 16, color: colors.lightOrange, fontFamily: fontFamilty.semibold, paddingBottom: 11 }}>
        {title}
      </Text>
      <View style={{ backgroundColor: colors.white, borderRadius: 13, padding: 10 }}>
        <Text style={{ fontSize: 14, lineHeight: 25, color: colors.grey6C6C6C }} >
          {desc}
        </Text>
      </View>
    </View>
  )
}

const AgreeTermsVew = ({ isSelected, onSelect }) => {
  return (
    <Pressable onPress={onSelect} >
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 12 }}>

        <Ionicons
          name={isSelected ? "checkmark-circle" : "ellipse-outline"}
          size={25}
          color={isSelected ? colors.lightOrange : "#6C6C6C"}
        />
        <Text style={{ fontSize: 14, color: "#6C6C6C", marginStart: 5 }}>
          {AppString.i_have_read_and_agree_to_the_cancellation_terms}
        </Text>
      </View>
    </Pressable>

  )
}
export default ConfirmDeleteAccount