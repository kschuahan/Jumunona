import { AppState, Modal, Pressable, Text, TouchableOpacity, View } from "react-native"
import { colors } from "../../utils/AppColors"
import { styles } from "../../utils/AppStyles"
import { AppString } from "../../utils/AppStrings"

import CloseIcon from '../../../assets/Icons/closeIcon.svg';





export const SelectResionalScreen = ({ isShow = false, onClose }) => {

    return <Modal
        transparent={true}
        animationType={'slide'}
        visible={isShow}
        onRequestClose={onClose}>
        <Pressable onPress={onClose}
            style={[
                styles.botton_view,
                { backgroundColor: 'rgba(0, 0,0, .7 )', justifyContent: 'flex-end' },
            ]}>
            <Pressable
                style={{
                    paddingHorizontal: 10,
                    backgroundColor: colors.white,
                    borderTopLeftRadius: 13,
                    borderTopRightRadius: 13,
                    width: '100%',
                    flex: 0.79,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        justifyContent:'center'
                    }}>


                    <Text
                        style={[
                            styles.textStyle,
                            {
                                fontSize: 21,
                                color: colors.black,
                                textAlign:'center'
                            },
                        ]}>
                        {AppString.select_your_region}
                    </Text>
                    <TouchableOpacity
                        style={{  alignSelf: 'flex-end' }}
                        onPress={() => {
                            onClose();
                        }}>
                        <CloseIcon width={15} height={15} />
                    </TouchableOpacity>
                </View>


            </Pressable>
        </Pressable>
    </Modal>
}