import {Modal, View, Text, TouchableOpacity, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppString} from '../../utils/AppStrings';
import {styles} from '../../utils/AppStyles';
import {colors} from '../../utils/AppColors';
import {fontFamily} from '../../utils/Fonts';

const charachterList = [
  {title: 'Версия', subTitle: 'Обтягивающая'},
  {title: 'Плечевые лямки', subTitle: 'Несъемные'},
  {title: 'Эластичность', subTitle: 'Низкая'},
  {title: 'Основной состав ткани', subTitle: 'Хлопок'},
  {title: 'Color', subTitle: 'Red Blue'},
  {title: 'Sleeve Type', subTitle: 'Conventional'},
  {title: '细分风格', subTitle: '湖'},
  {title: '基础风格', subTitle: '青春流行'},
  {title: '适用季节', subTitle: '秋季'},
  {title: '厚薄', subTitle: '常规'},
  {title: '适用场景', subTitle: '休闲'},
  {title: '版型', subTitle: '宽松型'},
  {title: '服饰工艺', subTitle: '水洗'},
];
const CharacterSticsScreen = ({isShow = false, onClose}) => {
  return (
    <Modal
      transparent={true}
      animationType={'slide'}
      visible={isShow}
      onRequestClose={onClose}>
      <View
        style={[
          styles.botton_view,
          {backgroundColor: 'rgba(0, 0,0, .7 )', justifyContent: 'flex-end'},
        ]}>
        <View
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
                marginVertical: 10,
                color: colors.black262626,
              },
            ]}>
            {AppString.charachterStics}
          </Text>

          <FlatList
            style={{marginBottom: 60}}
            data={charachterList}
            keyExtractor={item => {
              return item.title.toString();
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View>
                <View style={{flexDirection: 'row', paddingVertical: 16}}>
                  <Text
                    style={[
                      styles.textStyle,
                      {fontSize: 14, color: colors.grey9D9D9D, flex: 0.5},
                    ]}>
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        fontSize: 14,
                        color: colors.blacl5B5B5B,
                        flex: 0.5,
                      },
                    ]}>
                    {item.subTitle}
                  </Text>
                </View>

                <Separator />
              </View>
            )}
          />
          <CommonButton onClick={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const Separator = () => {
  return <View style={{height: 1, backgroundColor: colors.darkWhite}} />;
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
      style={{position: 'absolute', width: '100%', start: 16, bottom: 10}}>
      <LinearGradient
        colors={[startorange, endColor]}
        start={{x: 0.4, y: 0}}
        end={{x: 1, y: 1}}
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
            {color: colors.white, fontFamily: fontFamily.regular, fontSize: 14},
          ]}>
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CharacterSticsScreen;
