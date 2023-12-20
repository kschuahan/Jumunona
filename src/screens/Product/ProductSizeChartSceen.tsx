import { Modal, View, Text, FlatList, Pressable } from 'react-native';
import { styles } from '../../utils/AppStyles';
import { colors } from '../../utils/AppColors';
import { fontFamily } from '../../utils/Fonts';
import CloseCircleOutline from '../../../assets/Icons/CloseCircle.svg';

enum SizeOption {
  small = 'S',
  medium = 'M',
  large = 'L',
  xl = 'XL',
  xxl = 'XXL',
}

interface SizeValue {
  columnId: number;
  value: string;
}

interface SizesModel {
  size: SizeOption;
  columns: SizeValue[];
}

interface SizeColumn {
  id: number;
  columnName: string;
}
const sizeCloumns: SizeColumn[] = [
  {
    id: 0,
    columnName: 'Sizes',
  },
  {
    id: 1,
    columnName: 'Shoulder(cm)',
  },
  {
    id: 2,
    columnName: 'Chest(cm)',
  },
  {
    id: 3,
    columnName: 'Hips(cm)',
  },
  {
    id: 4,
    columnName: 'Waistline(cm)',
  },
];
const sizesArr: SizesModel[] = [
  {
    size: SizeOption.small,
    columns: [
      {
        columnId: 1,
        value: '34',
      },
      {
        columnId: 2,
        value: '34',
      },
      {
        columnId: 3,
        value: '34',
      },
      {
        columnId: 4,
        value: '34',
      },
    ],
  },
  {
    size: SizeOption.medium,
    columns: [
      {
        columnId: 1,
        value: '34',
      },
      {
        columnId: 2,
        value: '34',
      },
      {
        columnId: 3,
        value: '34',
      },
      {
        columnId: 4,
        value: '34',
      },
    ],
  },
  {
    size: SizeOption.large,
    columns: [
      {
        columnId: 1,
        value: '34',
      },
      {
        columnId: 2,
        value: '34',
      },
      {
        columnId: 3,
        value: '34',
      },
      {
        columnId: 4,
        value: '34',
      },
    ],
  },
  {
    size: SizeOption.xl,
    columns: [
      {
        columnId: 1,
        value: '34',
      },
      {
        columnId: 2,
        value: '34',
      },
      {
        columnId: 3,
        value: '34',
      },
      {
        columnId: 4,
        value: '34',
      },
    ],
  },
  {
    size: SizeOption.xxl,
    columns: [
      {
        columnId: 1,
        value: '34',
      },
      {
        columnId: 2,
        value: '34',
      },
      {
        columnId: 3,
        value: '34',
      },
      {
        columnId: 4,
        value: '34',
      },
    ],
  },
];
export const ProductSizeChartSceen = ({ isShow, onClose }) => {
  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      visible={isShow}
      onRequestClose={onClose}>
      <View
        style={[styles.botton_view, { backgroundColor: 'rgba(0, 0,0, .7 )' }]}>
        <View style={[styles.bottom_sheet, { width: '95%', borderRadius: 13 }]}>
          <View style={{ flexDirection: 'row', borderRadius: 13 }}>
            <View
              style={{
                elevation: 10,
                shadowColor: colors.grey,
                shadowOpacity: 0.3,
                shadowOffset: { width: 5, height: 0 },
                paddingRight: 5,
              }}>
              {header.map((subItem, index) => (
                <View
                  style={{
                    padding: index == 0 ? 12 : 10,
                    backgroundColor: index % 2 == 0 ? '#F7F7F9' : colors.white,
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingEnd: 16,
                    borderTopLeftRadius: index == 0 ? 13 : 0,
                    borderBottomLeftRadius: index == header.length - 1 ? 13 : 0,
                  }}>
                  <Text style={{ fontFamily: fontFamily.bold, fontSize: 12, color: colors.black }}>
                    {subItem.toString()}
                  </Text>
                </View>
              ))}
            </View>
            <FlatList
              data={sizesArray}
              horizontal
              style={{ borderRadius: 13, marginEnd: 10 }}
              renderItem={({ item, index }) => (
                <View>
                  {item.map((subItem, index) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor:
                          index % 2 == 0 ? '#F7F7F9' : colors.white,
                        paddingVertical: index == 0 ? 0 : 10,
                        paddingBottom: index == 0 ? 0 : 10,

                        justifyContent: 'center'
                      }}>
                      <View
                        style={{
                          paddingHorizontal: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          alignContent: 'center',
                        }}>
                        <Text
                          style={{ fontFamily: fontFamily.bold, fontSize: 12, color: colors.black }}>
                          {subItem.toString()}
                        </Text>
                      </View>
                      {index == 0 ? (
                        <View
                          style={{
                            width: 1,
                            margin: 12,
                            backgroundColor: '#D4D4D4',
                            height: 15,
                          }}></View>
                      ) : null}
                    </View>
                  ))}
                </View>
              )}
              keyExtractor={item => item[0].toString()}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
        <Pressable onPress={onClose}>
          <CloseCircleOutline
            width={40}
            height={30}
            color={colors.white}
            style={{ marginTop: 20 }}
          />
        </Pressable>
      </View>
    </Modal>
  );
};

const header = ['Размер', 'S', 'M', 'L', 'XL', 'XXL'];

const sizesArray = [
  ['Shoulder(cm)', 34, 34, 34, 34, 34],
  ['Chest(cm)', 34, 34, 34, 34, 34],
  ['Hips(cm)', 34, 34, 34, 34, 34],
  ['Waistline(cm)', 34, 34, 34, 34, 34],
];
