import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";

// import image from "../images/image.png";

class ShowList extends Component {
  state = {
    data: null,
  };

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/get_movInfo")
      .then((response) => {
        // console.log(response.data);
        this.setState({ data: response.data });
      })
      .catch((err) => console.log(err));
  }

  renderCards() {
    if (!this.state.data) {
      return;
    } else {
      return this.state.data.map((item) => {
        return (
          <div key={item._id} className="column">
            <div className="ui segment">
              <Link to={`/play/${item._id}`}>
                <img
                  src={`http://localhost:3001/${item.thumbnail}`}
                  alt=""
                  width="230px"
                  height="215px"
                />
              </Link>

              <div className="ui card">
                <div className="content">
                  <div className="header">{item.movie_name}</div>
                  <div className="meta">Available in: {item.language}</div>
                  <div className="description">
                    This movie is produced by Viacom Pictures and released in {item.year_of_release}.
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
  }

  render() {
    // console.log(this.state);

    return (
      <div style={{ margin: "2rem" }} className="ui container">
        <div className="ui four column grid">{this.renderCards()}</div>
      </div>
    );
  }
}

export default ShowList;

// <div className="ui cards">
//   <div className="ui card">
//     <div className="content">
//       <div className="header">Matthew Harris</div>
//       <div className="meta">Co-Worker</div>
//       <div className="description">
//         Matthew is a pianist living in Nashville.
//       </div>
//     </div>
//   </div>
//   <div className="ui card">
//     <div className="content">
//       <div className="header">Jake Smith</div>
//       <div className="meta">Musicians</div>
//       <div className="description">Jake is a drummer living in New York.</div>
//     </div>
//   </div>
//   <div className="ui card">
//     <div className="content">
//       <div className="header">Elliot Baker</div>
//       <div className="meta">Friend</div>
//       <div className="description">
//         Elliot is a music producer living in Chicago.
//       </div>
//     </div>
//   </div>
//   <div className="ui card">
//     <div className="content">
//       <div className="header">Jenny Hess</div>
//       <div className="meta">Friend</div>
//       <div className="description">
//         Jenny is a student studying Media Management at the New School
//       </div>
//     </div>
//   </div>
// </div>;
