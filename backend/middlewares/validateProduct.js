export default (req, res, next) => {
  try {
    const requiredFields = ['id', 'gender', 'masterCategory', 'subCategory', 'articleType', 'baseColour', 'season', 'year', 'usage', 'productDisplayName'];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Validation error', details: error.message });
  }
};
