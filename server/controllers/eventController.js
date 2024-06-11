const Event = require('../models/event');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const User = require('../models/user');
const EventRegistration = require('../models/eventRagistrations');

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
    // By ID user
    getEventById: async (req, res) => {
        try {
            const { eventName, startDate, endDate } = req.body;
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                return res
                    .status(401)
                    .json({ message: 'Authorization header missing' });
            }

            const token = authHeader.split(' ')[1];
            const user = jwt.verify(token, process.env.JWT_ACCESS_KEY);

            const query = {};

            if (eventName) {
                query.eventName = { $regex: eventName, $options: 'i' };
            }

            const getEventRegis = await EventRegistration.find({
                userId: user.id,
            });
            console.log(getEventRegis);
            if (user.role !== 'Cơ sở y tế') {
                if (getEventRegis.length > 0) {
                    const eventIds = getEventRegis.map((item) =>
                        item.eventId.toString()
                    ); // Lấy danh sách các eventId
                    query._id = { $in: eventIds };
                } else {
                    return res.status(404).json({ message: '' });
                }
            }

            const getUserIdEvent = await Event.find({ userId: user.id });
            if (user.role === 'Cơ sở y tế') {
                if (getUserIdEvent.length > 0) {
                    query.userId = user.id;
                } else {
                    return res.status(404).json({ message: '' });
                }
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
            const events = await Event.find(query); // Lấy danh sách events trước

            // Tối ưu populate: chỉ populate khi cần thiết
            if (user.role === 'Cơ sở y tế') {
                await Event.populate(events, {
                    path: 'userId',
                    select: 'username avatar introduce',
                });
            } else {
                await Event.populate(events, {
                    path: 'userId',
                    select: 'username avatar introduce',
                });
            }

            const count = events.length;
            res.json({ count, events });
        } catch (error) {
            console.error('Error fetching events:', error);
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
            if (!event.userId) {
                return res.status(400).send({ message: 'Invalid userId' });
            }

            // Customize the returned data if needed:
            const customizedEvent = {
                ...event._doc,
                userId: event.userId?._id,
                username: event.userId.username,
                avatar: event.userId.avatar,
                introduce: event.userId.introduce,
            };

            return res.status(200).json(customizedEvent);
        } catch (error) {
            // Xử lý lỗi
            console.error(error);
            res.status(500).send({ message: 'Internal server error' });
        }
    },
    joinEvent: async (req, res) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ message: 'Authorization header missing' });
        }
        const token = authHeader.split(' ')[1];
        const user = jwt.verify(token, process.env.JWT_ACCESS_KEY);
        const eventId = req.params.id;
        const evenRegisExist = await EventRegistration.find({
            userId: user.id,
            eventId: eventId,
        });
        if (evenRegisExist.length > 0) {
            return res.status(409).json({
                code: 409,
                message: 'You have already registered for this event',
            });
        }
        const joinEvent = new EventRegistration({
            userId: user.id,
            eventId: eventId,
        });
        try {
            const result = await joinEvent.save();
            res.status(200).json(result);
        } catch (error) {
            console.error('Error saving event registration:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    cancelEvent: async (req, res) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ message: 'Authorization header missing' });
        }
        const token = authHeader.split(' ')[1];
        const user = jwt.verify(token, process.env.JWT_ACCESS_KEY);
        const eventId = req.params.id;
        const evenRegisExist = await EventRegistration.find({
            userId: user.id,
            eventId: eventId,
        });
        if (evenRegisExist.length > 0) {
            await EventRegistration.deleteOne({
                userId: user.id,
                eventId: eventId,
            });
            res.status(200).json({
                message: 'Event registration deleted successfully',
            });
        } else {
            res.status(404).json({ message: 'Event registration not found' });
        }
    },
    checkRegisEvent: async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                res.status(401).json({
                    message: 'Authorization header missing',
                });
            }
            const token = authHeader.split(' ')[1];
            const user = jwt.verify(token, process.env.JWT_ACCESS_KEY);
            const eventId = req.params.id;
            const eventRegistered = await EventRegistration.find({
                userId: user.id,
                eventId: eventId,
            })
                .populate({
                    path: 'userId',
                    select: 'username avatar',
                })
                .lean()
                .exec();
            if (eventRegistered.length > 0) {
                res.status(200).json(eventRegistered);
            } else {
                res.status(404).json({ message: 'unregistered' });
            }
        } catch (error) {}
    },
    deleteEvent: async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                res.status(401).json({
                    message: 'Authorization header missing',
                });
            }
            const token = authHeader.split(' ')[1];
            const user = jwt.verify(token, process.env.JWT_ACCESS_KEY);
            const eventRegis = EventRegistration.find({
                eventId: req.params.id,
            });

            const event = await Event.findById(req.params.id);
            if (user.id === event.userId.toString()) {
                await Event.findByIdAndDelete(req.params.id);
                if (eventRegis.length > 0) {
                    await EventRegistration.deleteMany({
                        eventId: req.params.id,
                    });
                }
                return res
                    .status(200)
                    .json({ code: 200, message: 'Delete Successfully' });
            } else {
                return res
                    .status(403)
                    .json({ code: 403, message: 'You are owner' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    updateEvent: async (req, res) => {
        try {
            const eventId = req.params.id;
            const eventData = req.body.eventData; // Lấy toàn bộ eventData

            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res
                    .status(401)
                    .json({ message: 'Authorization header missing' });
            }
            const token = authHeader.split(' ')[1];
            const user = jwt.verify(token, process.env.JWT_ACCESS_KEY);

            const event = await Event.findById(eventId);
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }

            if (user.id !== event.userId.toString()) {
                return res.status(403).json({
                    message: 'You are not authorized to update this event',
                });
            }

            const updatedEvent = await Event.findByIdAndUpdate(
                eventId,
                eventData, // Sử dụng eventData để cập nhật
                { new: true }
            );

            res.status(200).json({
                code: 200,
                message: 'Update Successfully',
                data: updatedEvent,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getUserRegisterEvent: async (req, res) => {
        try {
            const result = await EventRegistration.find({
                eventId: req.params.id,
            })
                .populate({
                    path: 'userId',
                    select: 'username avatar',
                })
                .lean()
                .exec();

            if (result.length > 0) {
                const count = result.length;
                return res
                    .status(200)
                    .json({ message: 'Success', data: { count, result } });
            } else {
                res.status(200).json({
                    data: [],
                });
            }
        } catch (error) {
            console.error('Error fetching event registrations:', error); // Log the error
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
};

module.exports = eventController;
