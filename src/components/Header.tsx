import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { styles } from "../utils/AppStyles";
import { fontFamily } from "../utils/Fonts";
import ChevronBackOutline from '../../assets/Icons/chevronBackOutline.svg';
import EllipsisHorizontal from '../../assets/Icons/ellipsis-horizontal.svg';
import ShopGrey from '../../assets/Icons/ShopGrey.svg';

import { Card } from "react-native-paper";
import { colors } from "../utils/AppColors";
import { AppString } from "../utils/AppStrings";
import SearchIcon from '../../assets/Icons/searchIcon.svg';
import { useState } from "react";
import { RouteNames } from "../utils/RouteNames";

export const LogoTitle = ({ title }) => {
    return (
        <Text
            style={[
                styles.textStyle,
                { fontSize: 21, fontWeight: 'bold' },
            ]}>
            {title}
        </Text>);
}


export const BackLogo = ({ navigation }) => {
    return <TouchableOpacity
        onPress={() => {
            navigation.goBack();
        }}
        style={{ alignItems: 'center' }}>
        <ChevronBackOutline width={15} height={15} />
    </TouchableOpacity>
}



export const MenuLogo = ({ onClick = () => { } }) => {
    return <TouchableOpacity onPress={onClick} style={{ alignItems: 'center' }}>
        <EllipsisHorizontal width={24} height={24} />
    </TouchableOpacity>
}



export const SearchView = ({ placeholder = AppString.city_name, searchText = '', onChangeText=(text:string)=>{} }) => {
    
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: placeholder == AppString.city_name ? colors.whiteF6F6F6 : colors.white,
                borderRadius: 20,
                marginStart: 10,
                marginEnd: -10
            }}>
            {placeholder == AppString.city_name ? <SearchIcon
                width={17}
                height={17}
                style={{ marginStart: 15 }}
                color={colors.grey}
            /> : null}
            <TextInput
                value={searchText}
                placeholder={placeholder}
                style={[style.searchTextInput, {
                    width: placeholder == AppString.city_name ? '80%' : '86%',
                }]}
                placeholderTextColor={colors.grey}
                onChangeText={text => {
                    
                    onChangeText(text)
                }}
            />
        </View>
    );
};


export const CustomHeader = ({ navigation, title }) => {

    return <Card
        style={{
            elevation: 2,
            paddingHorizontal: 13,
            paddingEnd: 12,
            borderRadius: 13,
            backgroundColor: colors.white,
            borderTopEndRadius: 0,
            borderTopStartRadius: 0,
            paddingTop: Platform.OS == 'ios' ? 20 : 20,
            paddingBottom: 5,
            marginBottom: 4
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <BackLogo navigation={navigation} />
            <LogoTitle title={title} />
            <MenuLogo />
        </View>
    </Card>
}





export const ChatHeader = ({ navigation, title = 'Shop name', isVisible = true }) => {

    return <Card
        style={{
            elevation: 2,
            paddingHorizontal: 13,
            paddingEnd: 12,
            borderRadius: 13,
            backgroundColor: colors.whiteF6F6F6,
            borderTopEndRadius: 0,
            borderTopStartRadius: 0,
            paddingTop: Platform.OS == 'ios' ? 20 : 20,
            paddingBottom: 5,
            marginBottom: 4
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 20 }}>
                <BackLogo navigation={navigation} />
                <LogoTitle title={title} /></View>

            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 17 }}>
                {isVisible ? <TouchableOpacity onPress={() => {
                    navigation.navigate(RouteNames.shopHomeScreen)
                }} style={{ alignItems: 'center', marginStart: -20 }}>
                    {/* <Ionicons name="gift-outline" size={24} /> */}
                    <ShopGrey />
                </TouchableOpacity> : false}
                <MenuLogo onClick={() => {
                    navigation.navigate(RouteNames.shopSettings)

                }} />

            </View>
        </View>
    </Card>
}




export const CustomHeaderWithSearch = ({ navigation }) => {

    return <Card
        style={{
            elevation: 2,
            paddingHorizontal: 13,
            paddingEnd: 12,
            borderRadius: 13,
            backgroundColor: colors.white,
            borderTopEndRadius: 0,
            borderTopStartRadius: 0,
            paddingTop: Platform.OS == 'ios' ? 20 : 20,
            paddingBottom: 5,
            marginBottom: 4
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <BackLogo navigation={navigation} />
                <SearchView />
            </View>
            <MenuLogo />
        </View>
    </Card>
}


export const CustomHeaderWithoutBackgroundSearch = ({ navigation, searchText = '', onChangeText =(text:string)=>{}} ) => {

    return <Card
        style={{
            elevation: 0,
            paddingHorizontal: 13,
            paddingEnd: 12,
            borderRadius: 0,
            backgroundColor: colors.whiteF6F6F6,
            borderTopEndRadius: 0,
            borderTopStartRadius: 0,
            paddingTop: Platform.OS == 'ios' ? 20 : 20,
            paddingBottom: 5,
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <BackLogo navigation={navigation} />
                <SearchView placeholder="Футболки" searchText={searchText} onChangeText={onChangeText}/>
            </View>
            <MenuLogo />
        </View>
    </Card>
}


const style = StyleSheet.create({
    searchTextInput: {
        height: 33,
        width: '80%',
        fontWeight: '400',
        fontSize: 15,
        paddingVertical: 0,
        paddingStart: 10
    },
});
