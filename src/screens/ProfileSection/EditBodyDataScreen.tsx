import { View, Text, FlatList, TouchableOpacity } from "react-native"
import { CustomHeader } from "../../components/Header"
import { AppString } from "../../utils/AppStrings"
import { styles } from "../../utils/AppStyles"
import GrayCautionIcon from '../../../assets/Icons/GrayCaution.svg';
import { ScrollView } from "react-native-virtualized-view";
import { colors } from "../../utils/AppColors";
import CautionIcon from '../../../assets/Icons/Caution.svg';
import MasonryList from '@react-native-seoul/masonry-list';


export const EditBodyDataScreen = ({ navigation }) => {
    return (
        <View style={[styles.container, { padding: 0 }]}>
            <CustomHeader navigation={navigation} title={AppString.change_body_data} />
            <ScrollView style={{ paddingHorizontal: 12 }}>
                <View
                    style={{ flexDirection: "row", marginTop: 16, marginBottom: 6, gap: 5 }}
                >
                    <GrayCautionIcon style={{ marginTop: 2 }} />
                    <Text
                        style={[styles.textStyle, { color: "#989898", fontWeight: "400", fontSize: 13 }]}
                    >
                        Для того чтобы гарантировать получение правильного размера и избежать неудобств, связанных с ошибками в измерениях, мы подберем для вас подходящий размер на основе данных о вашем теле.
                    </Text>
                </View>
                {/* Basic Detail  */}
                <Text
                    style={[styles.textStyle, { color: "#14100D", fontWeight: "500", fontSize: 17, marginHorizontal: 10, marginBottom: 6 }]}
                >
                    {AppString.basic_data}
                </Text>
                <BasicDataFlatList />
                <Text
                    style={[styles.textStyle, { color: "#14100D", fontWeight: "500", fontSize: 17, marginHorizontal: 10, marginBottom: 6, marginTop: 22 }]}
                >
                    {AppString.please_fill_body_info}
                </Text>
                <BodyInforView />
            </ScrollView>
        </View>
    )
}


const BasicDataFlatList = ({ }) => {
    return (
        <FlatList
            style={{
                backgroundColor: colors.white,
                paddingHorizontal: 12,
                borderRadius: 13
            }}
            data={[1, 2, 3, 4]}
            renderItem={({ item, index }) =>
                <View
                    style={{
                        marginVertical: 13,
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <Text
                        style={[styles.textStyle, { color: "#333333", fontWeight: "500", fontSize: 15 }]}
                    >
                        Имя
                    </Text>
                    <Text
                        style={[styles.textStyle, { color: "#111111", fontWeight: "400", fontSize: 15 }]}
                    >
                        Я
                    </Text>
                </View>
            }
            scrollEnabled={false}
        />



    )
}

const BodyInforView = ({ }) => {
    return (
        <FlatList
            style={{
                backgroundColor: colors.white,
                paddingHorizontal: 12,
                borderRadius: 13
            }}
            data={[1, 2, 3, 4]}
            scrollEnabled={false}
            renderItem={({ item, index }) =>
                <View
                    style={{
                        marginVertical: 13,
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <Text
                        style={[styles.textStyle, { color: "#333333", fontWeight: "500", fontSize: 15 }]}
                    >
                        Ширина плеч {" "}
                        <CautionIcon width={15} height={15} style={{ alignSelf: "center" }} />
                    </Text>
                    <Text
                        style={[styles.textStyle, { color: "#111111", fontWeight: "400", fontSize: 15 }]}
                    >
                        Я
                    </Text>

                    <MasonryList
                        data={[1, 3, 2, 4, 5]}
                        keyExtractor={item => {
                            return item.id;
                        }}
                        style={{ marginHorizontal: 7 }}
                        numColumns={2}
                        renderItem={({ item }) => {
                            return <View>

                            </View>
                        }}

                    />
                </View>
            }
        />
    )
}