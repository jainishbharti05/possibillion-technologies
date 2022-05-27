import React, { Component } from "react";
import axios from "axios";

class InputForm extends Component {
  state = {
    movie_name: "",
    year_of_release: "",
    language: "",
    thumbnail: null,
    movie: null,
    Tmessage: "",
    Mmessage: "",
    TtempUrl: "",
    MtempUrl: "",
    finalMessage: null
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleFileChange = (event) => {
    const { name } = event.target;
    this.setState({
      [name]: event.target.files[0],
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { movie_name, year_of_release, language, TtempUrl, MtempUrl } =
      this.state;
    // let formData = new FormData();
    let formData = {
      movie_name: movie_name,
      year_of_release: year_of_release,
      language: language,
      thumbnail: TtempUrl,
      movie: MtempUrl,
    };
    // formData.append("movie_name", movie_name);
    // formData.append("year_of_release", year_of_release);
    // formData.append("language", language);
    // formData.append("thumbnail", TtempUrl);
    // formData.append("movie", MtempUrl);
    // console.log(formData);

    axios
      .post("http://localhost:3001/api/add_movie", formData)
      .then((response) => {
        if (response.status === 200) {
          this.setState({finalMessage: response.data.status})
          // window.location.reload();
        } else {
          console.log(response.data.error.message);
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          // this.setState({ Tmessage: err.response.data.error.message });
        } else {
          console.log("Error", err.message);
        }
      });
  };

  handleThumbnailUpload = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("thumbnail", this.state.thumbnail);

    axios
      .post("http://localhost:3001/api/add_thumbnail", formData)
      .then((response) => {
        if (response.status === 200 && response.data.file !== undefined) {
          this.setState({
            Tmessage: response.data.message,
            TtempUrl: response.data.file.path,
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          this.setState({ Tmessage: err.response.data.error.message });
        } else {
          console.log("Error", err.message);
        }
      });
  };

  handleMovieUpload = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("movie", this.state.movie);

    axios
      .post("http://localhost:3001/api/add_video", formData)
      .then((response) => {
        if (response.status === 200 && response.data.file !== undefined) {
          this.setState({
            Mmessage: response.data.message,
            MtempUrl: response.data.file.path,
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          this.setState({ Mmessage: err.response.data.error.message });
        } else {
          console.log("Error", err.message);
        }
      });
  };

  renderUpload(thumbnail, movie) {
    return (
      <>
        <div className="field">
          <div className="ui left icon input">
            <input
              required
              type="file"
              name="thumbnail"
              placeholder="Upload Thumbnail"
              onChange={this.handleFileChange}
            />
          </div>
          {this.state.Tmessage !== "" ? <p>{this.state.Tmessage}</p> : <p></p>}
          <br />
          {this.state.TtempUrl !== "" ? (
            <img
              src={`http://localhost:3001/${this.state.TtempUrl}`}
              alt=""
              height="200px"
              width="300px"
            />
          ) : (
            ""
          )}
          <br />
          <div
            onClick={this.handleThumbnailUpload}
            className="ui submit button"
          >
            Upload
          </div>
          <br />
          <br />
          {/* <div className="ui progress">
            <div className="bar">
              <div className="progress"></div>
            </div>
          </div> */}
          <br />
        </div>
        <div className="field">
          <div className="ui left icon input">
            <input
              required
              type="file"
              name="movie"
              placeholder="Upload Movie"
              onChange={this.handleFileChange}
            />
          </div>
          {this.state.Mmessage !== "" ? <p>{this.state.Mmessage}</p> : <p></p>}
          <br />
          {this.state.MtempUrl !== "" ? (
            <video
              src={`http://localhost:3001/${this.state.MtempUrl}`}
              controls
              height="200px"
              width="300px"
            />
          ) : (
            ""
          )}
          <br />
          <br />
          <div onClick={this.handleMovieUpload} className="ui submit button">
            Upload
          </div>
          <br />
          {/* <div className="ui segment progress">
            <div className="bar">
              <div className="progress"></div>
            </div>
          </div> */}
          <hr />
        </div>
      </>
    );
  }

  render() {
    const { movie_name, year_of_release, language, thumbnail, movie } =
      this.state;
    return (
      <div className="ui container middle aligned center aligned grid">
        <div className="column">
          <h1 className="ui teal image header">
            <img src="" className="image" alt="" />
            <div className="content">ADD A MOVIE</div>
          </h1>

          {this.state.finalMessage ? <div className="ui message">
            <i aria-hidden="true" className="close icon" onClick={()=> {this.setState({finalMessage: null}); window.location.reload()}}/>
            <div className="content">
              <div className="header">Success!</div>
              <p>{this.state.finalMessage}</p>
            </div>
          </div> : <div></div>}

          <form className="ui large form" onSubmit={this.handleSubmit}>
            <div className="ui stacked segment">
              <div className="field">
                <div className="ui left icon input">
                  <input
                    type="text"
                    name="movie_name"
                    placeholder="Name of movie"
                    value={movie_name}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <input
                    type="text"
                    name="year_of_release"
                    placeholder="Year of Release"
                    value={year_of_release}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <input
                    type="text"
                    name="language"
                    placeholder="Language"
                    value={language}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {this.renderUpload(thumbnail, movie)}

              <button
                className="ui fluid large teal submit button"
                type="submit"
              >
                Submit
              </button>
            </div>
            <div className="ui error message" />
          </form>
        </div>
      </div>
    );
  }
}

export default InputForm;
