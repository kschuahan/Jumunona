import { Image, Modal, Pressable, Text, TouchableOpacity, View, TextInput } from "react-native"
import { colors } from "../../utils/AppColors"
import { styles } from "../../utils/AppStyles"
import CloseIcon from '../../../assets/Icons/closeIcon.svg';
import { fontFamily } from "../../utils/Fonts";
import { imagesUrl } from "../../utils/AppIcons";
import { } from "react-native-gesture-handler";
import { useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { AppString } from "../../utils/AppStrings";

export const DeliveryNotePopup = ({ isShow = false, onClose }) => {

    const [note, setNote] = useState("")
    return (
        <Modal
            transparent={true}
            animationType={'slide'}
            visible={isShow}
            onRequestClose={onClose}
        >
            <Pressable onPress={onClose}
                style={[
                    styles.botton_view,
                    { backgroundColor: 'rgba(0, 0,0, .7 )', justifyContent: 'flex-end' },
                ]}>
                <Pressable
                    style={{
                        paddingHorizontal: 12,
                        backgroundColor: colors.white,
                        borderTopLeftRadius: 13,
                        borderTopRightRadius: 13,
                        paddingTop: 10,
                        width: '100%',
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: "center"
                        }}>
                        <View></View>
                        <View>

                            <Text
                                style={{
                                    fontSize: 17,
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    color: colors.black
                                }}
                            >
                                Примечание
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={{ marginEnd: 12 }}

                            onPress={() => {
                                onClose();
                            }}>
                            <CloseIcon width={11} height={11} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TextInput
                            value={note}
                            placeholder="Если у вас есть примечание к заказу, пожалуйста, укажите их здесь."
                            placeholderTextColor={'#979797'}
                            maxLength={200}
                            style={{
                                height: 144,
                                backgroundColor: colors.whiteF6F6F6,
                                marginTop: 21,
                                marginBottom: 28,
                                borderRadius: 13,
                                textAlign: "auto",
                                padding: 13,
                                paddingVertical: 10,
                                fontFamily: fontFamily.regular,
                                fontSize: 15,
                                verticalAlign: 'top',

                            }}
                            onChangeText={(text) => {
                                setNote(text)
                            }}
                            multiline={true}

                        />
                        <Text style={[styles.textStyle, {
                            fontSize: 11, color: colors.grey
                            , position: 'absolute', bottom: 35, end: 12
                        }]}>{`${note.length}/200`}</Text></View>
                    <OKButton onClick={onClose} />
                </Pressable>
            </Pressable >
        </Modal>

    )
}


const OKButton = ({
    text = "OK",
    endColor = colors.endOrange,
    startorange = colors.startOrange,
    onClick,
}) => {
    return (
        <TouchableOpacity onPress={onClick} style={{ marginBottom: 38 }}>
            <LinearGradient
                colors={[startorange, endColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    borderRadius: 18,
                    height: 36,
                    justifyContent: 'center',
                    alignItems: 'center',

                }}>
                <Text
                    style={[
                        styles.textStyle,
                        { color: colors.white, fontWeight: '400', fontSize: 16, paddingHorizontal: 19 },
                    ]}>
                    {text}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};