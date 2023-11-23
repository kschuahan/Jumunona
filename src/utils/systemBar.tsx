import NavigationBarColor from "react-native-navigation-bar-color";

interface Color{
    color:string;
}

export const setSystemBarColor = (color: Color) => {
  NavigationBarColor.changeNavigationBarColor(color);
};