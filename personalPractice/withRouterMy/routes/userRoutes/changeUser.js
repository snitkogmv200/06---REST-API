const data = require("./../../data");

module.exports = (req, res) => {
  const id = req.url.split("/")[2];
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    const parsedBody = new URLSearchParams(body);
    const updatedData = {};

    parsedBody.forEach((value, key) => {
      updatedData[key] = key === "age" ? parseInt(value) : value;
    });

    const changeUser = data.changeUser(id, updatedData);

    if (changeUser) {
      res.writeHead(201);
      res.end(JSON.stringify({ message: "ok" }));
    } else {
      res.writeHead(400);
      res.end(JSON.stringify({ message: "Error on question" }));
    }
  });
};
