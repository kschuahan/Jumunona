import {StyleSheet, Image, View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {RouteNames} from '../utils/RouteNames';
import {appIcons} from '../utils/AppIcons';

interface Props {
  navigation: any;
}

const WelcomeScreen: React.FC<Props> = ({navigation: navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(RouteNames.login);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={appIcons.imgLogo} style={styles.logo} />
      </View>
      <Text style={styles.text1}>Jumunona</Text>
      <Text style={styles.text2}>Jumunona e-Commerce Co. Ltd.</Text>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'yellow',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 13,
  },
  logo: {width: 103, height: 103, borderRadius: 24},

  text1: {
    width: 160,
    height: 41,
    fontSize: 31,
    color: '#FF7600',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    fontFamily: 'Segoe UI Bold',
  },
  text2: {
    textAlign: 'center',
    color: '#BBBBBB',
    marginBottom: 64,
    fontFamily: 'Segoe UI',
    position: 'absolute',
    bottom: 0,
  },
});
