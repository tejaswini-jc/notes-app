const Note = require('../models/note')

module.exports.list = (req, res) => {
    Note.find({user: req.user._id}).populate('category',['name'])
        .then((notes) => {
            res.json(notes)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Note.findById({_id: id, user:req.user._id}).populate('category',['name']) 
        .then((note) => {
            if (note) {
                res.json(note)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.count = (req, res) => {
    Note.find()
        .then((notes) => {
            res.json({
                count:notes.length
            })
        })
}

module.exports.create = (req, res) => {
    const body = req.body
    const note = new Note(body)
    note.user = req.user._id
    note.save()
        .then((note) => {
            res.json(note)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Note.findByIdAndUpdate({_id: id, user: req.user._id}, body, { new: true, runValidators: true })
        .then((note) => {
            if (note) {
                res.json(note)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.destroy = (req, res) => {
    const id = req.params.id
    Note.findByIdAndDelete({_id:id, user: req.user._id })
        .then((note) => {
            if (note) {
                res.json(note)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}