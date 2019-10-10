const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const { tech } = req.query;

        const spots = await Spot.find({ techs: tech });

        return res.json(spots);
    },

    async store(req, res) {
        // Get values sent in the request.
        const { filename } = req.file;
        const { company, price, techs } = req.body;
        const { user_id } = req.headers;

        // User exists?
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(400).json({ error: 'User does not exists.' });
        }

        // Create the new spot.
        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            price,
            techs: techs.split(',').map(tech => tech.trim())
        });

        return res.json(spot);
    }
};