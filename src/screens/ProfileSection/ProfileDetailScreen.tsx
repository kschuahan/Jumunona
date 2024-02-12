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
      uploadProfilePic(fileModel)

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


  useEffect(() => {
    callAPI()
  }, [])

  const callAPI = () => {
    setdataLoading(true)
    getAPICall(ProfileAPIs.getprofile, (res: any) => {
      setdataLoading(false)
      setData(res)
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
              value={'Valijon'}
              onClick={() => { }}
            />
            <View style={{ height: 1, backgroundColor: colors.darkWhite }} />

            <TextWithIcon
              title={AppString.gender}
              value={'Мужской'}
              onClick={() => { }}
            />
            <View style={{ height: 1, backgroundColor: colors.darkWhite }} />

            <TextWithIcon
              title={AppString.age}
              value={'1992'}
              onClick={() => { }}
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
              value={'150******50'}
              onClick={() => {
                navigation.navigate(RouteNames.viewPhoneNumber, { isMobile: true });
              }}
            />
            <View style={{ height: 1, backgroundColor: colors.darkWhite }} />
            <TextWithIcon
              title={AppString.mail}
              value={'Valijon@gmail.com'}
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
            callAPI();
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
      {loading ? <CenterProgressView /> : null}
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
