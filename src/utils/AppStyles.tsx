import { Platform, StyleSheet } from 'react-native'
import { colors } from './AppColors';
import { fontFamilty } from './Fonts';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.whiteF6F6F6
    },
    profileProduct: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.lightGrey, borderRadius: 8, marginHorizontal: 12
    },
    profile: {
        flexDirection: 'row',
        marginTop: Platform.OS == 'ios' ? undefined : 49,
        justifyContent: 'space-between'
    },
    textStyle: {
        color: colors.black,
        fontSize: 12,
        fontFamily: undefined,
        fontWeight: '400'
    },
    loginButton: {
        marginHorizontal: 30,

    },
    buttonGradient: {
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
    },
    greyButton: {
        marginTop: 15,
        backgroundColor: colors.whiteF2F2F2, height: 45, borderRadius: 100, alignItems: "center",
        justifyContent: "center",
    },
    bottom_sheet: {
        backgroundColor: 'white',
        width: "90%",
        elevation: 10,
        borderRadius: 13
    },
    botton_view: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: 'rgba(0, 0,0, .6 )'
    },
    mobileTextInput: {
        height: 33,
        width: '82.5%',
        marginStart: 11,
        fontFamily: "SegoeUI",
        fontSize: 15,
    }
});