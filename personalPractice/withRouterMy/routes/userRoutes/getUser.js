const data = require("./../../data");

module.exports = (req, res) => {
  const id = req.url.split("/")[2];
  const user = data.getUsers(id);

  if (user) {
    res.writeHead(200);
    res.end(JSON.stringify(user));
  } else {
    res.writeHead(400);
    res.end(JSON.stringify({ message: "User not found" }));
  }
};
