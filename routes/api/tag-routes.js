const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tagData = await Tag.findAll().catch((err) => {
    res.json(err);
  });
  res.json(tagData);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
       include: [ { model: Product },{ model: ProductTag }],
      attributes: {
      include: [
        [
        sequelize.literal(
          `(SELECT * FROM product_tag WHERE tag_id = tag.id)`
        ),
        'getByID',
      ],
    ],
  },
  
    });
    

    if (!tagData) {
      res.status(404).json({ message: 'Not found' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
