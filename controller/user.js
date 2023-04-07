const Exp = require('../models/user-details');
const bcryt = require('bcrypt');


exports.addUser = async (req, res, next) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const saltrounds = 10;
        bcryt.hash(password, saltrounds, async (err, hash) => {
            console.log(err);
            await Exp.create({
                name: name,
                email: email,
                password: hash
            })
            res.status(201).json({ email });
        })
    } catch (err) {
        res.status(500).json('something went wrong');
    }
}


exports.loginUser = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await Exp.findOne({ where: { email: email } });
        if (user.email === email) {
            bcryt.compare(password,user.password,(err, result) => {
                //console.log(result);
                if (err) {
                    return res.status(400).json({err});
                }
                 if (result === true) {
                    res.status(201).json(email);
                } 
                if(result===false)
                {
                    return res.status(400).json({result});
                }
            })
        }else{
           throw new Error('email is invalid');
        }
    } catch (err) {
        return res.status(501).json({"message":"email not found"});
    }
}