const fs = require("fs");

const logFile = fs.createWriteStream("response.log", { flags: "a" });

function logging(req, res, next) {
  res.on("finish", () => {
    const timeStamp = new Date().toLocaleString();
    const method = req.method;
    const route = req.path;
    logFile.write(
      `${method} request recieved to route:${route} finished at:${timeStamp} with StatusCode:${res.statusCode}` +
        "\n"
    );
  });
  next();
}

module.exports = logging;
