// @desc    upload file to the server
// @route   POST /api/upload
// @access  Private
export const uploadController = async (req, res, next) => {
  return res.status(200).json({
    success: true,
    result: req.file,
    message: "Successfully updated file",
  });
};
