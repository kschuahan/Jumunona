import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import { AppString } from '../../utils/AppStrings';
import { styles } from '../../utils/AppStyles';
import { colors } from '../../utils/AppColors';
import { fontFamily } from '../../utils/Fonts';
import { appIcons } from '../../utils/AppIcons';
import LinearGradient from 'react-native-linear-gradient';

interface Guarntees {
  id: number;
  title: string;
  desc: string;
}

const guarantees: Guarntees[] = [
  {
    id: 1,
    title: 'Цена',
    desc: 'Налог включен в стоимость товара',
  },
  {
    id: 2,
    title: 'Доставка',
    desc: 'Бесплатная доставка (23-34 дней) Авиадоставка (5-8 дней)',
  },
  {
    id: 3,
    title: 'Трекинг',
    desc: 'Посылка отслеживается в приложении на странице заказа',
  },
  {
    id: 4,
    title: 'Отмена заказа',
    desc: 'Если вы передумаете, у вас есть 2 часа после оплаты, чтобы отменить заказ',
  },
  {
    id: 5,
    title: 'Возврат',
    desc: 'У вас есть 7 дней на возврат без причины, при соблюдении соответствующих условий',
  },
  {
    id: 6,
    title: 'Возврат средств',
    desc: 'После возврата, деньги будут зачислены на ваш счет в течение 24 часов',
  },
];
const ProuductGuanteeScreen = ({ isShow = false, onClose }) => {
  return (
    <Modal
      transparent={true}
      animationType={'slide'}
      visible={isShow}
      onRequestClose={onClose}>
       <View
        style={[
          styles.botton_view,
          { backgroundColor: 'rgba(0, 0,0, .7 )'},
        ]}>
        <Pressable style={{flex: 0.17, width: "100%"}} onPress={onClose} />
        <View
          style={{
            paddingStart: 13,
            backgroundColor: colors.white,
            borderTopLeftRadius: 13,
            borderTopRightRadius: 13,
            width: '100%',
            flex: 0.83,
          }}
          >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: 20.7,
              marginStart: -50,
              marginBottom: 12,
            }}>
            <Image
              source={appIcons.check}
              style={{
                width: 20,
                height: 20,
                tintColor: '#FF7600',
                marginTop: 4,
                alignSelf: 'center',
              }}
            />
            <Text
              style={[
                styles.textStyle,
                {
                  fontSize: 16,
                  marginLeft: 7,
                  color: colors.black262626,
                },
              ]}>
              {AppString.gurantee_jumunona}
            </Text>
          </View>
          <FlatList
            style = {{height: "70%"}}
            data={guarantees}
            renderItem={({ item }) => (
              <View style={{ marginVertical: 12, marginEnd: 22 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={appIcons.checked}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: '#FF7600',
                      marginTop: 4,
                    }}
                  />
                  <View style={{ marginLeft: 13, flexDirection: 'column' }}>
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          marginTop: 4,
                          fontFamily: fontFamily.bold,
                          fontSize: 15,
                          color: colors.black262626,
                          marginBottom: 7,
                        },
                      ]}>
                      {item.title}
                    </Text>
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          fontSize: 15,
                          color: colors.black262626,
                        },
                      ]}>
                      {item.desc}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
          <CommonButton
            text={'OK'}
            startorange={colors.startOrange}
            endColor={colors.endOrange}
            onClick={onClose}
          />
       </View>
       </View>
    </Modal>
  );
};

const CommonButton = ({
  text,
  endColor = colors.endOrange,
  startorange = colors.startOrange,
  onClick,
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{ marginBottom: 30, marginTop: 20 }}>
      <LinearGradient
        colors={[startorange, endColor]}
        start={{ x: 0.4, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 1000,
          marginEnd: 10,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={[
            styles.textStyle,
            { color: colors.white, fontFamily: fontFamily.regular, fontSize: 14 },
          ]}>
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
export default ProuductGuanteeScreen;
