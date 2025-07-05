const cloudinary = require("cloudinary").v2;
const Debate = require('../models/Debate'); // Assuming you have a Debate model
const User = require('../models/User'); // Assuming you have a User model

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dvqfxjfia', // Replace with your actual Cloudinary cloud name
  api_key: '452653768355675', // Replace with your actual Cloudinary API key
  api_secret: 'W45YS0MwZnIvwPdOo5LdS5fRZ3s', // Replace with your actual Cloudinary API secret
});

exports.createDebate = async (req, res) => {
  try {
    // Check if the image, title, and category are provided
    if (!req.body.image || !req.body.title || !req.body.category) {
      return res.status(400).json({
        success: false,
        message: 'Image, title, and category are required',
      });
    }

    // Upload image to Cloudinary
    const myCloud = await cloudinary.uploader.upload(req.body.image, {
      folder: 'debates',
    });

    // Prepare new debate data
    const newDebateData = {
      Title: req.body.title,
      Category: req.body.category,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      owner: req.user._id,
      isFinish: false,
    };

    // Create the new debate in the database
    const debate = await Debate.create(newDebateData);

    // Find the user and add the debate ID to their debates_organised array
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // If user's debates_organised array is not initialized, initialize it
    if (!user.debates_organised) {
      user.debates_organised = [];
    }
    user.debates_organised.push(debate._id);

    await user.save();
    await debate.save();

    // Respond with success
    res.status(201).json({
      success: true,
      message: 'Debate created successfully',
      debate, // Optionally return the created debate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.keep_view = async (req, res) => {
    try {
        const messageData = {
            user : req.user._id,
            message : req.body.message,
            side : req.body.side,
            like : 0
        }
        const debate_id = req.body.debate_id;
        const debate = await Debate.findById(debate_id);
        debate.messages.push(messageData);
        const message_id = debate.messages[debate.messages.length - 1]._id;
        // const user = await User.findById(req.user._id);
        // user.debates_organised.push(debate._id);
        // await user.save();
        await debate.save();
        res.status(201).json({
            success: true,
            message : "Successfull",
            messageId : message_id
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};
exports.like_debate = async (req, res) => {
    try {
        const debate_id = req.body.debate_id;
        const debate = await Debate.findById(debate_id);
        debate.likes.push(req.user._id);
        // const user = await User.findById(req.user._id);
        // user.debates_organised.push(debate._id);
        // await user.save();
        await debate.save();
        res.status(201).json({
            success: true,
            debate
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};
exports.like_message = async (req, res) => {
    try {
        const message_id = req.body.message_id;
        const debate_id = req.body.debate_id;
        const debate = await Debate.findById(debate_id);
        // const objectId = ObjectId(id);
        const message = debate.messages.find(message => message._id.equals(message_id));
        message.like = message.like + 1;
        // const user = await User.findById(req.user._id);
        // user.debates_organised.push(debate._id);
        // await user.save();
        await debate.save();
        res.status(201).json({
            success: true,
            message: "Liked Message Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};
exports.comment_debate = async (req, res) => {
    try {
        const commentData = {
            comment : req.body.comment,
            user : req.user._id
        }
        const debate_id = req.body.debate_id;
        const debate = await Debate.findById(debate_id);
        debate.comments.push(commentData);
        await debate.save();
        res.status(201).json({
            success: true,
            message : "Commented Successfully...",
            
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};
exports.all_debates = async (req, res) => {
    try {
      const query = req.query.name ? { name: { $regex: req.query.name, $options: "i" } } : {};
      const debates = await Debate.find(query);
      res.status(200).json({
        success: true,
        debates
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  exports.finishDebate = async (req, res) => {
    try {
        const debate_id = req.body.debateId;
        const debate = await Debate.findById(debate_id);
        debate.isFinish = true;
        await debate.save();
        res.status(201).json({
            success: true,
            message : "Successfull",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};