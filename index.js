let express = require('express');
let app = express();
const path = require('path');
const router = express.Router();

const showtimes_data = require('./public/showtimes.json');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.set('views', __dirname + '/public/views');
app.set('view engine', 'pug');

router.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/public/showtimes.html'));
    //response.render('showtimes');
});

router.get('/showtimes_api', function(request, response) {
    //response.render('/showtimes_api');
    response.render('showtimes'); 
});


app.use('/', router);

app.post('/showtimes_api', function(request, response) {
    let date = request.body.selected_date;
    date = date.replace('-', '/');
    date = date.replace('-', '/');

    showtimesList = showtimes_data.filter(element => element.location == request.body.location && element.date == date);
    response.render('showtimes', {showtimesList: showtimesList});
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log(`Listening for requests on port ${app.get('port')}.`);
});