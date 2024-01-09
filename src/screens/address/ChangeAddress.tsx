import React, { useEffect, useState } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import ChevronBackOutlineIcon from '../../../assets/Icons/chevronBackOutline.svg';
import { AppString } from "../../utils/AppStrings";
import { LogoTitle } from "../../components/Header";
import EllipsisHorizontalIcon from '../../../assets/Icons/ellipsis-horizontal.svg';
import { styles } from "../../utils/AppStyles";
import { ScrollView } from "react-native-virtualized-view";
import { Colors } from "react-native/Libraries/NewAppScreen";
import CautionIcon from '../../../assets/Icons/Caution.svg';
import { colors } from "../../utils/AppColors";
import { fontFamily } from "../../utils/Fonts";
import HomeAddress from '../../../assets/Icons/HomeAddress.svg';
import CheckmarkCircle from '../../../assets/Icons/CircleOrange.svg';
import EllipsisHorizontalNormal from '../../../assets/Icons/CircleGrey.svg';
import LinearGradient from "react-native-linear-gradient";
import { RouteNames } from "../../utils/RouteNames";

interface AddreessModal {
    id: number;
    type: String;
    name: String;
    mobile: String;
    address: String;
    isSelected: boolean;
    reasion: string
}
let pos = 0;
export const addressList: AddreessModal[] = [
    {
        id: 1,
        type: 'home',
        name: 'Nazir',
        mobile: '18088008045',
        address: 'Tianhe District, Guangzhou City, Room 5450, Area G1, Building 88',
        isSelected: true,
        reasion: 'Tajikistan Khujand'
    },
    {
        id: 2,
        type: 'work',
        name: 'Nalive',
        mobile: '18088008045',
        address: '广东省广州市天河区 街道街道 路路路 88号栋楼小区g1区5450房',
        isSelected: false,
        reasion: 'Tajikistan Khujand'


    },
    {
        id: 3,
        type: 'work',
        name: 'Nalive',
        mobile: '18088008045',
        address: '广东省广州市天河区 街道街道 路路路 88号栋楼小区g1区5450房',
        isSelected: false,
        reasion: 'Tajikistan Khujand'


    }
]
export const ChangeAddressScreen = ({ navigation }) => {

    useEffect(() => {

        navigation.setOptions({
            headerTitle: AppString.changeAddress,
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
                    <ChevronBackOutlineIcon width={15} height={15} />
                </TouchableOpacity>
            ),
        });
    });
    return (
        <View  style={{
            flex: 1,
        }}>
            <View
            style={{
                flex: 1,
                paddingBottom: 72
            }}
            >
        <ScrollView
             style={{
               
            }}
            showsVerticalScrollIndicator={false}>
            <CautionView />
            <SorceAddressView />
            <AddressesView onViewAllAddress={ () => {
                    navigation.navigate(RouteNames.myAddress)
            }} />
            
        </ScrollView>
        </View>
        <CommonButton
        text={AppString.confirm_changes}
        startorange={colors.startOrange}
        endColor={colors.endOrange}
        onClick={ () => {}}
      />
    
      </View>
    )
}

const CautionView = () => {
    return (
        <View
            style={{
                backgroundColor: Colors.white,
                borderRadius: 13,
                marginTop: 9,
                marginHorizontal: 6,
                padding: 8,
                paddingBottom: 20,
                flexDirection: "row",
                gap: 7,
                justifyContent: "center",
                alignItems: "center"

            }}
        >
            <CautionIcon />
            <Text
                style={{
                    color: colors.lightOrange,
                    fontSize: 13,
                    fontFamily: fontFamily.regular,
                    width: "92%"
                }}
            >
                Изменение заказа может повлиять на время доставки и предоставляемые услуги, и может быть выполнено только по изначальной цене. Обратите внимание, что изменения разрешены только один раз после оплаты. Если товар уже был обменен или отправлен, или изменились стоимость доставки, изменения могут быть невозможны. Приносим извинения за возможные неудобства.
            </Text>
        </View>
    )
}

