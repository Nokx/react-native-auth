import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Card, CardSection, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {

  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAsuGXuKIzj_2WVcdpw-wpfy2RQDoVF5cY',
      authDomain: 'auth-79838.firebaseapp.com',
      databaseURL: 'https://auth-79838.firebaseio.com',
      projectId: 'auth-79838',
      storageBucket: 'auth-79838.appspot.com',
      messagingSenderId: '16797618950'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

//TODO: разобраться почему кнопка без card и CardSection схлапывается
  renderContent() {
    switch (this.state.loggedIn) {
        case true:
          return (
            <Card>
              <CardSection>
                <Button onPress={() => firebase.auth().signOut()}>
                  Log out
                </Button>
             </CardSection>
           </Card>
          );
        case false:
          return <LoginForm />;
        default:
          return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Auth" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
