import Item from "../models/itemModel";

export const corsItems = (req, res, next) => {
  res.status(200);
};

export const getItems = async (req, res, next) => {
  try {
    const items = await Item.find({});
    res.status(200).header("Content-Type", "application/json").json(items);
  } catch (error) {
    next(error);
  }
};

export const deleteItems = async (req, res, next) => {
  try {
    const removed = await Item.remove({});
    res.status(200).header("Content-Type", "application/json").json(removed);
  } catch (error) {
    next(error);
  }
};

export const createItem = async (req, res, next) => {
  if (req.body == null) {
    error = new Error("Item not found in request body");
    error.status(404);
    return next(error);
  }
  try {
    const item = await Item.create(req.body);
    res.status(200).header("Content-Type", "application/json").json(item);
  } catch (error) {
    next(error);
  }
};

export const getItemById = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.itemId);
    res.status(200).header("Content-Type", "application/json").json(item);
  } catch (error) {
    next(error);
  }
};

export const updateItemById = async (req, res, next) => {
  try {
    const { name, description, image, price } = req.body;

    const item = await Item.findById(req.params.item_id);
    if (!item) {
      error = new Error("Item does not exist");
      error.status(404);
      return next(error);
    }

    item.name = name;
    item.description = description;
    item.image = image;
    item.price = price;

    const updateItem = await Item.save();
    res.status(200).header("Content-Type", "application/json").json(updateItem);
  } catch (error) {
    next(error);
  }
};

export const deleteItemById = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.itemId);
    res.status(200).header("Content-Type", "application/json").json(item);
  } catch (error) {
    next(error);
  }
};
