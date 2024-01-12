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



export const RegionBottonSheet = ({ isShow = false, onClose, data = [], title = '' }) => {

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
                                {title}
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
                    <FlatList
                        style={{ marginTop: 5 }}
                        scrollEnabled={data.length > 8 ? true : false}
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={({ item, index }) =>
                            <View>
                                <ReasonCell item={item} isSelected={index == select} onSelect={() => {
                                    setSelect(index)
                                }} />
                                <Separator />
                            </View>
                        }
                    />
                    <OKButton onClick={onClose} />
                </Pressable>
            </Pressable >
        </Modal >

    )
}


const ReasonCell = ({ item, isSelected, onSelect }) => {
    return (
        <Pressable
            onPress={() => {
                onSelect();
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 15,
                    paddingHorizontal: 11,
                    backgroundColor: colors.white,
                }}>
                <Text
                    style={[
                        styles.textStyle,
                        {
                            fontSize: 16,
                            color: colors.black121212,
                            width: '90%'
                        },
                    ]}>
                    {item}
                </Text>

                {isSelected ? (
                    <CheckmarkCircle width={22} height={22} color={colors.lightOrange} />
                ) : (
                    <EllipsisHorizontalNormal width={22} height={22} />
                )}
                {/* <Ionicons
            name={item.isSelected ? 'checkmark-circle' : 'ellipse-outline'}
            size={25}
            color={item.isSelected ? colors.startOrange : '#CECECE'}
          /> */}
            </View>
        </Pressable>
    );
};

const Separator = () => {
    return <View style={{ height: 1, backgroundColor: colors.darkWhite }} />;
};


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