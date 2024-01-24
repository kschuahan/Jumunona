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



export const AgeBottomSheet = ({ isShow = false, onClose }) => {

    const data = createArray()
    const [select, setSelect] = useState(data.length - 3)

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
                        borderTopLeftRadius: 26,
                        borderTopRightRadius: 26,
                        paddingTop: 10,
                        width: '100%',
                        flex: 0.5
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: "center"
                        }}>
                        <View></View>
                        <View>

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
                        showsVerticalScrollIndicator={false}
                        data={data}
                        inverted
                        renderItem={({ item, index }) =>
                            <View>
                                <ReasonCell item={item} isSelected={index == select} onSelect={() => {
                                    setSelect(index)
                                }} />
                            </View>
                        }
                    />
                    <OKButton onClick={onClose} />
                </Pressable>
            </Pressable >
        </Modal >

    )
}


function createArray() {
    const d = new Date();
    let year = d.getFullYear();
    let end = year
    let start = year - 100
    return Array.from({ length: end - start + 1 },
        (_, index) => start + index);
}


const ReasonCell = ({ item, isSelected, onSelect }) => {
    return (
        <Pressable
            onPress={() => {
                onSelect();
            }}>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 15,
                    paddingHorizontal: 11,
                    backgroundColor: colors.white,
                }}>
                <Text
                    style={[
                        styles.textStyle,
                        {
                            fontSize: 16,
                            color: isSelected ? colors.lightOrange : colors.black121212,
                            width: '100%',
                            textAlign: 'center'
                        },
                    ]}>
                    {item}
                </Text>

            </View>
        </Pressable>
    );
};

const Separator = () => {
    return <View style={{ height: 1, backgroundColor: colors.darkWhite }} />;
};


const OKButton = ({
    text = "OK",
    endColor = colors.white,
    startorange = colors.white,
    onClick,
}) => {
    return (
        <TouchableOpacity onPress={onClick} style={{
            marginVertical: 20,

            borderRadius: 18,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: "#959595"

        }}>
            <LinearGradient
                colors={[startorange, endColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Text
                    style={[
                        styles.textStyle,
                        { fontWeight: 'bold', fontSize: 16, paddingHorizontal: 19 },
                    ]}>
                    {text}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};