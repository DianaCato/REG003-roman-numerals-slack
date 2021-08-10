const { Router } = require('express');
const router = Router();

router.get('/', (req,res) => {
    const data = {
        'name': 'roman-numerals-slack',
        'version': '1.0.0'
    }
    res.json(data)
});

module.exports = router;

