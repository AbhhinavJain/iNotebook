const express = require('express');
const router = express.Router();
var fetchuser = require('../middleWare/fetchuser');
const Notes = require('../models/Notes')
const {
    body,
    validationResult
} = require('express-validator');

//Route 1: get all the notes using : get "/api/notes/getUser" .login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {

        const notes = await Notes.find({
            user: req.user.id
        });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 2: adding a new notes using : Post "/api/notes/getUser" .login required
router.post('/addnote', fetchuser, [

    body('title', 'Enter a valid title').isLength({
        min: 3
    }),
    body('description', 'description must be atleast 5 characters').isLength({
        min: 5
    })
], async (req, res) => {
    try {
        const {
            title,
            description,
            tag
        } = req.body;
        // If there are  errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        })
        const saveNote = await note.save();
        res.json(saveNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 3: Update a note using : Put "/api/notes/updatenote" .login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const {
        title,
        description,
        tag
    } = req.body;
    // create a new note
    try {

        const newNote = {};
        if (title) {
            newNote.title = title
        }
        if (description) {
            newNote.description = description
        }
        if (tag) {
            newNote.tag = tag
        }

        // find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found");
        }
        if (String(note.user) !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, {
            $set: newNote
        }, {
            new: true
        });
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


//Route 4: Delete a note using : Delete "/api/notes/deletenote" .login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {


    // find the note to be delete and delete it
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found");
        }
        // Allowed deletetion only if user owns this Note
        if (String(note.user) !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({
            "Success": "Note has been deleted",
            note: note
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})




module.exports = router