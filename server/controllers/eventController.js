const Event = require('../models/event');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const User = require('../models/user');

const eventController = {
    createEvent: async (req, res) => {
        try {
            const {
                eventName,
                address,
                donationTime,
                operationTime,
                startTime,
                endTime,
                image,
                description,
            } = req.body;
            console.log(req.body);
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                res.status(401).json({
                    message: 'Authorization header missing',
                });
            }
            token = authHeader.split(' ')[1];
            const user = jwt.verify(token, process.env.JWT_ACCESS_KEY);
            const dataUser = await User.findById(user.id).select('-password');
            const formattedDay = moment(donationTime, 'YYYY/MM/DD').format(
                'DD/MM/YYYY'
            );
            console.log(donationTime);

            const newEvent = new Event({
                eventName,
                userId: dataUser._id,
                image,
                address,
                donationTime: formattedDay,
                description,
                startTime,
                endTime,
            });
            const event = await newEvent.save();
            res.status(200).json(event);
        } catch (error) {
            console.log(error);
        }
    },
    getEvent: async (req, res) => {
        const { eventName, startDate, endDate, province, district, ward } =
            req.body;
        let query = {};

        if (eventName) {
            query.eventName = { $regex: new RegExp(eventName, 'i') }; // Tìm kiếm theo tên sự kiện
        }

        if (startDate && endDate) {
            query.donationTime = {
                $gte: moment(startDate).format('DD/MM/YYYY'),
                $lte: moment(endDate).format('DD/MM/YYYY'),
            };
        } else if (startDate) {
            query.donationTime = {
                $gte: moment(startDate).format('DD/MM/YYYY'),
            };
        } else if (endDate) {
            query.donationTime = {
                $lte: moment(endDate).format('DD/MM/YYYY'),
            };
        }

        if (province) {
            query['address.province'] = province;
        }

        if (district) {
            query['address.district'] = district;
        }

        if (ward) {
            query['address.ward'] = ward;
        }

        try {
            const events = await Event.find(query)
                .populate({
                    path: 'userId',
                    select: 'username avatar introduce',
                })
                .lean();
            const count = events.length;
            res.json({ count, events });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch events' });
        }
    },
    getEventById: async (req, res) => {
        const { eventName, startDate, endDate } = req.body;
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({
                message: 'Authorization header missing',
            });
        }
        token = authHeader.split(' ')[1];
        const user = jwt.verify(token, process.env.JWT_ACCESS_KEY);
        let query = {};

        if (user.id) {
            query.userId = user.id;
        }

        if (eventName) {
            query.eventName = { $regex: new RegExp(eventName, 'i') }; // Tìm kiếm theo tên sự kiện
        }

        if (startDate && endDate) {
            query.donationTime = {
                $gte: moment(startDate).format('DD/MM/YYYY'),
                $lte: moment(endDate).format('DD/MM/YYYY'),
            };
        } else if (startDate) {
            query.donationTime = {
                $gte: moment(startDate).format('DD/MM/YYYY'),
            };
        } else if (endDate) {
            query.donationTime = {
                $lte: moment(endDate).format('DD/MM/YYYY'),
            };
        }

        try {
            const events = await Event.find(query)
                .populate({
                    path: 'userId',
                    select: 'username avatar introduce',
                })
                .lean();
            const count = events.length;
            res.json({ count, events });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch events' });
        }
    },
    getEventByIdEven: async (req, res) => {
        try {
            const event = await Event.findById(req.params.id)
                .populate({
                    path: 'userId', // Trường liên kết đến collection User
                    select: 'username avatar introduce',
                })
                .exec(); // Thực thi populate

            if (!event) {
                return res.status(400).send({ message: 'Invalid link ID' });
            }

            // Customize the returned data if needed:
            const customizedEvent = {
                ...event._doc,
                username: event.userId.username,
                avatar: event.userId.avatar,
                introduce: event.userId.introduce,
            };
            delete customizedEvent.userId;

            return res.status(200).json(customizedEvent);
        } catch (error) {
            // Xử lý lỗi
            console.error(error);
            res.status(500).send({ message: 'Internal server error' });
        }
    },
};

module.exports = eventController;
