import axios from "axios";
import React, { Component } from "react";


class PlayMedia extends Component {
  state = {
    url: "",
  };
  componentDidMount() {
    // this.setState({"id":this.props.match.params})
    axios
      .get("http://localhost:3001/api/getMovieById/", {
        params: { id: this.props.match.params.id },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ url: response.data.movie, data: response.data });
      })
      .catch((err) => console.log(err));
  }
  renderMovie() {
    if (!this.state.url) {
      return;
    } else {
      return (
        <video width="100%" controls autoPlay>
          <source
            src={`http://localhost:3001/${this.state.url}`}
            type="video/mp4"
            alt=""
          />
        </video>
      );
    }
  }
  renderMovieDescription() {
    if (!this.state.data) {
      return;
    } else {
      const {movie_name, language, year_of_release } = this.state.data;
      return (
        <div>
          <div style={{ width: "100%" , marginTop: '1em'}} className="ui card">
            <div className="content">
              <i  className="right floated like icon" />
              <i style={{marginRight: '1em'}} className="right floated star icon" />
              <div className="header">{movie_name}</div>
              <div className="description">
                This movie is produced by Viacom Pictures and released in {year_of_release}. Streaming only avialble in {language}.
              </div>
            </div>
            <div className="extra content">
              <span className="left floated like">
                <i className="like icon large" />
                <span>Like this video to Support</span>
              </span>
              <span className="right floated star">
                <i className="star icon large" />
                <span>Add to Favourites</span>
              </span>
            </div>
          </div>
        </div>
      );
    }
  }

  renderComments(){
    return(
      <div style={{width: '100%'}} className="ui segment" >
        <div style={{marginTop: '1em'}} className="ui comments">
        <h3 className="ui dividing header">Comments</h3>
        <div className="comment">
          <div className="avatar">
          <i className="icon user large" />
          </div>
          <div className="content">
            <div className="author">Matt</div>
            <div className="metadata">
              <span className="date">Today at 5:42PM</span>
            </div>
            <div className="text">
              How artistic!
            </div>
            <div className="actions">
              <div className="reply">Reply</div>
            </div>
          </div>
        </div>
        <div className="comment">
          <div className="avatar">
          <i className="icon user large" />
          </div>
          <div className="content">
            <div className="author">Elliot Fu</div>
            <div className="metadata">
              <span className="date">Yesterday at 12:30AM</span>
            </div>
            <div className="text">
              <p>This has been very useful for my research. Thanks as well!</p>
            </div>
            <div className="actions">
              <div className="reply">Reply</div>
            </div>
          </div>
          <div className="comments">
            <div className="comment">
              <div className="avatar">
              <i className="icon user large" />
              </div>
              <div className="content">
                <div className="author">Jenny Hess</div>
                <div className="metadata">
                  <span className="date">Just now</span>
                </div>
                <div className="text">
                  Elliot you are always so right :)
                </div>
                <div className="actions">
                  <div className="reply">Reply</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form className="ui reply form">
          <div className="field">
            <textarea defaultValue={""} />
          </div>
          <div className="ui blue labeled submit icon button">
            <i className="icon edit" /> Add Reply
          </div>
        </form>
      </div>
      </div>
    )
  }

  render() {
    return (
      <div style={{ margin: "2rem" }} className=" container ui segment">
        {this.renderMovie()}
        {this.renderMovieDescription()}
        {this.renderComments()}
      </div>
    );
  }
}

export default PlayMedia;
