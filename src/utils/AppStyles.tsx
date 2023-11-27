import { StyleSheet } from 'react-native'
import { colors } from './AppColors';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    profileProduct: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.lightGrey, borderRadius: 4, marginHorizontal: 10
    },
    profile: {
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'space-between'
    },
    textStyle: {
        color: colors.black,
        fontSize: 12
    }
});