const SorceAddressView = () => {
    return (
        <View
            style={{
                margin: 15,
                gap: 12
            }}
        >
            <Text
                style={{
                    color: colors.black0B0B0B,
                    fontSize: 18,
                    fontFamily: fontFamily.regular,
                    fontWeight: "bold",

                }}
            >
                {AppString.source_address}:
            </Text>
            <Text
                style={{
                    color: colors.black0B0B0B,
                    fontSize: 18,
                    fontFamily: fontFamily.regular,

                }}
            >
                Xiancun Street, Tianhe District,Guangzhou, Guangdong Building 550
            </Text>
            <Text
                style={{
                    color: colors.black636363,
                    fontSize: 18,
                    fontFamily: fontFamily.regular,

                }}
            >
                Valijon 15050505000
            </Text>
        </View>
    )
}

const AddressesView = ({onViewAllAddress}) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    return (
        <View
            style={{
                backgroundColor: Colors.white,
                borderRadius: 13,
                marginTop: 14,
                marginHorizontal: 6,
                paddingHorizontal: 13,
                paddingVertical: 22
            }}
        >
            <Text
                style={{
                    color: colors.black0B0B0B,
                    fontSize: 18,
                    fontFamily: fontFamily.regular,
                    fontWeight: "bold",

                }}
            >
                {AppString.select_new_Address}:
            </Text>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={addressList}
                renderItem={({ item, index }) =>
                    <AddressInflate item={item} isSelected={index == selectedIndex} onClick={() => {
                        setSelectedIndex(index)
                    }} />}
            />
            <TouchableOpacity
            onPress={onViewAllAddress}
            style = {{
                alignSelf: "center"
            }}
            >
            <Text
                style={{
                    color: colors.black0B0B0B,
                    fontSize: 16,
                    fontFamily: fontFamily.regular,
                    marginTop: 15

                }}
            >
                {AppString.all_address}:
            </Text>
            </TouchableOpacity>
        </View>
    )
}

const AddressInflate = ({ item, isSelected, onClick }) => {
    return (
        <TouchableOpacity
            style={{
                marginVertical: 14
            }}
            onPress={onClick}
        >
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                {item.type == 'home' ? <HomeAddress /> : <View style={{
                    height: 32, width: 32, justifyContent: 'center',
                    alignItems: 'center', backgroundColor: colors.orangeFDF1EC, borderRadius: 16
                }}>
                    <Text style={[styles.textStyle, {
                        color: colors.lightOrange,
                        fontWeight: 'bold', fontSize: 17
                    }]}>{item.name.charAt(0)}</Text>
                </View>}

                <View style={{
                    marginStart: 11,
                    gap: 6,
                    width: '80%'
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.textStyle, {
                            color: colors.black121212,
                            fontWeight: 'bold', fontSize: 18
                        }]}>{item.name}</Text>
                        <Text style={[styles.textStyle, {
                            color: '#8F8F8F',
                            fontSize: 13, marginStart: 4
                        }]}>{item.mobile}</Text>
                    </View>
                    <Text style={[styles.textStyle, {
                        color: '#3F3F3F',
                        fontSize: 15
                    }]}>{item.address}</Text>
                </View>
                {
                    isSelected ? <CheckmarkCircle /> : <EllipsisHorizontalNormal />
                }
            </View>

        </TouchableOpacity>
    )
}


const CommonButton = ({
    text,
    endColor = colors.endOrange,
    startorange = colors.startOrange,
    onClick,
  }) => {
    return (
        <View
            style= {{
                backgroundColor: colors.white,
                paddingHorizontal: 12,
                paddingTop: 7,
                borderTopLeftRadius: 13,
                borderTopRightRadius: 13,
                position: "absolute",
                bottom: 0,
                flex: 1,
                width:"100%",
                paddingBottom: 20
            }}
        >
      <TouchableOpacity
        onPress={onClick}
        >
        <LinearGradient
          colors={[startorange, endColor]}
          start={{ x: 0.4, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 20,
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
      </View>
    );
  };
  