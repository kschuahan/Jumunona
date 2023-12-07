import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React from 'react'
import { styles } from '../../utils/AppStyles'
import { imagesUrl } from '../../utils/AppIcons'
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from '../../utils/AppColors';
import { AppString } from '../../utils/AppStrings';
import { Card } from 'react-native-paper'
import { LinearGradient } from "expo-linear-gradient";
import { dimensions } from '../../utils/sizes';
import { useCallback, useEffect, useState } from "react";
import { HeaderBackButton } from '@react-navigation/elements';
import { RouteNames } from '../../utils/RoutesNames';
import { StatusBar } from 'expo-status-bar';
import { fontFamilty } from '../../utils/Fonts';


const cities = [
    "Душанбе",
    "Худжанд",
    "Вахдат",
    "Турсунзаде",
    "Гиссар",
    "Бохтар",
    "Куляб",
    "Истаравшан",
    "Исфара",
    "Канибадам",
    "Пенджикент",
    "Бустон",
    "Гафуров"
]
export const SelectCity = ({ navigation }) => {

    const [pos, setPos] = useState(1)

    useEffect(() => {

        navigation.setOptions({
            headerTitle: "",

            headerRight: (() => <TouchableOpacity style={{ alignItems: "center",  marginStart: -20  }}>
                <Ionicons name="ellipsis-horizontal-outline" size={24} />
            </TouchableOpacity>),

            headerLeft: () =>
            (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }} style={{ alignItems: "center", marginStart: -20 }}>
                        <Ionicons name="chevron-back-outline" size={24} />
                    </TouchableOpacity>

                    <SearchView />
                </View>
            ),
            headerStyle: {
                backgroundColor: '#F6F6F6',

            },

            headerShadowVisible: false,

        })
    }, [])

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={[styles.container, { backgroundColor: '#F6F6F6', padding: 6 }]}>

                <View style={{ backgroundColor: colors.white, paddingHorizontal: 10, borderRadius: 17, paddingTop: 14, paddingBottom: 7 }}>

                    <Text
                        style={[
                            styles.textStyle,
                            { fontSize: 15, fontFamily: fontFamilty.bold, paddingHorizontal: 10, marginBottom: 3 },
                        ]}
                    >
                        {AppString.tajakistan}
                    </Text>

                    <FlatList
                        scrollEnabled={false}
                        data={cities}
                        keyExtractor={(item) => {
                            return item.toString();
                        }}
                        numColumns={3}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={{
                                    flex: 1 / 3,
                                    paddingTop: 8,
                                    paddingBottom: 6,
                                    marginHorizontal: 10,
                                    paddingHorizontal: 6,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginVertical: 8,
                                    backgroundColor: pos == index ? colors.orangeFDF1EC : colors.white,
                                    borderWidth: 0.5,
                                    borderColor: pos == index ? colors.lightOrange : colors.grayC9C9C9,
                                    borderRadius: 8
                                }} onPress={() => {
                                    setPos(index)
                                }}>
                                    <Text
                                        style={[
                                            styles.textStyle,
                                            { fontSize: 13, color: pos == index ? colors.lightOrange : colors.black },
                                        ]}
                                    >
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>


            </View></ScrollView>
    )
}


const SearchView = () => {
    const [search, setSearch] = useState("")

    return <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Ionicons name="search" size={17} style={{ marginStart: 15 }} color={colors.grey} />
        <TextInput
            value={search}
            placeholder={AppString.city_name}
            style={style.searchTextInput}
            placeholderTextColor={colors.grey}
            onChangeText={(text) => {
                setSearch(text)
            }}
        />
    </View>
}

const style = StyleSheet.create ({
    searchTextInput: {
        height: 33,
        width: '80%',
        marginStart: 11,
        fontFamily: "SegoeUI",
        fontSize: 15,
    }
});