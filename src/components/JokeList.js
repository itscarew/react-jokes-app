import React, { Component } from "react";
import axios from "axios";
import TitleLogo from "../assets/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg";
import uuid from "uuid/v4";
import Joke from "./Joke";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class JokeList extends Component {
  static defaultProps = {
    numOfJokesToGet: 10
  };
  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
      loading: false,
      error: false
    };
    this.seenJokes = new Set(this.state.jokes.map(joke => joke.text));
  }
  componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.getJokes();
    }
  }

  async getJokes() {
    try {
      let jokes = [];

      while (jokes.length < this.props.numOfJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" }
        });

        let newJoke = res.data.joke;

        if (!this.seenJokes.has(newJoke)) {
          jokes.push({
            id: uuid(),
            text: newJoke,
            votes: 0
          });
        } else {
          return false;
        }
      }

      this.setState(
        st => ({
          loading: false,
          error: false,
          jokes: [...st.jokes, ...jokes]
        }),
        () =>
          window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
      );
    } catch (error) {
      this.setState({ loading: false, error: true });
    }
  }

  handleVote(id, delta) {
    this.setState(
      st => ({
        jokes: st.jokes.map(joke =>
          joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
        )
      }),
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  }

  handleClick = () => {
    this.setState({ loading: true }, this.getJokes);
  };

  render() {
    const { loading, error } = this.state;

    if (loading) {
      return (
        <div style={{ textAlign: "center" }}>
          <FontAwesomeIcon icon="laugh-squint" size="5x" color="#fff" spin />
          <span className="jokelist__sidebar_title">Loading...</span>
        </div>
      );
    }

    return (
      <div className="jokelist">
        <div className="jokelist__sidebar">
          <h1 className="jokelist__sidebar_title">
            {" "}
            <span> React </span> Jokes{" "}
          </h1>
          <img src={TitleLogo} alt="logo" />
          <button
            onClick={this.handleClick}
            className="jokelist__sidebar_button"
          >
            New Jokes
          </button>
        </div>

        <div className="jokelist_jokes">
          {error ? (
            <div className="jokelist_jokes_error">
              <FontAwesomeIcon icon="sad-tear" size="5x" color="#cccccc" />
              <span className="jokelist_jokes_error_message">
                Internet Connection Error. Or Api Is down ATM
              </span>
            </div>
          ) : (
            this.state.jokes &&
            this.state.jokes.map(joke => (
              <Joke
                key={joke.id}
                joke={joke}
                upVote={() => this.handleVote(joke.id, 1)}
                downVote={() => this.handleVote(joke.id, -1)}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default JokeList;
