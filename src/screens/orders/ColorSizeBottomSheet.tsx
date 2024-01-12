import { Image, Modal, Pressable, Text, TouchableOpacity, View, TextInput, FlatList } from "react-native"
import { colors } from "../../utils/AppColors"
import { styles } from "../../utils/AppStyles"
import CloseIcon from '../../../assets/Icons/closeIcon.svg';
import { fontFamily } from "../../utils/Fonts";
import { imagesUrl } from "../../utils/AppIcons";
import { } from "react-native-gesture-handler";
import { useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { AppString } from "../../utils/AppStrings";
import CheckmarkCircle from '../../../assets/Icons/CircleOrange.svg';
import EllipsisHorizontalNormal from '../../../assets/Icons/CircleGrey.svg';
import { ColorOptions, QuanityView, SizeAndBuyingForView } from "../Product/AddSelectProductSizeColorScreen";



export const ColorSizeBottonSheet = ({ isShow = false, onClose, data = [], title = '' }) => {

    const [select, setSelect] = useState(0)
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
                        flex: data.length > 8 ? 0.7 : undefined
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
                                {AppString.substitution}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={{ marginEnd: 12 }}

                            onPress={() => {
                                onClose();
                            }}>
                            <CloseIcon width={15} height={15} />
                        </TouchableOpacity>
                    </View>
                    <ColorOptions />
                    <View
                        style={{
                            height: 1,
                            marginVertical: 13,
                            backgroundColor: colors.darkWhite,
                        }}
                    />
                    <SizeAndBuyingForView isSize={true} />
                    <View
                        style={{
                            height: 1,
                            marginVertical: 13,
                            backgroundColor: colors.darkWhite,
                        }}
                    />
                    <QuanityView isQuntiry={true} />
                    <OKButton onClick={onClose} />
                </Pressable>
            </Pressable >
        </Modal >

    )
}


const OKButton = ({
    text = "OK",
    endColor = colors.endOrange,
    startorange = colors.startOrange,
    onClick,
}) => {
    return (
        <TouchableOpacity onPress={onClick} style={{ marginVertical: 30 }}>
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