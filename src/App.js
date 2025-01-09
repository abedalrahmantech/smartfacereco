import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Form from './components/Form/Form';
import Facereco from './components/Facereco/Facereco';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ParticlesBackground from './components/ParticlesBackground/ParticlesBackground';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'home',
      isSignedIn: false
    };
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false, route: 'signin' });
    } else if (route === 'home') {
      this.setState({ isSignedIn: true, route: 'home' });
    } else {
      this.setState({ route: route });
    }
  };

  calculateFaceLocation = (data) => {
    if (!data.outputs || !data.outputs[0].data.regions) {
      return {};
    }
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onSubmit = () => {
    let trimmedUrl = this.state.input.trim();
    if (!/^https?:\/\//i.test(trimmedUrl)) {
      trimmedUrl = 'https://' + trimmedUrl;
    }

    this.setState({ imageUrl: trimmedUrl }, () => {
      fetch('http://localhost:3001/api/clarifai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          imageUrl: this.state.imageUrl
        })
      })
        .then(response => response.json())
        .then(response => {
          if (response) {
            this.displayFaceBox(this.calculateFaceLocation(response));
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }
        })
        .catch(err => {
          console.error('Error fetching from backend:', err);
          alert('Unable to reach the backend server. Please ensure it is running.');
        });
    });
  };

  render() {
    const { route, isSignedIn, imageUrl, box } = this.state;
    return (
      <div className="App">
        <ParticlesBackground />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        <Logo onRouteChange={this.onRouteChange} />
        {route === 'home'
          ? <div>
              <Rank />
              <Form onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
              <Facereco imageUrl={imageUrl} box={box} />
            </div>
          : (
            route === 'signin'
              ? <Signin onRouteChange={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;