import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
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



export const SucessfulChangePasswordScreen = ({ navigation }) => {

    useEffect(() => {

        navigation.setOptions({
            headerTitle: "",

            headerRight: (() => <TouchableOpacity style={{ alignItems: "center" }}>
                <Ionicons name="ellipsis-horizontal-outline" size={24} />
            </TouchableOpacity>),

            headerLeft: () =>
            (
                <TouchableOpacity onPress={() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: RouteNames.main }]
                    })
                }} style={{ alignItems: "center" }}>
                    <Ionicons name="chevron-back-outline" size={24} />
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: '#F6F6F6',

            },

            headerShadowVisible: false,

        })
    }, [])

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={[styles.container, { backgroundColor: '#F6F6F6' }]}>

                <View style={{ backgroundColor: colors.white, paddingHorizontal: 10, borderRadius: 17 }}>
                    <View
                        style={
                            { alignSelf: 'center', marginTop: 21, marginBottom: 14 }
                        }
                    >
                        <Ionicons
                            name={"checkmark-circle"}
                            size={55}
                            color={colors.endOrange}
                        />

                    </View>

                    <Text
                        style={[
                            styles.textStyle,
                            { fontSize: 23, fontFamily: fontFamilty.bold, alignSelf: 'center' },
                        ]}
                    >
                        {AppString.sucessfully_changed}
                    </Text>

                    <TouchableOpacity onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: RouteNames.main }]
                        })
                    }} style={{
                        marginTop: 52, marginBottom: 21, borderColor: colors.greyCECECE, borderWidth: 0.8,
                        height: 30, justifyContent: 'center', marginHorizontal: 77, borderRadius: 15
                    }}>
                        <Text
                            style={[
                                styles.textStyle,
                                {
                                    fontSize: 13, fontFamily: fontFamilty.regular, alignSelf: 'center',
                                    color: colors.black666666
                                },
                            ]}
                        >
                            {AppString.go_back_to_the_main_page}
                        </Text>
                    </TouchableOpacity>
                </View>


            </View></ScrollView>
    )
}
