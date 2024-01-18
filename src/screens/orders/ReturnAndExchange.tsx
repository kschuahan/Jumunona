import { FlatList, Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { CustomHeader } from "../../components/Header"
import { styles } from "../../utils/AppStyles"
import { AppString } from "../../utils/AppStrings"
import { colors } from "../../utils/AppColors"
import { appIcons, imagesUrl } from "../../utils/AppIcons"
import ChevronFwdOutlineIcon from '../../../assets/Icons/chevronForwardOutline.svg';
import { RouteNames } from "../../utils/RouteNames"
import LinearGradient from "react-native-linear-gradient"

export const ReturnAndExchangeScreen = ({ navigation }) => {

    const items = [AppString.refund, AppString.return, AppString.exchange, AppString.return];
    return (
    <View style={[styles.container, { padding: 0 }]}>
        <CustomHeader navigation={navigation} title={AppString.return_exchange} />

        <FlatList data={items}
            style={{ marginTop: 5, paddingHorizontal: 6, paddingBottom: 200 }}
            renderItem={({ item, index }) =>
                <ItemContainer item={item} navigation={navigation} />
            }
            ListFooterComponent={() =>
                <View
                    style={{ height: 50 }}
                />
            }
        />
    </View>
    )
}


const ItemContainer = ({ item, navigation }) => {
    return (
    <View
        style={{
            marginVertical: 4.5,
            padding: 12,
            backgroundColor: colors.white,
            borderRadius: 13
        }}
    >
        <TouchableWithoutFeedback
            onPress={ () => {
                item == AppString.return ? 
                navigation.navigate(RouteNames.refund_details)
                : item == AppString.refund ? 
                navigation.navigate(RouteNames.exchangeDetail, { returnInProgress: false, returnCanceled: false })
                : navigation.navigate(RouteNames.exchangeDetail, { returnInProgress: false, returnCanceled: true })

                
            }}
        >
            <View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: "space-between"
                }}
            >
                <TouchableOpacity
                    onPress={() => {


                    }}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <Image
                        source={appIcons.china}
                        style={{ width: 18, height: 18 }}
                    />
                    <Text style={{
                        paddingLeft: 9,
                        color: colors.black, fontSize: 16, fontWeight: 'bold'
                    }}>店铺名称</Text>
                    <ChevronFwdOutlineIcon
                        width={8}
                        height={10}
                        style={{
                            borderColor: '#CDCDCD',
                            marginTop: 2,
                            marginLeft: 8,
                        }}
                    />
                </TouchableOpacity>
                <Text style={{
                    color: colors.maroonC9372D, fontSize: 17, fontWeight: '600'
                }}>{item}</Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    marginTop: 14
                }}
            >
                <Image
                    source={{ uri: imagesUrl.shoes }}
                    style={{ width: 90, height: 90, borderRadius: 11 }}
                />
                <View
                    style={{
                        marginLeft: 11,
                        width: "70%",
                        alignItems: "flex-start",
                        justifyContent: "space-between"
                    }}
                >
                    <View>
                        <Text style={{
                            color: "#0F0F0F", fontSize: 15, fontWeight: '400', maxHeight: 45
                        }}>
                            若过度长的话只显示第一等等等等 名称显示全名等等等等等等等
                        </Text>

                        <Text style={{
                            color: colors.grey979797, fontSize: 14, fontWeight: '400', marginTop: 3
                        }}>
                            White; 38
                        </Text>
                    </View>
                    <Text style={{
                        color: "#0F0F0F", fontSize: 14, fontWeight: '400'
                    }}>
                        {AppString.return}: 368с.
                    </Text>
                </View>
            </View>
            </View>
        </TouchableWithoutFeedback>
        {
            item == AppString.return ?
                <ExchageCompleteView viewDetailClick={() => {
                    navigation.navigate(RouteNames.exchangeDetail, { returnInProgress: false, returnCanceled: false })
                }} />
                : item == AppString.exchange ?
                    <ProcessingView viewDetailClick={() => {
                        navigation.navigate(RouteNames.exchangeDetail, { returnInProgress: true, returnCanceled: false })
                    }} />
                    : <RefundCompleteView viewDetailClick={() => {
                        navigation.navigate(RouteNames.exchangeDetail, { returnInProgress: false, returnCanceled: true })
                    }} />
        }
    </View>
    )
}

