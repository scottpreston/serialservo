var express = require('express');
var app = express();
var ssc = require("serialservo");
var port = process.env.PORT || 8080; 		// set our port
var router = express.Router(); 				// get an instance of the express Router

router.get('/', function (req, res) {
    res.sendFile(__dirname + '/help.html');
});

router.get('/move/:pin/:pos/:timeout', function (req, res) {
    var pin = req.params.pin;
    var pos = req.params.pos;
    if (pin >= 0 && pin <= 7 && pos >= 0 && pos <= 255) {
        ssc.move(pin, pos);
        res.status(200).send({ success: 'moved the ssc' });
    } else {
        res.status(500).send({ error: 'oops, you need the right param values!' });
    }
});

router.get('/nav/:left/:right:/:timeout', function (req, res) {
    var left = req.params.left;
    var right = req.params.right;
    if (left >= 0 && left <= 255 && right >= 0 && right <= 255) {
        ssc.nav(left, right);
        res.status(200).send({ success: 'moved the ssc' });
    } else {
        res.status(500).send({ error: 'oops, you need the right param values!' });
    }
});

app.use('/', router);
app.listen(port);
console.log('robotics happens on port ' + port);