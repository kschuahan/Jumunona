import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import React from 'react';
import { styles } from '../../utils/AppStyles';
import { colors } from '../../utils/AppColors';
import { AppString } from '../../utils/AppStrings';
import { useEffect, useState } from 'react';

import EllipsisHorizontal from '../../../assets/Icons/ellipsis-horizontal.svg';
import ChevronBackOutline from '../../../assets/Icons/chevronBackOutline.svg';
import SearchIcon from '../../../assets/Icons/searchIcon.svg';
import { fontFamily } from '../../utils/Fonts';
import { CustomHeaderWithSearch } from '../../components/Header';

const cities = [
  'Душанбе',
  'Худжанд',
  'Вахдат',
  'Турсунзаде',
  'Гиссар',
  'Бохтар',
  'Куляб',
  'Истаравшан',
  'Исфара',
  'Канибадам',
  'Пенджикент',
  'Бустон',
  'Гафуров',
];
export const SelectCity = ({ navigation }) => {
  const [pos, setPos] = useState(1);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',

      headerRight: () => (
        <TouchableOpacity style={{ alignItems: 'center', marginStart: -20 }}>
          <EllipsisHorizontal width={24} height={24} />
        </TouchableOpacity>
      ),

      headerLeft: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ alignItems: 'center', marginStart: -20 }}>
            <ChevronBackOutline width={15} height={15} />
          </TouchableOpacity>

        </View>
      ),
      headerStyle: {
        backgroundColor: colors.white,
      },
    });
  }, []);

  return (
    <View style={[styles.container, { padding: 0 }]}>
      <CustomHeaderWithSearch navigation={navigation} />
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        showsVerticalScrollIndicator={false}>
        <View
          style={[styles.container, { backgroundColor: '#F6F6F6', padding: 6 }]}>
          <View
            style={{
              backgroundColor: colors.white,
              paddingHorizontal: 10,
              borderRadius: 17,
              paddingTop: 10,
              paddingBottom: 7,
            }}>
            <Text
              style={[
                styles.textStyle,
                {
                  fontSize: 15,
                  fontWeight: 'bold',
                  paddingHorizontal: 10,
                },
              ]}>
              {AppString.tajakistan}
            </Text>

            <FlatList
              scrollEnabled={false}
              data={cities}
              keyExtractor={item => {
                return item.toString();
              }}
              numColumns={3}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={{
                      flex: 1 / 3,
                      paddingTop: 6,
                      paddingBottom: 6,
                      marginHorizontal: 10,
                      paddingHorizontal: 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginVertical: 8,
                      backgroundColor:
                        pos == index ? colors.orangeFDF1EC : colors.white,
                      borderWidth: 0.5,
                      borderColor:
                        pos == index ? colors.lightOrange : colors.grayC9C9C9,
                      borderRadius: 8,
                    }}
                    onPress={() => {
                      setPos(index);
                    }}>
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          fontSize: 13,
                          color:
                            pos == index
                              ? colors.lightOrange
                              : colors.balck0C0C0C,
                        },
                      ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>

  );
};

