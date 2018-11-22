import React, { Component } from "react";
import { View, Text } from "react-native";
import firebase from "firebase";
import { Header, Button, Spinner } from "./components/common";
import LoginForm from "./components/LoginForm";

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDmyrOx8Tr2U1TTZH9M0VH6geM9FhkLAtY",
      authDomain: "auth-ec62f.firebaseapp.com",
      databaseURL: "https://auth-ec62f.firebaseio.com",
      projectId: "auth-ec62f",
      storageBucket: "auth-ec62f.appspot.com",
      messagingSenderId: "906748903728"
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContenet() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
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
        <Header headerText="Authentication" />
        {this.renderContenet()}
      </View>
    );
  }
}

export default App;
