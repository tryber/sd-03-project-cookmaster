const newRecipeForm = async (req, res) => res.render('admin/new', { user: req.user });

module.exports = newRecipeForm;
