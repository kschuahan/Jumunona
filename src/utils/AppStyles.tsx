import { StyleSheet } from 'react-native'
import { colors } from './AppColors';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
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