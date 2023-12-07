import { Modal, View, Image, Text, TouchableOpacity, FlatList, Pressable } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppString } from "../../utils/AppStrings";
import { styles } from "../../utils/AppStyles";
import { appIcons, imagesUrl, productImages } from "../../utils/AppIcons";
import { colors } from "../../utils/AppColors";
import { fontFamilty } from "../../utils/Fonts";
import { dimensions } from "../../utils/sizes";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";


const ProductImageScreeen = ({isShow = false, onClose }) => {

    const [activeIndex, setActiveIndex] = useState(0);

    const handleViewableItemsChanged = useRef(({ viewableItems, changed }) => {
        if (changed && changed.length > 0) {
            console.log("Visible items are", viewableItems[0].index);
            console.log("Changed in this iteration", changed[0]);
            setActiveIndex(changed[0].index);
        }
    });
    return (
       
            <View style={[styles.botton_view, { backgroundColor: colors.black, justifyContent: "center", flex: 1,}]}>
            {/* <FlatList style={{ flexGrow: 0 }}
                        horizontal={true}
                        snapToAlignment='center'
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        data={productImages}
                        decelerationRate={'normal'}
                        scrollEventThrottle={16}
                        onViewableItemsChanged={handleViewableItemsChanged.current}
                        viewabilityConfig={{
                            viewAreaCoveragePercentThreshold: 50, waitForInteraction: true,
                            minimumViewTime: 5
                        }}
                        renderItem={({ item }) => 
                          }/> */}
                           <ImageZoom uri={imagesUrl.shoes} 
                            minScale={1}
                            minPanPointers={1}
                            onInteractionStart={() => console.log('onInteractionStart')}
                            onInteractionEnd={() => console.log('onInteractionEnd')}
                            onPanStart={() => console.log('onPanStart')}
                            onPanEnd={() => console.log('onPanEnd')}
                            onPinchStart={() => console.log('onPinchStart')}
                            onPinchEnd={() => console.log('onPinchEnd')}
                            style={{
                                overflow: 'hidden',
                                height: diamentions.height,
                                width: diamentions.width
                            }}
                
                            resizeMode="contain"
                           />
            </View>
    )
}

export default ProductImageScreeen