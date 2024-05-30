const data = require("./../../data");

module.exports = (req, res) => {
  const id = parseInt(req.url.split("/")[2]);

  const deleteUser = data.deleteUser(id);

  if (deleteUser) {
    res.writeHead(200);
    res.end(JSON.stringify({ message: "User delete" }));
  } else {
    res.writeHead(400);
    res.end(JSON.stringify({ message: "User not found" }));
  }
};
