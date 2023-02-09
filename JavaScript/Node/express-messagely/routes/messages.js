const express = require('express')
const Messages = require("../models/message");
const {ensureLoggedIn, ensureCorrectUser} = require("../middleware/auth");
const ExpressError = require('../expressError')

const router = express.Router()

/** GET /:id - get detail of message.
 * 
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/
router.get("/:id", ensureLoggedIn, async function (req, res, next) {
    try {
        let message = await Messages.get(req.params.id);

        if (req.user.username !== message.from_user.username
             || req.user.username !== message.to_user.username) {
            throw new ExpressError(`Unauthorized.`, 401);
        }
        return res.json({message});
    }

    catch (err) {
        return next(err);
    }
});

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/
router.post("/", ensureLoggedIn, async function (req, res, next) {
    try {
        let {to_username, body} = req.body

        if (!to_username) {
            throw new ExpressError(`Please enter "to" username.`, 400)
        }
        if (!body) {
            throw new ExpressError(`Body can't be empty.`, 400)
        }
        const data = {
            from_username: req.user.username, 
            to_username, 
            body
        }
        let message = await Messages.create(data);
        return res.json({message});
    }

    catch (err) {
        return next(err);
    }
});

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/
router.post("/:id/read", ensureLoggedIn, async function (req, res, next) {
    try {
        let message = await Messages.get(req.params.id);
        if (message.to_user.username === req.user.username) {
            let readMsg = await Messages.markRead(req.params.id);
    
            return res.json({readMsg});
        }
    }

    catch (err) {
        return next(err);
    }
});


module.exports = router;
