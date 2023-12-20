import { TouchableOpacity, View, FlatList, Text } from 'react-native';
import { styles } from '../../utils/AppStyles';
import React, { useEffect, useState } from 'react';
import { RouteNames } from '../../utils/RouteNames';
import { AppString } from '../../utils/AppStrings';
import { colors } from '../../utils/AppColors';
import { fontFamily } from '../../utils/Fonts';
import EllipsisHorizontalIcon from '../../../assets/Icons/ellipsis-horizontal.svg';
import ChevronBackOutline from '../../../assets/Icons/chevronBackOutline.svg';
import ChevronFwdOutlineIcon from '../../../assets/Icons/ForwardBlack.svg';
import ImageIcon from '../../../assets/Icons/image-outline.svg';
import { CustomHeader } from '../../components/Header';

const categories = [
  "Women's",
  "Men's",
  'Baby',
  'Home',
  '美妆',
  '电器',
  '家具',
  '玩具',
  '配饰',
  '内衣',
  '鞋靴',
  '汽车用品',
];
const products = [
  { title: 'coat', isSelected: false },
  { title: '3 category', isSelected: false },
  { title: 'Jacket', isSelected: false },
  { title: 'Cotton clothes', isSelected: false },
  { title: 'down jacket', isSelected: false },
  { title: 'leather coat', isSelected: false },
  { title: '棒球服', isSelected: false },
  { title: '西装', isSelected: false },
  { title: 'PU皮衣', isSelected: false },
];

export const AllCategoriesScreen = ({ navigation }) => {
  const [pos, setPos] = useState(0);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: AppString.categories,

      headerRight: () => (
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <EllipsisHorizontalIcon width={24} height={24} />
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
  });

  return (
    <View style={[styles.container, { padding: 0 }]}>
      <CustomHeader navigation={navigation} title={AppString.categories} />
      <View style={[styles.container, { paddingEnd: 6, paddingTop: 6 }]}>
        <View
          style={[
            styles.container,
            { flexDirection: 'row', padding: undefined, marginTop: -10 },
          ]}>
          <FlatList
            style={{ width: '22%', backgroundColor: colors.whiteF7F7F7 }}
            data={categories}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  setPos(index);
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 17.25,
                }}>
                <Text
                  style={[
                    styles.textStyle,
                    {
                      fontSize: 16,
                      color:
                        pos == index ? colors.lightOrange : colors.black444444,
                    },
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />

          <FlatList
            style={{ width: '78%' }}
            data={[
              { title: 'Jackets', product: products },
              { title: 'Tops', product: products },
              { title: 'Joggers', product: products },
            ]}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View
                style={{
                  backgroundColor: colors.white,
                  marginTop: 9,
                  paddingBottom: 9.5,
                  borderRadius: 11,
                }}>
                <TextWithIcon
                  title={item.title}
                  onClick={() => {
                    navigation.push(RouteNames.product_search_screen);
                  }}
                />
                <FlatList
                  data={products}
                  keyExtractor={item => {
                    return item.toString();
                  }}
                  numColumns={3}
                  scrollEnabled={false}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      style={{
                        flex: 1 / 3,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 11,
                      }}
                      onPress={() => {
                        navigation.push(RouteNames.product_search_screen, {
                          isRoute: true,
                        });
                      }}>
                      <ImageIcon width={66} height={66} />
                      {/* <Image
                      source={{uri: imagesUrl.jacket}}
                      style={{height: 66, width: 66}}
                    /> */}
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            fontSize: 13,
                            color: colors.balc111111,
                            marginTop: 2.5,
                          },
                        ]}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

const TextWithIcon = ({ title = 'Jackets', padding = 10, onClick }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        styles.profile,
        {
          marginTop: undefined,
          alignItems: 'center',
          paddingTop: 10,
          paddingHorizontal: 20,
        },
      ]}>
      <Text
        style={[
          styles.textStyle,
          {
            fontSize: 15,
            fontWeight: '500',
            fontFamily: undefined,
            color: colors.black222222,
          },
        ]}>
        {title}
      </Text>
      <ChevronFwdOutlineIcon color={colors.black} width={12} height={12} />
    </TouchableOpacity>
  );
};
