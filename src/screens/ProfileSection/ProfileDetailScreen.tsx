import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from '../../utils/AppStyles';
import { imagesUrl } from '../../utils/AppIcons';
import { colors } from '../../utils/AppColors';
import { AppString } from '../../utils/AppStrings';
import { RouteNames } from '../../utils/RouteNames';
import { fontFamily } from '../../utils/Fonts';
import EllipsisHorizontal from '../../../assets/Icons/ellipsis-horizontal.svg';
import ChevronBackOutline from '../../../assets/Icons/chevronBackOutline.svg';
import ChevronFwdOutlineIcon from '../../../assets/Icons/chevronForwardOutline.svg';
import { CustomHeader } from '../../components/Header';
import { CenterProgressView, ProgressView, RetryWhenErrorOccur, UploadImage } from '../../components/Dialogs';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { FileModal, cameraLaunch, selectFile } from '../../utils/FileUpload';
import { getAPICall, postMultipartData } from '../../Netowork/Apis';
import { ProfileAPIs } from '../../Netowork/Constants';
import { CommonModal } from '../HomeScreen';
import { apiGenderOption, genderOptions } from './EditProfileDetailScreen';
import { useIsFocused } from '@react-navigation/native';

const ProfileDetailScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: RouteNames.setting,
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



  const [updateProfilePic, setUpdateProfilePic] = useState(false)
  const [profileData, setProfileData] = useState<any>()
  
  const [loading, setLoading] = useState(false);
  /***
       * this is for Camera, Gallery, And PDF response handler
       */
  const responseHandling = (success: boolean, response: any) => {
    if (success) {

      const fileModel = new FileModal(response.fileName,
        "image",
        response.uri)
      console.log(fileModel)
    }
  }


  const uploadProfilePic = (file: FileModal) => {
    console.warn("hwehrwe")
    setLoading(true)
    postMultipartData(file, {}, ProfileAPIs.uploadProfilePic, true, (res: any) => {
      console.log("res,", res)
      setLoading(false)
    }).catch((error: any) => {
      setLoading(false)
      console.log("error,", error)
    })
  }

  const [data, setData] = useState<CommonModal>();
  const [loadingData, setdataLoading] = useState(false);

  const isFocused = useIsFocused()
  useEffect(() => {
    if (isFocused) {
      getProfile()
    }
  }, [isFocused])

  const getProfile = () => {
    setdataLoading(true)
    getAPICall(ProfileAPIs.getprofile, (res: any) => {
      setdataLoading(false)
       if (res.isSuccess && res.data.data) {

     
          let gender = res.data.data.gender ?? ""
          if (gender.length > 0) {
            let index = apiGenderOption.findIndex(element => element == gender)
            if (index >= 0 && index < genderOptions.length) {
              res.data.data.gender = genderOptions[index]
            } 
          }
        setProfileData(res.data.data)
        setData(res)
      } 
     
       
     
      console.log("getProfile", res)
    })
  }

  return (
    <View style={[styles.container, { padding: 0 }]}>
      <CustomHeader navigation={navigation} title={AppString.profile} />

      {data && data.isSuccess ? <ScrollView
        contentContainerStyle={{ flex: 1 }}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.container, { paddingTop: 5 }]}>
          <UserAvatar data={data.data.data} onProfileClick={() => { setUpdateProfilePic(true) }} />
          <View
            style={{
              backgroundColor: colors.white,
              paddingHorizontal: 3,
              marginTop: 10,
              borderRadius: 13,
              paddingBottom: 1.16,
            }}>
            <TextWithIcon
              title={AppString.name}
              value={profileData.userName.toString().trim().length > 0 ? profileData.userName : AppString.add_name}
              onClick={() => { 
                navigation.navigate(RouteNames.editProfileDetailScreen, {profileData: profileData})
              }}
            />
            <View style={{ height: 1, backgroundColor: colors.darkWhite }} />

            <TextWithIcon
              title={AppString.gender}
              value={profileData.gender.toString().trim().length > 0 ? profileData.gender : AppString.add_gender}
              onClick={() => { 
                navigation.navigate(RouteNames.editProfileDetailScreen, {profileData: profileData})
              }}
            />
            <View style={{ height: 1, backgroundColor: colors.darkWhite }} />

            <TextWithIcon
              title={AppString.age}
              value= {profileData.dob.toString().trim().length > 0 ? profileData.dob : AppString.add_dob}
              onClick={() => { 
                navigation.navigate(RouteNames.editProfileDetailScreen, {profileData: profileData})
              }}
            />
          </View>

          <View
            style={{
              backgroundColor: colors.white,
              paddingBottom: 4,
              paddingHorizontal: 3,
              marginTop: 10,
              borderRadius: 13,
            }}>
            <TextWithIcon
              title={AppString.number}
              value={profileData.phone}
              onClick={() => {
                navigation.navigate(RouteNames.viewPhoneNumber, { isMobile: true });
              }}
            />
            <View style={{ height: 1, backgroundColor: colors.darkWhite }} />
            <TextWithIcon
              title={AppString.mail}
              value={profileData.email.toString().trim().length > 0 ? profileData.email : AppString.add_email}
              onClick={() => {
                navigation.navigate(RouteNames.viewPhoneNumber, {
                  isMobile: false,
                });
              }}
            />
            <View style={{ height: 1, backgroundColor: colors.darkWhite }} />
            <TextWithIcon
              title={AppString.change_password}
              onClick={() => {
                navigation.navigate(RouteNames.changePassword);
              }}
            />
          </View>

          <View
            style={{
              backgroundColor: colors.white,
              paddingTop: 10,
              paddingBottom: 10,
              marginTop: 10,
              borderRadius: 13,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(RouteNames.deleteAccount);
              }}
              style={[
                styles.profile,
                {
                  marginTop: undefined,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 4,
                },
              ]}>
              <Text
                style={[
                  styles.textStyle,
                  { fontSize: 16, fontFamily: undefined, fontWeight: '400' },
                ]}>
                {AppString.delete_account}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView> : loadingData ? (
        <ProgressView />
      ) : (
        <RetryWhenErrorOccur
          data={data}
          onClick={() => {
            setData(undefined);
            getProfile();
          }}
        />
      )}
      <UploadImage isShow={updateProfilePic} camera={() => {

        setTimeout(() => {
          cameraLaunch(true, responseHandling)
        }, 1000)
        setUpdateProfilePic(false)

      }} library={() => {

        setTimeout(() => {
          selectFile(true, responseHandling)
        }, 1000)
        setUpdateProfilePic(false)

      }} onCancel={() => {
        setUpdateProfilePic(false)

      }} />
       <CenterProgressView isShow={loading} /> 
    </View>

  );
};

