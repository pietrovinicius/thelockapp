import React, { Component } from 'react';
import {
  WebView,
  Text,
  View,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { BackHandler } from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {      
    };
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ timePassed: true }) }, 3000);
  }

  componentWillMount() {
    console.log("=================WillMount()");
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    <ActivityIndicator size="large" color="#000000" />
  }

  componentWillUnmount() {
    console.log("=================WillUnMount()");
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    console.log("=================Back()");
    Alert.alert(
      '',
      'Deseja Sair do App?',
      [
        { text: 'Cancelar', onPress: () => console.log('=============Cancelar'), style: 'cancel' },
        {
          text: 'Sim', onPress: (() => {
            BackHandler.exitApp();
            console.log('=========Sim');
          })
        },
      ],
      { cancelable: false }
    )
    return true;
  };

  displaySpinner() {
    return (
      <View style={styles.loading}>
        {console.log("=================Carregando ActivityIndicador")}        
        <ActivityIndicator          
          size="large" color="#000000" />
        <Text>Carregando...</Text>
      </View>
    );
  }
  render() {
      return (
        <WebView
          source={{ uri: 'http://www.thelock.com.br/app/' }}
          style={styles.WebView}
          startInLoadingState={true}
          renderLoading={ () => { return this.displaySpinner() } }
          onError={() => {
            console.log('=================Error');
            Alert.alert(
              'Informação',
              'Para uso correto do aplicativo \né necessário conexão com a internet',
              [
                {
                  text: 'Ok', onPress: (() => {
                    BackHandler.exitApp();
                    console.log('=========Sim');
                  })
                },
              ],
              { cancelable: false }
            )
          }}
        />
      );    
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'    
  },
  loading:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  WebView: {
    position: 'relative',
  }
}
