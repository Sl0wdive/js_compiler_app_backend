import DraftModel from "../models/Draft.js";
import UserModel from "../models/User.js";

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
        const draftId = req.params.id;

        const drafts = await DraftModel.findOne({ _id: draftId});
        res.json(drafts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to receive post',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.userId });
        const drafts = await DraftModel.find({ sender: user })
        return res.json(drafts);
    }
    catch(err)
    {
      return res.status(400).json(err.message);
    }
  };