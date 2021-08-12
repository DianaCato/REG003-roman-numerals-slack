const { Router } = require('express');
// const qs = require('querystring');

const router = Router();
const { parse, stringify } = require('roman-numerals');
const pack = require('../../package.json');

router.get('/', (req, res) => {
  const data = {
    name: pack.name,
    version: pack.version,
  };
  res.json(data);
});

router.post('/', (req, res) => {
  const { text } = req.body;

  const output = (number) => {
    if (Number.isNaN(+number)) {
      try {
        const string = number.trim();
        return parse(string);
      } catch (error) {
        return error.message;
      }
    } else {
      try {
        return stringify(+number);
      } catch (error) {
        return error.message;
      }
    }
  };

  const slackText = output(text);

  const convert = {
    response_type: 'in_channel',
    text: slackText,
  };
  res.json(convert);
});

module.exports = router;
