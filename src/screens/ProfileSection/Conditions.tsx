import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
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



export const ConditionsScreen = ({ navigation }) => {

    useEffect(() => {

        navigation.setOptions({
            headerTitle: RouteNames.conditions,

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


                <View style={{ backgroundColor: colors.white, paddingHorizontal: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 13 }}>
                    <TextWithIcon title={AppString.trem_of_use} onClick={() => {
                        navigation.navigate(RouteNames.term_of_use)
                    }} />
                    <TextWithIcon title={AppString.system_permissions} onClick={() => {
                        navigation.navigate(RouteNames.system_permission)
                    }} />
                    <TextWithIcon title={AppString.privacy_policy} onClick={() => {
                        navigation.navigate(RouteNames.privacy_policy)
                    }} />
                    <TextWithIcon title={AppString.pertional_information} onClick={() => {
                        navigation.navigate(RouteNames.personal_info)
                    }} />

                </View>


            </View></ScrollView>
    )
}



const TextWithIcon = ({ title = AppString.address, padding = 13, onClick }) => {

    return (
        <TouchableOpacity
            onPress={onClick}
            style={[
                styles.profile,
                { marginTop: undefined, alignItems: "center", paddingVertical: padding },
            ]}
        >
            <Text
                style={[
                    styles.textStyle,
                    { fontSize: 16, fontWeight: "bold" },
                ]}
            >
                {title}
            </Text>
            <Ionicons
                name={"chevron-forward-outline"}
                color={colors.extraGrey}
                size={15}
            />
        </TouchableOpacity>
    );
}