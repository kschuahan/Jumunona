import { StyleSheet } from 'react-native'
import { colors } from './AppColors';
import { fontFamilty } from './Fonts';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 6
    },
    profileProduct: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.lightGrey, borderRadius: 8, marginHorizontal: 12
    },
    profile: {
        flexDirection: 'row',
        marginTop: 50,
        justifyContent: 'space-between'
    },
    textStyle: {
        color: colors.black,
        fontSize: 12,
        fontFamily:fontFamilty.regular
    }
});