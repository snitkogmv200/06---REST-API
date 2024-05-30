import { itemModel } from "../models/itemsModel.js";

export const getItems = async (req, res) => {
  try {
    const items = await itemModel.getAllItems();

    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify(items));
  } catch (err) {
    res.statusCode = 500;
    res.end(`Error message: ${err.message}`);
  }
};

export const getItemById = async (req, res, id) => {
  try {
    const item = await itemModel.getItemById(id);

    if (!item) {
      res.statusCode = 404;
      res.end("Item not found");
    } else {
      res.setHeader("Content-type", "application/json");
      res.end(JSON.stringify(item));
    }
  } catch (err) {
    res.statusCode = 500;
    res.end(`Error: ${err.message}`);
  }
};

export const createItem = async (req, res) => {
  try {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      console.log(body);
      const item = JSON.parse(body);
      await itemModel.createItem(item);
      res.statusCode = 201;
      res.setHeader("Content-type", "application/json");
      res.end(JSON.stringify("ok"));
    });
  } catch (err) {
    res.statusCode = 500;
    res.end(`Error: ${err.message}`);
  }
};

export const updateItem = async (req, res, id) => {
  try {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const item = JSON.parse(body);
      await itemModel.updateItem(id, item);
      res.statusCode = 200;
      res.setHeader("Content-type", "application/json");
      res.end(JSON.stringify("ok"));
    });
  } catch (err) {
    res.statusCode = 500;
    res.end(`Error: ${err.message}`);
  }
};

export const deleteItem = async (req, res, id) => {
  try {
    await itemModel.deleteItem(id);
    res.setHeader("Content-type", "application/json");
    res.end("Ok");
  } catch (err) {
    res.statusCode = 500;
    res.end(`Error: ${err.message}`);
  }
};
