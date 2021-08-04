import Category from "../models/categoryModel";
import Item from "../models/itemModel";

// @desc    Fetch all items by idCategory
// @route   GET /api/items/category/:idCategory
// @access  Public
export const getItemsByCategory = async (req, res, next) => {
  const { idCategory } = req.params;
  const query = {};
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.items) || 5;
  const skip = page * limit - limit;
  try {
    // Query the database for a list of  all results
    // not pagination
    // const { items } = await Category.findById(idCategory).populate("items");

    // Mongoose pagination and count
    const { items: totalItems } = await Category.findById(idCategory);
    // Counting the total documents
    const count = totalItems.length;

    // Calculating total pages
    const pages = Math.ceil(count / limit);
    // Getting Pagination Object
    const pagination = { page, pages, count };

    if (count === 0) {
      return res.status(203).json({
        success: false,
        result: [],
        pagination,
        message: "Collection is Empty",
      });
    }

    const { items } = await Category.findById(idCategory).populate([
      {
        path: "items",
        options: {
          sort: {},
          skip: skip,
          limit: limit,
        },
      },
    ]);

    /**
     * Paginate with mongoose-pagination-V2
     * not working with document and array population
    let options = {
      populate: {
        path: "items",
        lean: true,
        offset: skip,
        limit: limit,
      },
    };
    const result = await Category.paginate({ _id: idCategory }, options);
    return res.status(200).json(result);
     */

    if (items.length > 0) {
      return res.status(200).json({
        success: true,
        result: items,
        pagination,
        message: "Successfully found all documents",
      });
    } else {
      return res.status(203).json({
        success: false,
        result: [],
        pagination,
        message: "Pagination is Empty",
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create item by category
// @route   POST /api/items/category/:idCategory
// @access  Private
export const createItemByCategory = async (req, res, next) => {
  try {
    const { name, desc, price } = req.body;

    if (!name || !desc || !price) {
      res.status(400);
      throw new Error("Item name, description and price must be entered");
    }

    const category = await Category.findById(req.params.idCategory);
    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    const item = await Item.create(req.body);
    category.items.push(item._id);
    await category.save();
    // Returning successfull response
    return res.status(200).json({
      success: true,
      result: item,
      message: "Successfully Created the document in Model ",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch items by id
// @route   GET /api/items/:idItem
// @access  Public
export const getItemById = async (req, res, next) => {
  const { idItem } = req.params;
  try {
    const item = await Item.findById(idItem);
    if (!item) {
      return res.status(404).json({
        success: false,
        result: null,
        message: "No document found by this id: " + idItem,
      });
    } else {
      // Return success resposne
      return res.status(200).json({
        success: true,
        result: item,
        message: "we found this document by this id: " + idItem,
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update items by id
// @route   PUT /api/items/:idItem
// @access  Private
export const updateItemById = async (req, res, next) => {
  try {
    /*
    const { name, desc, image, price } = req.body;
    const item = await Item.findById(req.params.idItem);
    if (!item) {
      res.status(404);
      throw new Error("Item does not exist");
    }

    if (name) item.name = name;
    if (desc) item.desc = desc;
    if (image) item.image = image;
    if (price) item.price = price;

    const updatedItem = await item.save();
    res
      .status(200)
      .header("Content-Type", "application/json")
      .json(updatedItem);
    */

    const result = await Item.findOneAndUpdate(
      { _id: req.params.idItem },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).exec();

    return res.status(200).json({
      success: true,
      result,
      message: "we update this document by this id: " + req.params.idItem,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete items by id
// @route   DELETE /api/items/:idItem?category="idCategory"
// @access  Private
export const deleteItemById = async (req, res, next) => {
  try {
    const idCategory = req.query.category;
    const { idItem } = req.params;
    //await Item.findByIdAndDelete(idItem);
    //await Item.remove({ _id: idItem });
    const result = await Item.findByIdAndRemove(idItem);

    if (!result) {
      return res.status(404).json({
        success: false,
        result: null,
        message: "No document found by this id: " + idItem,
      });
    } else {
      const updatedCategory = await Category.findByIdAndUpdate(
        idCategory,
        { $pull: { items: idItem } },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        result,
        message: "Successfully Deleted the document by id: " + idItem,
      });
    }
  } catch (error) {
    /**
    return res.status(500).json({
      success: false,
      result: null,
      message: "Oops there is an Error",
    });
    * */
    next(error);
  }
};
