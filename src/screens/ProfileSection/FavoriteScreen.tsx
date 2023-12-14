import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, FlatList, Platform } from 'react-native'
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


const categories = ["New", "Womens", "Mens", "内衣", "鞋靴", "箱包", "美妆"]
const products = [{ title: "v 29.9", isSelected: false }, { title: "v 29.9", isSelected: false },
{ title: "v 29.9", isSelected: false }, { title: "v 29.9", isSelected: false }, { title: "v 29.9", isSelected: false }, { title: "v 29.9", isSelected: false },
{ title: "v 29.9", isSelected: false }, { title: "v 29.9", isSelected: false }, { title: "v 29.9", isSelected: false }, { title: "v 29.9", isSelected: false }, { title: "v 29.9", isSelected: false }, { title: "v 29.9", isSelected: false }]

export const FavoriteScreen = ({ navigation }) => {
    const [pos, setPos] = useState(0)

    const [select, setSelect] = useState(false)


    return (
        <View style={[styles.container, { backgroundColor: colors.whiteF7F7F7, padding: undefined,  }]}>
            <Card style={{
                elevation: 2, paddingHorizontal: 13,
                backgroundColor: colors.white, borderTopEndRadius: 0, borderTopStartRadius: 0,
                marginBottom: 5, paddingTop: Platform.OS == "ios" ? 20 : 10, paddingBottom: 5
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }} style={{ alignItems: "center" }}>
                        <Ionicons name="chevron-back-outline" size={24} />
                    </TouchableOpacity>
                    <Text style={[styles.textStyle, { fontSize: 21, fontFamily: fontFamilty.bold }]}>
                        {AppString.want_to + " (821)"}
                    </Text>
                    <TouchableOpacity onPress={() => {
                        // setSelect(!select)
                    }} style={{ alignItems: "center" }}>
                        <Ionicons name={select ? "checkmark-outline" : "create-outline"}
                            color={select ? colors.lightOrange : colors.black666666} size={24} />
                    </TouchableOpacity>
                </View>
                <SearchView />

            </Card>
            <View style={[styles.container, { backgroundColor: colors.white, flexDirection: 'row', padding: undefined, marginTop: -4 }]}>
                <FlatList
                    style={{ width: "30%", backgroundColor: colors.whiteF7F7F7 }}
                    data={categories}
                   
                    renderItem={({ item, index }) =>
                        <TouchableOpacity onPress={() => {
                            setPos(index)
                        }} style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
                            <Text style={[styles.textStyle, { fontSize: 16, color: pos == index ? colors.lightOrange : colors.grey }]}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    }
                />

                <FlatList
                    style={{ width: '80%', marginTop: 10, marginStart: 10, }}
                    data={products}
                    keyExtractor={(item) => {
                        return item.toString();
                    }}
                    numColumns={3}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity style={{
                            flex: 1 / 3, justifyContent: 'flex-start',
                            alignItems: 'flex-start', marginBottom: 20
                        }}>

                            <Image
                                source={{ uri: imagesUrl.shoes }}
                                style={{ height: 80, width: 80, borderRadius: 5 }}
                            />
                            <Text style={[styles.textStyle, { fontSize: 14, color: colors.lightOrange, marginTop: 8 }]}>
                                {item.title}
                            </Text>
                            {select ? <TouchableOpacity onPress={() => {

                            }} style={{ position: 'absolute', end: 10, top: 2 }}><Ionicons
                                    name={item.isSelected ? "checkmark-circle" : "ellipse-outline"}
                                    size={17}
                                    color={item.isSelected ? colors.endOrange : colors.white}

                                /></TouchableOpacity> : null}
                        </TouchableOpacity>
                    }
                />
            </View></View>
    )
}


const SearchView = () => {
    const [search, setSearch] = useState("")

    return <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',
        backgroundColor: colors.whiteF7F7F7, borderRadius: 19, marginBottom: 5, marginTop: 8
    }}>
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


const style = StyleSheet.create({
    searchTextInput: {
        height: 33,
        width: '100%',
        marginStart: 11,
        fontFamily: "SegoeUI",
        fontSize: 15,
    }
});
