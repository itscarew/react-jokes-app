import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Joke extends Component {
  getColor() {
    const {
      joke: { votes }
    } = this.props;
    if (votes >= 15) {
      return "#4CAF50";
    } else if (votes >= 12) {
      return "#8BC34A";
    } else if (votes >= 9) {
      return "#cddc39";
    } else if (votes >= 6) {
      return "#ffeb3b";
    } else if (votes >= 3) {
      return "#ffc107";
    } else if (votes >= 0) {
      return "#ff9800";
    } else {
      return "#f44336";
    }
  }

  getEmoji() {
    const {
      joke: { votes }
    } = this.props;
    if (votes >= 15) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (votes >= 12) {
      return "em em-laughing";
    } else if (votes >= 9) {
      return "em em-smiley";
    } else if (votes >= 6) {
      return "em em-slightly_smiling_face";
    } else if (votes >= 3) {
      return "em em-neutral_face";
    } else if (votes >= 0) {
      return "em em-confused";
    } else {
      return "em em-angry";
    }
  }

  render() {
    const {
      joke: { votes, text }
    } = this.props;
    const { upVote, downVote } = this.props;
    return (
      <div className="joke">
        <div className="joke__button">
          <FontAwesomeIcon
            onClick={upVote}
            icon="arrow-up"
            size="lg"
            color="#78909c"
            style={{ cursor: "pointer", margin: "6px" }}
            className="joke__button_arrowUp"
          />{" "}
          <span
            className="joke__votes"
            style={{ borderColor: this.getColor() }}
          >
            {" "}
            {votes}{" "}
          </span>{" "}
          <FontAwesomeIcon
            onClick={downVote}
            icon="arrow-down"
            size="lg"
            color="#78909c"
            style={{ cursor: "pointer", margin: "6px" }}
            className="joke__button_arrowDown"
          />{" "}
        </div>
        <div className="joke__text">{text}</div>
        <div className="joke__smiley">
          <i className={this.getEmoji()}></i>
        </div>
      </div>
    );
  }
}

export default Joke;
