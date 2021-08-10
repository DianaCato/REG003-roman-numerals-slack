const { Router } = require('express');
const router = Router();
const pack = require('../../package.json');
const { parse, stringify} = require('roman-numerals');

router.get('/', (req,res) => {
    const data = {
        'name': pack.name,
        'version': pack.version
    }
    res.json(data)
});

router.post('/', (req,res) => {
    const { option, number } = req.body;

    const output = (option, number) => {
        if (option === "parse"){
            try {
                return parse(number)
            }catch (error) {
                return error.message
            }
        }else {
            try {
                return stringify(number)
            }catch (error) {
                return error.message
            }
        }
    }

   const text =  output(option, number);

    const convert = {
        "response_type": "in_channel",
        "text": text
    }
    res.json(convert)

    console.log(text, number)

})

module.exports = router;

