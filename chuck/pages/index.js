import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';

const getRandomJoke = async () => {
  const res = await fetch('http://api.icndb.com/jokes/random');
  const data = await res.json();

  if (data.type === 'success') {
    return data.value.joke;
  }
};

class Home extends Component {
  state = {
    fetchedJoke: ''
  };

  static async getInitialProps() {
    const joke = await getRandomJoke();
    return { joke };
  }

  handleUpdate = async () => {
    const fetchedJoke = await getRandomJoke();
    this.setState({ fetchedJoke });
  };

  render() {
    const { joke } = this.props;
    const { fetchedJoke } = this.state;

    return (
      <div>
        <span>{fetchedJoke || joke}</span>
        <button onClick={this.handleUpdate}>Update</button>

        <style jsx>{``}</style>
      </div>
    );
  }
}

export default Home;
