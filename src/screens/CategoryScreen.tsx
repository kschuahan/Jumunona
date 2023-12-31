import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  Image,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MasonryList from "@react-native-seoul/masonry-list";
import { dimensions } from "../utils/sizes";

interface Category {
  id: number;
  desc: string;
}
interface Product {
  id: number;
  imageURL: string | any;
  desc: string;
}
const categoryData: Category[] = [
  { id: 1, desc: "Men's" },
  { id: 2, desc: "Women's" },
  { id: 3, desc: "Child" },
  { id: 4, desc: "Baby" },
  { id: 5, desc: "Home" },
  { id: 6, desc: "Electro" },
  { id: 7, desc: "Auto" },
  { id: 8, desc: "Home" },
  { id: 9, desc: "Beauty" },
  { id: 10, desc: "Suits" },
  { id: 11, desc: "Accesso" },
  { id: 12, desc: "Make-Up" },
];
const mensCategoryData: Category[] = [
  { id: 1, desc: "Hoodies" },
  { id: 2, desc: "Pants" },
  { id: 3, desc: "Overalls" },
  { id: 4, desc: "Casual Shorts" },
  { id: 5, desc: "Short Jacket" },
  { id: 6, desc: "衬衫" },
  { id: 7, desc: "运动套装" },
  { id: 8, desc: "羽绒服" },
  { id: 9, desc: "西装" },
  { id: 10, desc: "More..." },
];
const shoeImageURL = require("../../assets/shoe.jpg");
const china = require("../../assets/china.png");
const data: Product[] = [
  {
    id: 1,
    imageURL: shoeImageURL,
    desc: "600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
  },
  {
    id: 2,
    imageURL: shoeImageURL,
    desc: "600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
  },
  {
    id: 3,
    imageURL: shoeImageURL,
    desc: "600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
  },
  {
    id: 4,
    imageURL: shoeImageURL,
    desc: "600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
  },
  {
    id: 5,
    imageURL: shoeImageURL,
    desc: "600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
  },
  {
    id: 6,
    imageURL: shoeImageURL,
    desc: "600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
  },
  {
    id: 7,
    imageURL: shoeImageURL,
    desc: "600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
  },
  {
    id: 8,
    imageURL: shoeImageURL,
    desc: "600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
  },
  {
    id: 9,
    imageURL: shoeImageURL,
    desc: "600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
  },
  {
    id: 10,
    imageURL: shoeImageURL,
    desc: "600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
  },
];

const CategoryScreen = () => {
  const [activeItemPrimaryCategory, setActiveItemPrimaryCategory] = useState(1);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.searchBarBG}>
          <Ionicons name="search-outline" size={17} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Suggested Category"
          />
        </View>
      </View>
      <View style={styles.primaryCategories}>
        <FlatList
          style={styles.primaryCategoriesContent}
          data={categoryData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => {
            return item.id.toString();
          }}
          renderItem={({ item }) => {
            return (
              <View style={{ flex: 1, marginRight: 22 }}>
                <TouchableOpacity
                  onPress={() => setActiveItemPrimaryCategory(item.id)}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color:
                        activeItemPrimaryCategory === item.id
                          ? "#ff7600"
                          : "black",
                    }}
                  >
                    {item.desc}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
        <View style={styles.downArrowButton}>
          {/* <View style={{ height: 20, width: 3, backgroundColor: '#E2E2E2', borderRadius: 100 }} /> */}
          <Ionicons
            name="chevron-down-outline"
            size={24}
            style={
              {
                // color: isA ? "#ff7600" : "black",
              }
            }
          />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollable}>
        <View style={styles.secondaryCategoriesBG}>
          <FlatList
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            data={mensCategoryData}
            keyExtractor={(item) => {
              return item.id.toString();
            }}
            numColumns={5}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flex: 1,
                    marginTop: 8,
                  }}
                >
                  {item.id === 10 ? (
                    <TouchableOpacity style={{ alignItems: "center" }}>
                      <Ionicons name="ellipsis-horizontal-outline" size={50} />
                      <Text style={{ fontSize: 13 }}>More...</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={{ alignItems: "center" }}>
                      <Ionicons name="shirt-outline" size={50} />
                      <Text style={{ fontSize: 13 }}>{item.desc}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            }}
          />
        </View>
        <View style={styles.productsGrid}>
          <MasonryList
            data={data}
            keyExtractor={(item) => {
              return item.id;
            }}
            numColumns={2}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    borderRadius: 12,
                    backgroundColor: "#ffffff",
                    marginHorizontal: 4,
                    marginVertical: 4,
                    width: "auto",
                    height: 326,
                    borderColor: "#f1f1f1",
                    marginTop: 8,
                  }}
                >
                  <Image
                    source={item.imageURL}
                    style={{
                      height: 265,
                      paddingHorizontal: 1,
                      width: "auto",
                      borderRadius: 12,
                      backgroundColor: "#f1f1f1",
                    }}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      paddingLeft: 7,
                    }}
                  >
                    {/* <Ionicons
                      name="globe-outline"
                      size={15}
                      style={{ paddingTop: 3 }}
                    /> */}
                    <Image
                      source={china}
                      style={{ height: 15, width: 15, marginTop: 3 }}
                    />
                    <Text
                      style={{
                        marginLeft: 4,
                        fontSize: 15,
                        paddingBottom: 1,
                      }}
                      numberOfLines={1}
                    >
                      Футболка
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", paddingLeft: 8 }}>
                    <View style={{ flexDirection: "row", width: "30%" }}>
                      <Text style={{ fontSize: 17, color: "#ff7600" }}>
                        999
                      </Text>
                      <Text
                        style={{
                          paddingTop: 6,
                          color: "#ff7600",
                          fontSize: 12,
                        }}
                      >
                        c.
                      </Text>
                    </View>
                    <Text
                      numberOfLines={1}
                      style={{ width: "70%", color: "#AAAAAA", paddingTop: 3 }}
                    >
                      {item.desc}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
  },
  headerContainer: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: "stretch",
    justifyContent: "flex-start",
    borderRadius: 24,
    paddingTop: 12,
    paddingBottom: 4,
    width: dimensions.width,
    paddingHorizontal: 10
  },
  searchBarBG: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    width: '100%',
    height: 33,
    borderRadius: 24,
  },
  searchIcon: {
    paddingLeft: 16,
    paddingTop: 8,
    color: "#999999",
  },
  searchInput: {
    height: 33,
    paddingLeft: 8,
    backgroundColor: "#ffffff",
  },
  primaryCategories: {
    flexDirection: "row",
    width: dimensions.width,
    elevation:1,
    height: 35,
    gap: 6,
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
  },
  primaryCategoriesContent: {
    paddingTop: 8,
    paddingLeft: 16,
    flex: 0.9,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 12,
  },
  downArrowButton: {
    flexDirection: "row",
    height: '100%',
    flex: 0.1,
    borderTopRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  scrollable: {
    paddingTop: 0,
    backgroundColor: "#F6F6F6",
  },
  secondaryCategoriesBG: {
    width: dimensions.width,
    height: 182,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 12,
    paddingHorizontal: 6,
    borderBottomRightRadius: 12,
  },
  productsGrid: {
    width: dimensions.width,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginTop: 8,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
});