const UserAvatar = ({data, onProfileClick }) => {
  return (
    <View style={{ borderRadius: 13, backgroundColor: colors.white }}>
      <View style={[style.userAvatar]}>
        <TouchableOpacity
          onPress={() => {
            onProfileClick()
          }}
        >
          <Image
            source={{ uri: imagesUrl.profile }}
            style={{ height: 111, width: 111, borderRadius: 56 }}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.textStyle,
            {
              fontSize: 15,
              fontFamily: fontFamily.regular,
              paddingTop: 10,
              paddingBottom: 14,
              color: colors.lightOrange,
            },
          ]}>
           {data && data.userName ? data.userName : 'User name'}
        </Text>
      </View>
    </View>
  );
};

const TextWithIcon = ({ title = AppString.address, value = '', onClick }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        styles.profile,
        {
          marginTop: undefined,
          alignItems: 'center',
          paddingStart: 17,
          paddingEnd: 16.96,
          paddingBottom: 10.84,
          paddingTop: 15,
        },
      ]}>
      <Text
        style={[
          styles.textStyle,
          { fontSize: 14, fontWeight: '500', color: colors.black121212 },
        ]}>
        {title}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 6
        }}>
        <Text
          style={[
            styles.textStyle,
            {
              fontSize: 14,
              fontWeight: '500',
              color: colors.grey888888,
              paddingEnd: 4,
            },
          ]}>
          {value}
        </Text>
        <ChevronFwdOutlineIcon
          color={colors.greyCCCCCC}
          width={12}
          height={12}
        />
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  userAvatar: {
    flexDirection: 'column',
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileDetailScreen;
