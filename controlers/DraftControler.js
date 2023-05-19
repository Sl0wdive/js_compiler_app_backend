import DraftModel from "../models/Draft.js";
import UserModel from "../models/User.js";

export const create = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (user.CCount < 3){
            const doc = new DraftModel({
                sender: req.userId,
                content: req.body.content,
            });
            
            const post = await doc.save();
            
            res.json(post);
            await UserModel.findOneAndUpdate(
                {
                  _id: req.userId,
                },
                {
                  $inc: { CCount: 1 },
                },
                {
                    new: true,
                }
              );
        }
        else res.status(500).json({
            message: 'Drafts amount limit',
        });
        
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

        const drafts = await DraftModel.find({ _id: draftId});
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