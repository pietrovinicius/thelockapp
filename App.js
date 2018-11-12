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
      timePassed: false,
    };
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ timePassed: true }) }, 2000);
  }

  componentWillMount() {
    console.log("=================WillMount()");
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
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

  setTimePassed() {
    this.setState({ timePassed: true });
  }
 displaySpinner() {
  return (
    <View style={styles.container}>
      {console.log("=================Carregando WebView...")}      
      <ActivityIndicator size="large" color="#000000" />
      <Text>Carregando...</Text>
    </View>
  );
}
  render() {
    if (!this.state.timePassed) {
      return (
        <View style={styles.container}>
        {console.log("=================Carregando Imagem...")}                 
          <Image style={styles.Image}
            source={require('./src/img/002.png')}
            resizeMode='center'            
          />
        </View>
      );
    } else {
        return (                 
            <WebView              
            source={{ uri: 'http://www.thelock.com.br/app/' }}
              style={styles.WebView}
              startInLoadingState={true}
              renderLoading={() => {return this.displaySpinner()}}
              onError={()=>{
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
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  WebView: {
    position: 'relative'
  },
  Image: {
    resizeMode: 'center'
  },
  Texto: {
    color: 'red',
    fontSize: 30,
  },
  ActivityIndicator:{
    paddingTop: 220,
  }
}
