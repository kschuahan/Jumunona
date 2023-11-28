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
import { fontFamilty } from '../utils/Fonts';



export const ViewMobileNumberScreen = ({ navigation }) => {

    useEffect(() => {

        navigation.setOptions({
            headerTitle: RouteNames.phoneNumber,

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
            <View style={[styles.container, { backgroundColor: colors.white }]}>

                <Text
                    style={[
                        styles.textStyle,
                        { fontSize: 17, fontFamily: fontFamilty.regular, alignSelf: 'center', marginTop: 68 },
                    ]}
                >
                    {AppString.current_phone_number}
                </Text>

                <Text
                    style={[
                        styles.textStyle,
                        { fontSize: 24, fontFamily: fontFamilty.bold, alignSelf: 'center', marginTop: 21 },
                    ]}
                >
                    150******50
                </Text>


                <TouchableOpacity
                    onPress={() => {
                        //navigation.replace("Main");
                    }}
                    style={[styles.loginButton, { marginTop: 63 }]}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={[colors.startOrange, colors.endOrange]}
                        style={styles.buttonGradient}
                    >
                        <Text
                            style={{ fontSize: 19, color: colors.white, fontFamily: fontFamilty.regular }}
                        >
                            {AppString.change}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                    style={[styles.loginButton, styles.greyButton]}
                >
                    <Text style={{
                        fontSize: 19, color: colors.black, fontFamily: fontFamilty.regular,
                        alignSelf: 'center'
                    }}>
                        {AppString.back}
                    </Text>
                </TouchableOpacity>
            </View></ScrollView>
    )
}
