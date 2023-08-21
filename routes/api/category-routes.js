const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
  const categoryData = await Category.findAll({
   include: [{model: Product, attributes: ['product_name']}]
   });

  res.status(200).json(categoryData);
  }catch (err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
try{
  const categoryData = await Category.findByPk(req.params.id, {
    include: [{model: Product, attributes: ['product_name']}]
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

//Updates a category by its `id` value
router.put('/:id', async (req, res) => {
  try{
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });

  if(!categoryData){
    res.status(404).json({message: 'Category Not Found'});
    return //WIP Does not work as intended
  }
  
  res.status(200).json(categoryData);
} catch(err){
  res.status(500).json(err);
  }
});

// Deletes a category by its `id` value
router.delete('/:id', async (req, res) => {

  try{
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!categoryData){
      res.status(404).json({message: 'Category Not Found'});
      return;
    }

    res.status(200).json(categoryData);
  } catch (err){
    res.status(500).json(err);
  }
});

module.exports = router;
