import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, BackHandler, Dimensions, Modal, Platform, TouchableOpacity, View, SafeAreaView } from "react-native";
import { colors } from "../../utils/AppColors";
import WebView from "react-native-webview";
import { CustomHeader, LogoTitle } from "../../components/Header";
import { Card } from "react-native-paper";
import CloseIcon from '../../../assets/Icons/closeIcon.svg';
import {  } from "react-native-safe-area-context";
import { AppString } from "../../utils/AppStrings";

let diamentions = Dimensions.get('screen')
export const cancelUrl = 'https://dc.tj'
export const approveURL = 'https://acquirg.dc.tj/thanks.php'
export const declineURL = 'https://acquiring.dc.tj/error.php'

export const PaymentWebView = ({ isShow = false, data, onClick }) => {
    const [canGoBack, setCanGoBack] = useState(false);
    const WebViewRef = useRef<WebView>(null);

    console.log(data);
    useEffect(() => {
        if (Platform.OS === 'android') {
            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                () => {
                    if (WebViewRef.current && canGoBack) {
                        WebViewRef.current.goBack();
                        return true; // PREVENT DEFAULT BEHAVIOUR (EXITING THE APP)
                    }
                    return false;
                }
            );

            return () => backHandler.remove();
        }
    }, [canGoBack]);

    const handleOnRequest = () => {
        if (WebViewRef.current && canGoBack) {
            WebViewRef.current.goBack();
            return
        }
        onClick()
    };

    const onStateChange = (state: any) => {
        console.log(state);
        if (state.url.includes(cancelUrl)) {
            onClick()
            //Alert.alert("Payment Error...")
            return
        }

        if (state.url.includes(approveURL)) {
            const urlValues = queryString.parseUrl(state.url)
            console.log("URl is values ", urlValues);
            const { token } = urlValues.query
            if (!!token) {
                onClick(token)
            }
        }
    }

  

    const handleResponse = (data: NavState, WebViewRef: any) => {
        console.log(data.canGoBack); // <- always false, if i can go back further back or not in a webview
        setCanGoBack(data?.canGoBack!);
    };

   
    return <Modal transparent={true} animationType={'slide'} visible={isShow} onRequestClose={handleOnRequest} >
        <SafeAreaView style = {{flex: 1}}>
            <View
                style={{
                    elevation: 2,
                    paddingHorizontal: 13,
                    paddingEnd: 12,
                    borderRadius: 13,
                    backgroundColor: colors.white,
                    borderTopEndRadius: 0,
                    borderTopStartRadius: 0,
                    paddingTop: Platform.OS == 'ios' ? 20 : 20,
                    paddingBottom: 10,
                    marginBottom: 10
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View />
                    
                    <LogoTitle title={AppString.pay} />
                   
                    <TouchableOpacity onPress={onClick} >
                     <CloseIcon width={20} height={20} color={colors.lightOrange}/>
                    </TouchableOpacity>
                </View>
            </View>
            {data ? <WebView
                ref={WebViewRef}
                source={{ html: data }}
                
                onNavigationStateChange={onStateChange}
                startInLoadingState={true}

                renderLoading={() => <ActivityIndicator
                    style={{
                        position: 'absolute', left: diamentions.width * 0.12,
                        top: diamentions.height / 2.4 - 50,
                        zIndex: 9,
                        height: diamentions.width * 0.3,
                        width: diamentions.height * 0.3,
                        borderRadius: 20
                    }}

                    color={colors.lightOrange}
                    size="large" />}
            /> : null}
        </SafeAreaView>
    </Modal>
}


