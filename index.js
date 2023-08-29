var express = require("express");
var cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

var app = express();
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ success: false });
  } else {
    const { originalname, mimetype, size } = req.file;
    res.status(200).json({ name: originalname, type: mimetype, size: size });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
