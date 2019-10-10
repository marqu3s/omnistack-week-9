const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadConfig = require('./config/upload');
const upload = multer(uploadConfig);

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');

// req.query = Acessar query params (filtros)
// req.params = Acessar route params (edit and delete)
// req.body = Acessar corpo da requisição (create, edit, etc)
// -> app.use(express.json()); // para body em json

// router.get('/', (req, res) => {
//     return res.json({ message: 'Hi Dude!' });
// });

router.post('/sessions', SessionController.store);

router.get('/spots', SpotController.index);
router.post('/spots', upload.single('thumbnail'), SpotController.store);
router.post('/spots/:spot_id/bookings', BookingController.store);

router.get('/dashboard', DashboardController.show);

module.exports = router;