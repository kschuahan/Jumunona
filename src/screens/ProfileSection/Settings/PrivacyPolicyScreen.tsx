import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../../../utils/AppStyles';
import { fontFamily } from '../../../utils/Fonts';
import { colors } from '../../../utils/AppColors';
import { useEffect, useState } from 'react';
import { AppString } from '../../../utils/AppStrings';
import EllipsisHorizontal from '../../../../assets/Icons/ellipsis-horizontal.svg';
import ChevronBackOutline from '../../../../assets/Icons/chevronBackOutline.svg';
import { CustomHeader } from '../../../components/Header';
import { getAPICall } from '../../../Netowork/Apis';
import { otherModule } from '../../../Netowork/Constants';
import { CommonModal } from '../../HomeScreen';
import { ProgressView, RetryWhenErrorOccur } from '../../../components/Dialogs';

const PrivacyPolicyScreen = ({ navigation }) => {


  const [data, setData] = useState<CommonModal>()


  const [loading, setLoading] = useState(false)



  useEffect(() => {
    callAPI()
  }, []);



  const callAPI = () => {
    setLoading(true)
    getAPICall(otherModule.getPrivacyPolicy, (res: any) => {
      setLoading(false)
      setData(res)
    })
  }


  return (
    <View style={[styles.container, { padding: 0, backgroundColor: colors.lightBlue }]}>
      <CustomHeader navigation={navigation} title={AppString.privacy_policy} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.container, { backgroundColor: colors.lightBlue, paddingTop: 6 }]}>
          <Text
            style={[
              styles.textStyle,
              {
                fontFamily: fontFamily.bold,
                color: '#2649AA',
                fontSize: 20,
                paddingBottom: 16,
                textAlign: 'center',
              },
            ]}>
            Политика конфиденциальности {'\n'} Jumunona
          </Text>
          <View
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 13,
            }}>
            {data && data.isSuccess ? <Text style={[styles.textStyle, { color: '#666666', fontSize: 14 }]}>
              {data.data.data}
            </Text> : loading ? <ProgressView /> : <RetryWhenErrorOccur data={data} onClick={() => {
              setData(undefined)
              callAPI()
            }} />}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicyScreen;
