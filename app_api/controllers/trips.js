const mongoose = require('mongoose')
const Trip = require('../models/travlr')
const Model = mongoose.model('trips')
const User = mongoose.model('users')

const getUser = async (req) => {
    console.error("Payload: ", req.payload);
    try {
        if (req.payload && req.payload.email) {
            const user = await User.findOne({ email: req.payload.email });
            if (!user) {
                console.error("User not found");
                return null; // Return null if user not found
            }
            return user;
        } else {
            console.error("Email not found in payload");
            return null; // Return null if email not found
        }
    } catch (err) {
        console.error("Error finding user:", err);
        throw err; // Throw error for caller to handle
    }
};

const tripsList = async(req, res) => {
    const q = await Model
        .find({})
        .exec()

    console.log(q)

    if(!q)
    {
        return res
            .status(404)
            .json(err)
    } else {
        return res
            .status(200)
            .json(q)
    }
}

const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code': req.params.code})
        .exec()

    console.log(q)

    if(!q)
    {
        return res
            .status(404)
            .json(err)
    } else {
        return res
            .status(200)
            .json(q)
    }
}

const tripsAddTrip = async (req, res) => {
    try {
        const user = await getUser(req);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const trip = await Trip.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });
        return res.status(201).json(trip);
    } catch (err) {
        console.error("Error adding trip:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const tripsUpdateTrip = async (req, res) => {
    getUser(req, res,
        (req, res) => {
            Trip
                .findOneAndUpdate({'code': req.params.tripCode },{
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                }, { new: true })
                .then(trip => {
                    if (!trip) {
                        return res
                            .status(404)
                            .send({
                                message: "Trip not found with code" + req.params.code
                            });
                    }
                    res.send(trip);
                }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res
                        .status(404)
                        .send({
                            message: "Trip not found with code" + req.params.code
                        });
                }
                return res
                    .status(500) // server error
                    .json(err);
            });
        }
    );
}

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
}
