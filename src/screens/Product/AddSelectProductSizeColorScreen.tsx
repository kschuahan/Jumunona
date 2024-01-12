import {
  Modal,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { AppString } from '../../utils/AppStrings';
import { styles } from '../../utils/AppStyles';
import { imagesUrl } from '../../utils/AppIcons';
import { colors } from '../../utils/AppColors';
import { fontFamily } from '../../utils/Fonts';
import CloseIcon from '../../../assets/Icons/closeIcon.svg';
import ShieldCheckmarkIcon from '../../../assets/Icons/sheildCheckmark.svg';
import Policy from '../../../assets/Icons/Policy.svg';

import ScaleIcon from '../../../assets/Icons/PhoneData.svg';
import AddCircleOutline from '../../../assets/Icons/AddCircle.svg';
import ChevronFwdOutline from '../../../assets/Icons/ForwardOrange.svg';
import ResizeIcon from '../../../assets/Icons/resizeIcon.svg';
import RemoveCircleOutline from '../../../assets/Icons/removeCircleOutline.svg';

const AddSelectProductSizeColorScreen = ({ isShow = false, onClose, onGuranty }) => {
  const [number, setNumber] = useState('');
  const [otp, setOtp] = useState('');

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
            flex: 0.79,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 9,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'space-between',
              }}>
              <Image
                source={{ uri: imagesUrl.shoes }}
                style={{ height: 65, width: 65, borderRadius: 10 }}
              />

              <Text
                style={[
                  styles.textStyle,
                  {
                    fontSize: 21,
                    fontFamily: fontFamily.regular,
                    color: colors.startOrange,
                    marginStart: 11.5,
                  },
                ]}>
                178с.
              </Text>
            </View>
            <TouchableOpacity
              style={{ marginEnd: 7.11, marginTop: 6 }}
              onPress={() => {
                onClose();
              }}>
              <CloseIcon width={15} height={15} />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}>
            <CancelReturnPolicyView onClick={() => { onGuranty() }} />
            <PhoneDataScreen onClick={() => { }} />
            <View
              style={{
                height: 1,
                marginVertical: 13,
                backgroundColor: colors.darkWhite,
              }}
            />

            <ColorOptions />
            <View
              style={{
                height: 1,
                marginVertical: 13,
                backgroundColor: colors.darkWhite,
              }}
            />

            <SizeAndBuyingForView />
            <View
              style={{
                height: 1,
                marginVertical: 10,
                backgroundColor: colors.darkWhite,
              }}
            />
            <QuanityView />


          </ScrollView>

          <View style={{
            width: '100%',
            position: 'absolute',
            bottom: 10,
            start: 10
          }}>
            <CommonButton text={AppString.add} onClick={() => { }} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const CancelReturnPolicyView = ({ onClick }) => {
  return (
    <TouchableOpacity onPress={onClick}
      style={[
        styles.profile,
        {
          marginTop: 6,
          alignItems: 'center',
          paddingVertical: 4,
          paddingHorizontal: 6,
          backgroundColor: '#F6F6F6',
          borderRadius: 8,
          justifyContent: 'flex-start',
        },
      ]}>
      <Policy />
      <Text
        style={[
          styles.textStyle,
          {
            fontSize: 14,
            fontWeight: '400',
            paddingStart: 8,
          },
        ]}>
        Delivery • Return • Price • Order • cancellation
      </Text>
    </TouchableOpacity>
  );
};

