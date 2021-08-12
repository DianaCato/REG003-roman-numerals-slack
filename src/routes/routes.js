const { Router } = require('express');
const qs = require('querystring')

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
    const {text }  = req.body;
   
    const output = (number) => {
        if (isNaN(+number)){
            try {
                const string = number.substring(0, number.length - 2);
                return parse(string)
            }catch (error) {
                return error.message
            }
        }else {
            try {
                return stringify(+number)
            }catch (error) {
                return error.message
            }
        }
    }

   const slackText =  output(text);

    const convert = {
        "response_type": "in_channel",
        "text": slackText
    }
    res.json(convert)
})

module.exports = router;

