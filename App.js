
import React, {Component} from 'react';
import {WebView} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
        <WebView
            source={{uri: 'http://www.thelock.com.br/app/'}}
            style={{position:'relative'}}
        />
    );
  }
}
