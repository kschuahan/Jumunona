import { Modal, View, Text, TouchableOpacity, FlatList, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppString } from '../../utils/AppStrings';
import { styles } from '../../utils/AppStyles';
import { colors } from '../../utils/AppColors';
import { fontFamily } from '../../utils/Fonts';

const charachterList = [
  { title: 'Версия', subTitle: 'Обтягивающая', ms: 130 },
  { title: 'Плечевые лямки', subTitle: 'Несъемные', ms: 62 },
  { title: 'Эластичность', subTitle: 'Низкая', ms: 83 },
  { title: 'Основной состав ткани', subTitle: 'Хлопок', ms: 16 },
  { title: 'Color', subTitle: 'Red Blue', ms: 51 },
  { title: 'Sleeve Type', subTitle: 'Conventional', ms: 9 },
  { title: '细分风格', subTitle: '湖', ms: 28 },
  { title: '基础风格', subTitle: '青春流行', ms: 28 },
  { title: '适用季节', subTitle: '秋季', ms: 28 },
  { title: '厚薄', subTitle: '常规', ms: 55 },
  { title: '适用场景', subTitle: '休闲', ms: 28 },
  { title: '版型', subTitle: '宽松型', ms: 55 },
  { title: '服饰工艺', subTitle: '水洗', ms: 28 },
];
const CharacterSticsScreen = ({ isShow = false, data, onClose }) => {
  return (
    <Modal
      transparent={true}
      animationType={'slide'}
      visible={isShow}
      onRequestClose={onClose}>
      <Pressable onPress={onClose}
        style={[
          styles.botton_view,
          { backgroundColor: 'rgba(0, 0,0, .7 )', justifyContent: 'flex-end' },
        ]}>
        <Pressable
          style={{
            paddingHorizontal: 10,
            backgroundColor: colors.white,
            borderTopLeftRadius: 13,
            borderTopRightRadius: 13,
            width: '100%',
            flex: 0.8,
          }}>
          <Text
            style={[
              styles.textStyle,
              {
                fontSize: 16,
                alignSelf: 'center',
                marginTop: 22,
                color: colors.black262626,
              },
            ]}>
            {AppString.charachterStics}
          </Text>

          <FlatList
            style={{ marginBottom: 60 }}
            data={data}
            keyExtractor={item => {
              return item.key.toString();
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View>
                <View style={{ flexDirection: 'row', paddingVertical: 12, gap: item.ms ? item.ms : 22 }}>
                  <Text
                    style={[
                      styles.textStyle,
                      { fontSize: 14, color: colors.grey9D9D9D, width:'24%' },
                    ]}>
                    {item.key}
                  </Text>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        fontSize: 14,
                        color: colors.blacl5B5B5B,
                      },
                    ]}>
                    {item.value}
                  </Text>
                </View>

                <Separator />
              </View>
            )}
          />
          <CommonButton onClick={onClose} />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const Separator = () => {
  return <View style={{ height: 1, backgroundColor: colors.darkWhite }} />;
};

const CommonButton = ({
  text = AppString.ok,
  endColor = colors.endOrange,
  startorange = colors.startOrange,
  onClick,
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{ position: 'absolute', width: '100%', start: 16, bottom: 10 }}>
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

export default CharacterSticsScreen;
