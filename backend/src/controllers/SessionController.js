const User = require('../models/User');

// index, show, store, update, destroy
module.exports = {
    async store(req, res) {
        //const email = req.body.email;
        const { email } = req.body; // faz o mesmo que a linha acima
        const { name } = req.body; // faz o mesmo que a linha acima

        // Esperar o retorno da função create com await.
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ email: email, name: name });
        } else {
            user = await User.findOneAndUpdate({ email: email }, { name: name }, { new: true});
        }

        return res.json(user);
    }
};