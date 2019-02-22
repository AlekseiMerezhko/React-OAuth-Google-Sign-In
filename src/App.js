import React, { Component } from 'react';

class App extends Component {
  state = {
    userName: null,

  }
  componentDidMount(){
    window.gapi.load('auth2', function() {
    //Library downloaded
      window.gapi.auth2.init({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,

      })
      .then(() => console.log(`init OK`), () => console.error(`init Error`))


    });
  }
  signIn = () => {
    const _authOk = (user) => {
      console.log(`Auth OK`, );
      this.setState({ userName: user.getBasicProfile().getName()})
    }
    const _authErr = () => {
      console.error(`Auth Error`)
    }
    const googleAuth = window.gapi.auth2.getAuthInstance();
    googleAuth.signIn(
      {
        scope: 'profile email'
      }
    ).then(_authOk, _authErr)
  }
  signOut = () => {
    const googleAuth = window.gapi.auth2.getAuthInstance();
    googleAuth.signOut()
      .then(
        () => this.setState({userName: null}),
        () => console.error(`sign out error`)
      )
  }
  render() {
    const { userName } = this.state;
    return (
      <div className="App">
        <header className="App-header">
        <p> Google Sign In</p>
        {userName && <p>HI, {userName}</p>}  
        {!userName && <button onClick={this.signIn}> Log In</button>}
        {userName && <button onClick={this.signOut}> Log Out</button>}
        </header>
      </div>
    );
  }
}

export default App;
