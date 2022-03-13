import React, {PureComponent} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  Image,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {AuthService} from '../../services';
import {users} from '../../config';
import LinearGradient from 'react-native-linear-gradient';

export default class AuthScreen extends PureComponent {
  state = {isLogging: false};

  setIsLogging = isLogging => this.setState({isLogging});

  constructor(props) {
    super(props);
    this.state = {id: ''};
  }

  login = currentUser => {
    const _onSuccessLogin = () => {
      const {navigation} = this.props;
      const opponentsIds = users
        .filter(opponent => opponent.id !== currentUser.id)
        .map(opponent => opponent.id);

      navigation.push('VideoScreen', {opponentsIds});
    };

    const _onFailLogin = (error = {}) => {
      alert(`Error.\n\n${JSON.stringify(error)}`);
    };

    this.setIsLogging(true);

    AuthService.login(currentUser)
      .then(_onSuccessLogin)
      .catch(_onFailLogin)
      .then(() => this.setIsLogging(false));
  };

  render() {
    const {isLogging} = this.state;
    const logoSrc = require('../../../assets/Logo.png');

    return (
      <LinearGradient
        style={styles.bg}
        colors={['#ff832a', '#d980c7', '#cc7fff']}
        locations={[0, 0.9, 1]}>
        <View style={[styles.container, styles.f1]}>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <SafeAreaView style={[styles.centeredChildren, styles.f1]}>
            <Image
              resizeMode="contain"
              source={logoSrc}
              style={styles.logoImg}
            />
            <View
              style={[
                styles.f1,
                styles.centeredChildren,
                {flexDirection: 'row'},
              ]}>
              <Text>{isLogging ? 'Connecting... ' : 'Video Chat'}</Text>
              {isLogging && <ActivityIndicator size="small" color="#1198d4" />}
            </View>
          </SafeAreaView>

          <SafeAreaView style={[styles.authBtns, styles.f1]}>
            {users.map(user => (
              <TouchableOpacity key={user.id} onPress={() => this.login(user)}>
                <View
                  style={[styles.authBtn(user.color), styles.centeredChildren]}>
                  <Text style={styles.authBtnText}>
                    {`Log in as ${user.name}`}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </SafeAreaView>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  f1: {
    flex: 1,
  },
  bg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredChildren: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {},
  logoImg: {
    width: '90%',
    height: '80%',
  },
  authBtns: {
    //justifyContent: 'flex-end',
    marginBottom: 20,
  },
  authBtn: backgroundColor => ({
    backgroundColor,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 25,
    marginVertical: 5,
  }),
  authBtnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  text: {
    fontSize: 32,
    //paddingTop:20,
    //marginBottom:40,
    //flex: 1
  },
  input: {
    backgroundColor: '#ccc',
    width: '100%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
  },
  buttext: {
    color: '#fff',
  },
});
