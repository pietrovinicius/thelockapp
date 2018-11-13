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

  setTimePassed() {
    this.setState({ timePassed: true });
  }
 displaySpinner() {
  return (
    <View style={{flex:1, alignItems: 'center'}}>
      {console.log("=================Carregando WebView...")}
      {console.log("=================Carregando Imagem 001.png")} 
      <Image style={{width:'100%', height:'100%'}} 
            source={require('./src/img/001.png')}
            resizeMode='cover'            
          />
          <ActivityIndicator 
      style={{marginTop:-350}}
      size="large" color="#000000" />
      <Text>Carregando...</Text>
    </View>
  );
}
  render() {
    if (!this.state.timePassed) {
      return (
        <View style={styles.container}>
        {console.log("=================Carregando Imagem 001.png")}        
          <Image style={styles.Image}          
            source={require('./src/img/001.png')}
            resizeMode='cover'            
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
    alignItems: 'center',       
  },
  WebView: {
    position: 'relative',    
  },
  Image: {
    resizeMode: 'cover',
    width:'100%',
    height:'100%'
  },
  Texto: {
    color: 'red',
    fontSize: 30,
  },
  ActivityIndicator:{
    paddingTop: 220,
  }
}
