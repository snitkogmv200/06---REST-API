const http = require("http");
const url = require("url");

const createUser = require("./routes/createUser");
const deleteUser = require("./routes/deleteUser");
const getUser = require("./routes/getUser");
const listUsers = require("./routes/listUsers");
const updateUser = require("./routes/updateUser");

const requestHandler = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const path = parsedUrl.pathname;

  res.setHeader = ("Content-Type", "application/json");

  if (path === "/users" && method === "GET") {
    listUsers(req, res);
  } else if (path === "/users" && method === "POST") {
    createUser(req, res);
  } else if (path.startsWith("/users/") && method === "GET") {
    getUser(req, res);
  } else if (path.startsWith("/users/") && method === "PUT") {
    updateUser(req, res);
  } else if (path.startsWith("/users/") && method === "DELETE") {
    deleteUser(req, res);
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Route not found" }));
  }
};

const server = http.createServer(requestHandler);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
