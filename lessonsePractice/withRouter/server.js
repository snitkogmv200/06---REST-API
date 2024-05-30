const http = require("http");

const requestHandler = require("./routes/router");

const server = http.createServer(requestHandler);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