const PhoneDataScreen = ({ onClick }) => {
  return (
    <View
      style={[
        styles.profile,
        {
          marginTop: 13,
          alignItems: 'center',
          paddingVertical: 5,
          paddingHorizontal: 6,
          backgroundColor: '#FDF1EC',
          borderRadius: 8,
          justifyContent: 'space-between',
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ScaleIcon />
        <Text
          style={[
            styles.textStyle,
            { fontSize: 14, paddingStart: 4.22, fontWeight: '400' },
          ]}>
          Body data
        </Text>
      </View>
      <ChevronFwdOutline color={colors.startOrange} width={12} height={12} />
    </View>
  );
};

export const ColorOptions = ({ }) => {
  const [selectedColor, setSelectedColor] = useState(1);
  return (
    <View>
      <Text style={[styles.textStyle, { fontSize: 14 }]}>Цвет (2)</Text>

      <FlatList
        data={[1, 2]}
        renderItem={({ item, index }) => (
          <View style={{ marginEnd: 8 }}>
            <View style={{ height: 13 }} />
            <TouchableOpacity
              onPress={() => {
                setSelectedColor(item);
              }}>
              <View
                style={{
                  marginHorizontal: 1,
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignContent: 'center',
                }}>
                <Image
                  source={{ uri: imagesUrl.shoes }}
                  style={{ width: 109, height: 111, borderRadius: 7 }}
                />
                <View
                  style={{
                    width: 109,
                    height: 42,
                    justifyContent: 'center',
                    backgroundColor: '#F6F6F6',
                    borderRadius: 7,
                  }}>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        textAlign: 'center',
                        alignSelf: 'center',
                        color:
                          selectedColor == item
                            ? colors.startOrange
                            : colors.black,
                      },
                    ]}>
                    {' '}
                    light gray
                  </Text>
                </View>

                <View
                  style={{
                    position: 'absolute',
                    top: 5,
                    end: 4,
                    height: 19,
                    width: 19,
                    backgroundColor: colors.greyB3B3B38C,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}>
                  <ResizeIcon width={19} height={19} color={colors.white} />
                </View>
              </View>
              {selectedColor == item ? (
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: 'rgba(255, 118, 0, 0.08)',
                    width: '100%',
                    height: '100%',
                    borderRadius: 7,
                    borderColor: colors.startOrange,
                    borderWidth: 1,
                  }}
                />
              ) : null}

              {index == 1 ? (
                <View
                  style={{
                    position: 'absolute',
                    top: -10,
                    end: -1,
                    height: 13,
                    width: 44,
                    backgroundColor: colors.greyCCCCCC,
                    borderColor: colors.whiteF2F2F2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomEndRadius: 5,
                    borderTopStartRadius: 5,
                  }}>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        color: colors.white,
                        fontSize: 10,
                      },
                    ]}>
                    sold out
                  </Text>
                </View>
              ) : null}
            </TouchableOpacity>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export const SizeAndBuyingForView = ({ isSize = false }) => {
  const [selectedSize, setSelecteSize] = useState(isSize ? true : false);
  const users = ['Vali', 'Name 2 is kallu singh', '+ Add'];
  const sizes = ['24', '25', '26', '27', '28', '29', '30', '31', '32'];
  const [selectedItem, setSelecteItem] = useState('');
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
        {isSize ? null : <TouchableOpacity
          onPress={() => {
            setSelecteSize(false);
          }}>
          <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
            <Text
              style={[
                styles.textStyle,
                {
                  fontSize: 14,
                  color: !selectedSize ? colors.startOrange : colors.black,
                },
              ]}>
              Для
            </Text>
            {!selectedSize ? (
              <View
                style={{
                  height: 2,
                  backgroundColor: colors.startOrange,
                  width: 30,
                }}
              />
            ) : null}
          </View>
        </TouchableOpacity>}
        <TouchableOpacity
          onPress={() => {
            setSelecteSize(true);
          }}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-start',
              marginStart: isSize ? 2 : 15,
            }}>
            <Text
              style={[
                styles.textStyle,
                {
                  fontSize: 14,
                  color: selectedSize ? colors.startOrange : colors.black,
                },
              ]}>
              Размер
            </Text>
            {selectedSize ? (
              <View
                style={{
                  height: 2,
                  backgroundColor: colors.startOrange,
                  width: 30,
                }}
              />
            ) : null}
          </View>
        </TouchableOpacity>
      </View>
      {/* <FlatList
        data={selectedSize ? sizes : users}
        scrollEnabled={false}
        numColumns={5}
        renderItem={({ item }) => ( */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {(selectedSize ? sizes : users).map((item) =>
          <View style={{ margin: 8 }}>
            <TouchableOpacity
              onPress={() => {
                setSelecteItem(item);
              }}>
              <View
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 5,
                  justifyContent: 'center',
                  backgroundColor: '#F6F6F6',
                  borderRadius: selectedSize ? 5 : 15,
                }}>
                <Text
                  style={[
                    styles.textStyle,
                    {
                      color:
                        selectedItem == item
                          ? colors.startOrange
                          : colors.black121212,
                      textAlign: 'center',
                      alignSelf: 'center',
                      fontSize: 14,
                    },
                  ]}>
                  {' '}
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
            {selectedItem == item ? (
              <View
                style={{
                  position: 'absolute',
                  backgroundColor: 'rgba(255, 118, 0, 0.08)',
                  width: '100%',
                  height: '100%',
                  borderRadius: selectedSize ? 5 : 15,
                  borderColor: colors.startOrange,
                  borderWidth: 1,
                }}
              />
            ) : null}
          </View>)}
      </View>
      {/* )}
        showsVerticalScrollIndicator={false}
      /> */}
    </View>
  );
};

export const QuanityView = ({ isQuntiry = false }) => {
  const [quantiy, setQuantity] = useState(1);
  const maxQuantity = 9;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingBottom: isQuntiry ? 10 : 80
      }}>
      <Text
        style={[
          styles.textStyle,
          { textAlign: 'center', fontSize: 14, alignSelf: 'center' },
        ]}>
        {isQuntiry ? 'Количество (такое же, как при покупке)' : 'Quantity'}
      </Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() => {
            if (quantiy > 1) {
              setQuantity(quantiy - 1);
            }
          }}>
          <RemoveCircleOutline
            color={quantiy > 1 ? colors.startOrange : '#F1F1F1'}
            width={30}
            height={30}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.textStyle,
            { alignSelf: 'center', fontSize: 17, paddingRight: 8 },
          ]}>
          {' '}
          {quantiy.toString()}
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (quantiy < maxQuantity) {
              setQuantity(quantiy + 1);
            }
          }}>
          <AddCircleOutline
            color={quantiy < maxQuantity ? colors.startOrange : '#F1F1F1'}
            width={30}
            height={30}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CommonButton = ({
  text = AppString.add_to_cart,
  endColor = colors.endOrange,
  startorange = colors.startOrange,
  onClick,
}) => {
  return (
    <TouchableOpacity onPress={onClick} >
      <LinearGradient
        colors={[startorange, endColor]}
        start={{ x: 0.4, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 1000,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={[
            styles.textStyle,
            { color: colors.white, fontWeight: 'bold', fontSize: 14 },
          ]}>
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default AddSelectProductSizeColorScreen;
