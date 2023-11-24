import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '../utils/AppStyles'
import { imagesUrl } from '../utils/AppIcons'
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from '../utils/AppColors';
import { AppString } from '../utils/AppStrings';
import { Card } from 'react-native-paper'
import { LinearGradient } from "expo-linear-gradient";
import { dimensions } from '../utils/sizes';
import { useCallback, useEffect, useState } from "react";
import { HeaderBackButton } from '@react-navigation/elements';
import { RouteNames } from '../utils/RoutesNames';
import { StatusBar } from 'expo-status-bar';



export const SettingScreen = ({ navigation }) => {

    useEffect(() => {

        navigation.setOptions({
            headerTitle: RouteNames.setting,
            headerRight: (() => <TouchableOpacity style={{ alignItems: "center" }}>
                <Ionicons name="ellipsis-horizontal-outline" size={24} />
            </TouchableOpacity>),

            headerLeft: () => (
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }} style={{ alignItems: "center" }}>
                    <Ionicons name="chevron-back-outline" size={24} />
                </TouchableOpacity>
            )

        })
    }, [])

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Profile onClick={() => {

                }} />
                <Card style={{ backgroundColor: colors.white, padding: 10, marginTop: 20 }}>
                    <TextWithIcon title={AppString.notifications} onClick={() => { }} />
                    <TextWithIcon title={AppString.city} onClick={() => { }} />
                    <TextWithIcon title={AppString.feedback_and_help} onClick={() => { }} />

                </Card>

                <Card style={{ backgroundColor: colors.white, padding: 10, marginTop: 20 }}>
                    <TextWithIcon title={AppString.trem_and_privacy} onClick={() => { }} />
                    <TextWithIcon title={AppString.about_us} onClick={() => { }} />
                    <TextWithIcon title={AppString.clear_catch} onClick={() => { }} />
                    <TextWithIcon title={AppString.catch_for_update} onClick={() => { }} />

                </Card>

                <Card style={{ backgroundColor: colors.white, padding: 10, marginTop: 20 }}>
                    <TouchableOpacity onPress={() => {

                    }} style={[styles.profile, { marginTop: undefined, alignItems: 'center', justifyContent: 'center', padding: 4 }]}>
                        <Text style={[styles.textStyle, { fontSize: 16, fontWeight: '500' }]}>{AppString.go_out}</Text>

                    </TouchableOpacity>

                </Card>
            </View></ScrollView>
    )
}


const Profile = ({ onClick }) => {

    return <Card style={{ backgroundColor: colors.white }}>
        <View>

            <View style={[styles.profile, { alignItems: 'center', marginTop: undefined, padding: 10 }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: imagesUrl.profile }} style={{ height: 70, width: 70, borderRadius: 35 }} />
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={[styles.textStyle, { fontSize: 21, fontWeight: 'bold' }]}>User name</Text>
                        <Text style={[styles.textStyle, { color: colors.grey, fontSize: 14 }]}>nickname123</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={onClick} >
                    <Ionicons name={'chevron-forward-outline'} color={colors.black} size={18} />
                </TouchableOpacity>
            </View>

            <View style={{ height: 1, backgroundColor: colors.darkWhite }} />
            <TextWithIcon title={AppString.my_addresses} padding={10} onClick={() => { }} />
        </View></Card>
}


const TextWithIcon = ({ title = AppString.address, padding = 8, onClick }) => {

    return <TouchableOpacity onPress={onClick} style={[styles.profile, { marginTop: undefined, alignItems: 'center', padding: padding }]}>
        <Text style={[styles.textStyle, { fontSize: 16, fontWeight: '500' }]}>{title}</Text>
        <Ionicons name={'chevron-forward-outline'} color={colors.extraGrey} size={20} />

    </TouchableOpacity>
}