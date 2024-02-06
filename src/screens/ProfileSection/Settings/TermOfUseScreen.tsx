import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { styles } from '../../../utils/AppStyles';
import { fontFamily } from '../../../utils/Fonts';
import { colors } from '../../../utils/AppColors';
import { useEffect, useState } from 'react';
import { AppString } from '../../../utils/AppStrings';

import EllipsisHorizontal from '../../../../assets/Icons/ellipsis-horizontal.svg';
import ChevronBackOutline from '../../../../assets/Icons/chevronBackOutline.svg';
import { CustomHeader } from '../../../components/Header';
import { dimensions } from '../../../utils/sizes';
import RenderHtml from 'react-native-render-html';
import { getAPICall } from '../../../Netowork/Apis';
import { categoriesModule, otherModule } from '../../../Netowork/Constants';
import { CommonModal } from '../../HomeScreen';
import { ProgressView, RetryWhenErrorOccur } from '../../../components/Dialogs';

const TermOfUseScreen = ({ navigation }) => {


  const [data, setData] = useState<CommonModal>()


  const [loading, setLoading] = useState(false)



  useEffect(() => {
    callAPI()
  }, []);



  const callAPI = () => {
    setLoading(true)
    getAPICall(otherModule.getTermsCondition, (res: any) => {
      setLoading(false)
      setData(res)
    })
  }



  return (
    <View style={[styles.container, { padding: 0, backgroundColor: colors.lightBlue }]}>
      <CustomHeader navigation={navigation} title={AppString.term_of_use} />
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
              },
            ]}>
            Публичная оферта об оказании услуг по продаже товаров путём мобильной
            приложении Jumunona
          </Text>
          <View
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 13,
              flex: 1
            }}>
            {data && data.isSuccess ? <Text style={[styles.textStyle,
            { color: '#666666', fontSize: 14 }]}>
              {data.data.data}
            </Text> : loading ? <ProgressView /> :
              <RetryWhenErrorOccur data={data} onClick={() => {
                setData(undefined)
                callAPI()
              }} />}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TermOfUseScreen;
