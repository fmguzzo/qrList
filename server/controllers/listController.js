import List from "../models/listModel";

const corsLists = (req, res, next) => {
  res.status(200);
};

const getListsSite = async (req, res, next) => {
  try {
    const lists = await List.find({ idSite: req.params.siteId });
    res.status(200);
    res.json(lists);
  } catch (error) {
    next(error);
  }
};

const createListBySite = async (req, res, next) => {
  try {
    const { name, desc } = req.body;
    if (!name) {
      //const error = new Error("List name must be entered.");
      //error.status = 400;
      //return next(error);
      res.status(400);
      throw new Error("List name must be entered");
    }

    const listExists = await List.findOne({ name });
    if (listExists) {
      //const error = new Error("List exist with the same name.");
      //error.status = 400;
      //return next(error);
      res.status(400);
      throw new Error("List exist with the same name");
    }

    const list = await List.create({
      idSite: req.params.siteId,
      name,
      desc,
    });

    if (list) {
      res.status(201);
      res.json({ list });
    } else {
      res.status(404);
      throw new Error("List can not be created");
    }
  } catch (error) {
    next(error);
  }
};

const getListById = async (req, res, next) => {
  try {
    const list = await List.findById(req.params.listId);
    if (!list) {
      res.status(404);
      throw new Error("List does not exist");
    }
    res.status(200);
    res.json(list);
  } catch (error) {
    next(error);
  }
};

const updateListById = async (req, res, next) => {
  try {
    const listUpdated = await List.findByIdAndUpdate(
      req.params.listId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200);
    res.json(listUpdated);
  } catch (error) {
    next(error);
  }
};

const deleteListById = async (req, res, next) => {
  try {
    const list = await List.findById(req.params.listId);
    if (!list) {
      res.status(404);
      throw new Error("List does not exist");
    }
    const listDeleted = await List.findByIdAndRemove(req.params.listId);
    res.status(200);
    res.json(listDeleted);
  } catch (error) {
    next(error);
  }
};

export {
  corsLists,
  getListsSite,
  createListBySite,
  getListById,
  updateListById,
  deleteListById,
};