const RefundCompleteView = ({ viewDetailClick }) => {
    return (
        <View>
            <View
                style={{
                    backgroundColor: "#FAFAFA",
                    marginTop: 12,
                    padding: 10,
                    borderRadius: 3,
                    justifyContent: "space-between",
                    flexDirection: "row"
                }}
            >
                <Text style={{
                    color: colors.balc111111, fontSize: 15, fontWeight: 'bold',
                }}>
                    {AppString.refund_completed}
                </Text>

                <Text style={{
                    color: colors.balc111111, fontSize: 15, fontWeight: '400'
                }}>
                    159с.
                </Text>

            </View>
            <View
                style={{
                    marginTop: 12,
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    gap: 12
                }}
            >
                <TouchableOpacity
                    style={{
                        borderRadius: 15,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: "#CCCCCC",
                        borderWidth: 1,
                        paddingHorizontal: 15
                    }}
                >
                    <Text
                        style={[
                            styles.textStyle,
                            { color: "#111111", fontWeight: '400', fontSize: 14 },
                        ]}>
                        {AppString.delete}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        borderRadius: 15,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: colors.lightOrange,
                        borderWidth: 1,
                        paddingHorizontal: 15
                    }}

                    onPress={viewDetailClick}
                >
                    <Text
                        style={[
                            styles.textStyle,
                            { color: colors.lightOrange, fontWeight: '400', fontSize: 14 },
                        ]}>
                        {AppString.details}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>


    )
}

const ProcessingView = ({ viewDetailClick }) => {
    return (
        <View>
            <View
                style={{
                    backgroundColor: "#FAFAFA",
                    marginTop: 12,
                    padding: 10,
                    borderRadius: 3,
                    justifyContent: "space-between",
                    flexDirection: "row"
                }}
            >
                <Text style={{
                    color: colors.lightOrange, fontSize: 13, fontWeight: '600',
                }}>
                    {AppString.refund_processing}
                </Text>

                <Text style={{
                    color: "#0F0F0F", fontSize: 12, fontWeight: '400',
                }}>
                    {AppString.will_be_processed_within}
                    <Text style={{
                        color: colors.lightOrange, fontSize: 12, fontWeight: '400',
                    }}>
                        8 {AppString.days}
                    </Text>
                </Text>
            </View>
            <View
                style={{
                    marginTop: 12,
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    gap: 12
                }}
            >
                <TouchableOpacity

                >
                    <LinearGradient
                        colors={[colors.startOrange, colors.endOrange]}
                        start={{ x: 0.4, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            borderRadius: 15,
                            height: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 15
                        }}>
                        <Text
                            style={[
                                styles.textStyle,
                                { color: colors.white, fontWeight: '400', fontSize: 14 },
                            ]}>
                            {AppString.cancel}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        borderRadius: 15,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: colors.lightOrange,
                        borderWidth: 1,
                        paddingHorizontal: 15
                    }}
                    onPress={viewDetailClick}
                >
                    <Text
                        style={[
                            styles.textStyle,
                            { color: colors.lightOrange, fontWeight: '400', fontSize: 14 },
                        ]}>
                        {AppString.details}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const ExchageCompleteView = ({ viewDetailClick }) => {
    return (
        <View>
            <View
                style={{
                    backgroundColor: "#FAFAFA",
                    marginTop: 12,
                    padding: 10,
                    borderRadius: 3,
                    justifyContent: "space-between",
                    flexDirection: "row"
                }}
            >
                <Text style={{
                    color: colors.balc111111, fontSize: 15, fontWeight: 'bold',
                }}>
                    {AppString.exchange_completed}
                </Text>

                <Text style={{
                    color: colors.balc111111, fontSize: 15, fontWeight: '400'
                }}>
                    {AppString.sucessfully}
                </Text>
            </View>

            <View
                style={{
                    marginTop: 12,
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    gap: 12
                }}
            >
                <TouchableOpacity
                    style={{
                        borderRadius: 15,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: "#CCCCCC",
                        borderWidth: 1,
                        paddingHorizontal: 15
                    }}
                >
                    <Text
                        style={[
                            styles.textStyle,
                            { color: "#111111", fontWeight: '400', fontSize: 14 },
                        ]}>
                        {AppString.delete}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        borderRadius: 15,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: colors.lightOrange,
                        borderWidth: 1,
                        paddingHorizontal: 15
                    }}
                    onPress={viewDetailClick}
                >
                    <Text
                        style={[
                            styles.textStyle,
                            { color: colors.lightOrange, fontWeight: '400', fontSize: 14 },
                        ]}>
                        {AppString.details}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

