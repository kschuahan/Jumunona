import { AppRegistry, Text, TextInput,AccessibilityInfo } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { DefaultTheme, Provider } from 'react-native-paper';
import { useEffect } from 'react';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        secondaryContainer: 'transparent', // Use transparent to disable the little highlighting oval
    },
};



const Main = () => {

    useEffect(() => {
       // AccessibilityInfo.setAccessibilityContentSizeMultipliers(1, 1, 1, 1); // Disable font scaling

        // if (Text.defaultProps == null) {
        Text.defaultProps = {};
        Text.defaultProps.allowFontScaling = false;

        //}

        // if (TextInput.defaultProps == null) {
        TextInput.defaultProps = TextInput.defaultProps || {};
        TextInput.defaultProps.allowFontScaling = false;
        //}
    }, [])
    return <Provider theme={theme}>
        <App />
    </Provider>
}

AppRegistry.registerComponent(appName, () => Main);
