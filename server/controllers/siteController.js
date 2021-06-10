import Site from "../models/siteModel";

const corsSites = (req, res, next) => {
  res.status(200);
};

const getSites = (req, res, next) => {
  Site.find({})
    .populate("owner")
    .then((sites) => {
      res.status(200);
      res.header("Content-Type", "application/json");
      res.json(sites);
    })
    .catch((err) => next(err));
};

const createSite = (req, res, next) => {
  if (req.body == null) {
    const err = new Error("Site not found in request body");
    err.status(404);
    return next(err);
  }
  Site.findOne({ owner: req.user._id })
    .then((site) => {
      if (site) {
        const err = new Error("The user already has a site created.");
        err.status = 404;
        return next(err);
      }
      req.body.owner = req.user._id;
      Site.create(req.body).then(
        (site) => {
          Site.findById(site._id)
            .populate("owner")
            .then(
              (site) => {
                res.status(200);
                res.header("Content-Type", "application/json");
                res.json(site);
              },
              (err) => next(err)
            );
        },
        (err) => next(err)
      );
    })
    .catch((err) => next(err));
};

const deleteSites = (req, res, next) => {
  Site.remove({})
    .then((resp) => {
      res.status(200);
      res.header("Content-Type", "application/json");
      res.json(resp);
    })
    .catch((err) => next(err));
};

const getSiteById = (req, res, next) => {
  Site.findById(req.params.siteId)
    .then((site) => {
      if (!site) {
        const err = new Error("Site does not exist");
        err.status = "404";
        return next(err);
      }
      res.status(200);
      res.header("Content-Type", "application/json");
      res.json(site);
    })
    .catch((err) => next(err));
};

const updateSiteById = (req, res, next) => {
  Site.findByIdAndUpdate(req.params.siteId, { $set: req.body }, { new: true })
    .then((site) => {
      if (!site) {
        const err = new Error("Site does not exist");
        err.status = "404";
        return next(err);
      }
      res.status(200);
      res.header("Content-Type", "application/json");
      res.json(site);
    })
    .catch((err) => next(err));
};

const deleteSiteById = (req, res, next) => {
  Site.findByIdAndRemove(req.params.siteId)
    .then((resp) => {
      res.status(200);
      res.header("Content-Type", "application/json");
      res.json(resp);
    })
    .catch((err) => next(err));
};

export {
  corsSites,
  getSites,
  createSite,
  deleteSites,
  deleteSiteById,
  getSiteById,
  updateSiteById,
};
