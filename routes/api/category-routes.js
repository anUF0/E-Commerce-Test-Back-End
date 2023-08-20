const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const categoryData = await Category.findAll({
    include:[{model: Product, as:'category_id'}]
    });
    res.status(200).json(categoryData);
  }catch (err){
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
try{
  const categoryData = await Category.findByPk(req.params.id, {
    include:[{model: Product, as:'category_id'}]
});

if(!categoryData){
  res.status(404).json({message: 'Category Not Found'});
  return
}

res.status(200).json(categoryData);
} catch (err){
res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
try{
  const categoryData = await Category.create(req.body);
  res.status(200).json(categoryData);
}catch (err){
  res.status(400).json(err)
}
});

router.put('/:id', async (req, res) => {
  try{
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(categoryData);

    if(!categoryData){
      res.status(404).json({message: 'Category Not Found'});
      return
    }
  }
  catch{
  res.status(500).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!categoryData){
      res.status(404).json({message: 'Category Not Found'});
      return
    }

    res.status(200).json(categoryData);
  } catch (err){
    res.status(500).json(err);
  }
});

module.exports = router;
