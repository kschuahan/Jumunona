import { Modal, View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { AppString } from "../../utils/AppStrings";
import { styles } from "../../utils/AppStyles";
import { colors } from "../../utils/AppColors";
import { fontFamilty } from "../../utils/Fonts";
import { appIcons } from "../../utils/AppIcons";
import { LinearGradient } from "expo-linear-gradient";

interface Guarntees {
    id: number
    title: string
    desc: string
}

const guarantees: Guarntees[] = [
    {
        id: 1,
        title: "Цена",
        desc: "Налог включен в стоимость товара"
    },
    {
        id: 2,
        title: "Доставка",
        desc: "Бесплатная доставка (23-34 дней) Авиадоставка (5-8 дней)"
    },
    {
        id: 3,
        title: "Трекинг",
        desc: "Посылка отслеживается в приложении на странице заказа"
    },
    {
        id: 4,
        title: "Отмена заказа",
        desc: "Если вы передумаете, у вас есть 2 часа после оплаты, чтобы отменить заказ"
    },
    {
        id: 5,
        title: "Возврат",
        desc: "У вас есть 7 дней на возврат без причины, при соблюдении соответствующих условий"
    },
    {
        id: 6,
        title: "Возврат средств",
        desc: "После возврата, деньги будут зачислены на ваш счет в течение 24 часов"
    },

]
const ProuductGuanteeScreen = ({ isShow = false, onClose }) => {
    return <Modal transparent={true} animationType={"slide"} visible={isShow} onRequestClose={onClose} >
        <View style={[styles.botton_view, { backgroundColor: 'rgba(0, 0,0, .7 )', justifyContent: "flex-end", }]}>
            <View style={{
                paddingHorizontal: 10, backgroundColor: colors.white, borderTopLeftRadius: 13,
                borderTopRightRadius: 13, width: "100%", flex: 0.8
            }}>
                <View style={{
                    flexDirection: "row", alignContent: "center", alignItems: "center",
                    alignSelf: "center", marginTop: 23.5, marginBottom: 12
                }}>
                    <Image
                        source={appIcons.check}
                        style={{ width: 20, height: 20, tintColor: "#FF7600", marginTop: 4, alignSelf: "center" }}
                    />
                    <Text style={[styles.textStyle, { marginLeft: 7 }]}>{AppString.gurantee_jumunona}</Text>
                </View>
                <FlatList
                    data={guarantees}
                    renderItem={({ item }) =>

                        <View style={{ margin: 14 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Image
                                    source={appIcons.checked}
                                    style={{ width: 20, height: 20, tintColor: "#FF7600", marginTop: 4 }}
                                />
                                <View style={{ marginLeft: 13, flexDirection: "column" }}>
                                    <Text style={[styles.textStyle, { fontFamily: fontFamilty.bold, fontSize: 16, marginBottom: 7 }]}>{item.title}</Text>
                                    <Text style={[styles.textStyle, { fontSize: 15 }]}> {item.desc}</Text>
                                </View>
                            </View>
                        </View>
                    }
                    showsVerticalScrollIndicator={false}
                />
                <CommonButton text={"OK"} startorange={colors.startOrange} endColor={colors.endOrange} onClick={onClose} />
            </View>

        </View>
    </Modal>
}


const CommonButton = ({ text, endColor = colors.endOrange,
    startorange = colors.startOrange, onClick }) => {

    return (
        <TouchableOpacity onPress={onClick} style={{ marginBottom: 30, marginTop: 20 }} >
            <LinearGradient
                colors={[startorange, endColor]}
                start={{ x: 0.4, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    borderRadius: 1000,
                    marginEnd: 10,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: "center"
                }}
            >
                <Text
                    style={[
                        styles.textStyle,
                        { color: colors.white, fontFamily: "SegoeUI", fontSize: 14 },
                    ]}
                >
                    {text}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}
export default ProuductGuanteeScreen