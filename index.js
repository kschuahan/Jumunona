import { AppRegistry, Text, TextInput } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { DefaultTheme, Provider } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        secondaryContainer: 'transparent', // Use transparent to disable the little highlighting oval
    },
};

if (Text.defaultProps == null) {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;
  }


const Main = () => {

    return <Provider theme={theme}>
        <App />
    </Provider>
}

AppRegistry.registerComponent(appName, () => Main);
