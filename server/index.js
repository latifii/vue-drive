const jsonServer = require("json-server");
const path = require("path");
const cors = require("cors");
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "./uploads"));
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

var upload = multer({
  storage,
  fileFilter: validateFileType,
  /*limits:{
    fileSize: 1024 * 1024
  }*/
}).single("file");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
const port = 3030;

server.options("*", cors());
server.post("/files", upload, function (req, res, next) {
  const host = "http://localhost:" + port;

  req.body.name = req.file.originalname;
  req.body.mimeType = req.file.mimetype;
  req.body.url = host + "/uploads/" + req.file.filename;
  req.body.path = req.file.path;
  req.body.createdAt = Date.now();

  next();
});

server.delete("/files/:id", (req, res, next) => {
  const fs = require("fs");
  const file = router.db
    .get("files")
    .find({ id: parseInt(req.params.id) })
    .value();

  try {
    fs.unlinkSync(file.path);
  } catch (err) {
    console.error(err);
  }

  next();
});

server.use(middlewares);
server.use(router);
server.listen(port, () => {
  console.log("JSON Server is running at port ", port);
});

function validateFileType(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|doc|docx|pdf|xls|xlsx)$/)) {
    return cb(new Error("File you're trying to upload was not allowed"));
  }
  cb(null, true);
}