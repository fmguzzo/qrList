import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //cb=Callback
    cb(null, "public/images"); //null-> si no hay error
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("You can upload only image files!"), false); //cb-> devolvermos erro, y el otro parametro en false
  }
  cb(null, true);
};

const uploadMiddleware = multer({
  storage: storage,
  fileFilter: imageFileFilter,
});
export default uploadMiddleware;
