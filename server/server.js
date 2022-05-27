const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
let cors = require("cors");
const { CONNECTION_URI } = require("./config");
const morgan = require('morgan');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(CONNECTION_URI, { useNewUrlParser: true });

// Upload middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter1 = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only accept .jpg, .jpeg, .png"));
  }
};

const fileFilter2 = (req, file, cb) => {
  if (
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/mkv" ||
    file.mimetype === "video/mov" ||
    file.mimetype === "video/MOV" 
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only accept .mov, .mp4, .mkv"));
  }
};

const upload1 = multer({ storage: storage, fileFilter: fileFilter1 }).single(
  "thumbnail"
);
const upload2 = multer({ storage: storage, fileFilter: fileFilter2 }).single(
  "movie"
);

const { Movie } = require("./models/movie");

app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.post("/api/add_thumbnail", upload1, (req, res, next) => {
  upload1(req, res, function (err) {
    if (err) {
      res.status(400).send({error: err.message});
      // next(err);
    } else {
      res
        .status(200)
        .send({ message: "Uploaded successfully", file: req.file });
    }
  });
});

app.post("/api/add_video", upload2, (req, res, next) => {
  upload2(req, res, function (err) {
    if (err) {
      res.status(400).json({
        error: err.message
      }) 
    } else {
      res
        .status(200)
        .send({ message: "Uploaded successfully", file: req.file });
    }
  });
});
app.post("/api/add_movie", (req, res, next) => {
  const movie = new Movie({
    movie_name: req.body.movie_name,
    year_of_release: req.body.year_of_release,
    language: req.body.language,
    // thumbnail: req.files["thumbnail"][0].path,
    // movie: req.files["movie"][0].path,
    thumbnail: req.body.thumbnail,
    movie: req.body.movie
  });

  movie.save((err, doc) => {
    if (err)
      res.status(400).json({error: err.message})
    else{
      res.status(200).json({
        status: "Movie added successfully",
        file: doc
      });
    }
  });
});

app.get("/api/get_movInfo", (req, res) => {
  Movie.find({}, (err, doc) => {
    if (err)
      res
        .status(400)
        .send({
          error: "Something wen't wrong.Can't load the movie right now.",
        });
    res.status(200).send(doc);
  });
});

app.get("/api/getMovieById", (req, res) => {
  Movie.findById(req.query.id, (err, doc) => {
    if (err) res.status(400).send({ error: "Item not found" });
    res.status(200).send(doc);
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server started successfully on http://localhost:${port}`);
});

app.use(function (req, res, next) {
  const error = new Error("Something Broke");
  error.status = 404;
  next(error);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});
