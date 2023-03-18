import DraftModel from "../models/Draft.js";

export const create = async (req, res) => {
    try {
        const doc = new DraftModel({
            sender: req.userId,
            content: req.body.content,
        });
        
        const post = await doc.save();
        
        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to create new draft',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const drafts = await DraftModel.find();
        drafts.reverse();
        res.json(drafts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to receive post',
        });
    }
};