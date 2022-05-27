const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  movie_name: {
    type: String
  },
  year_of_release: {
    type: Number
  },
  language: {
    type: String
  },
  thumbnail: {
    type: String
  },
  movie: {
    type: String
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = { Movie };
