import { Request, Response } from "express";
import { Thought, User } from "../models/index.js";

/**
 * GET All Thoughts /api/thoughts
 * @returns an array of Thoughts
 */
export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    return res.json(thoughts);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * GET Thought based on id /api/thoughts/:thoughtId
 * @param string thoughtId
 * @returns a single Thought object
 */
export const getThoughtById = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findById(thoughtId);

    if (thought) {
      return res.json(thought);
    } else {
      return res.status(404).json({
        message: "Thought not found",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * POST Thought /api/thoughts
 * @param object thought
 * @returns a single Thought object
 */
export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.create(req.body);

    // Add thought to the associated user's thoughts array
    await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { thoughts: thought._id } },
      { new: true }
    );

    return res.json(thought);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * PUT Thought based on id /api/thoughts/:thoughtId
 * @param string thoughtId
 * @param object thought data
 * @returns updated Thought object
 */
export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res
        .status(404)
        .json({ message: "No thought found with this id!" });
    }

    return res.json(thought);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * DELETE Thought based on id /api/thoughts/:thoughtId
 * @param string thoughtId
 * @returns success message
 */
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    });

    if (!thought) {
      return res
        .status(404)
        .json({ message: "No thought found with this id!" });
    }

    // Remove thought from user's thoughts array
    await User.findOneAndUpdate(
      { username: thought.username },
      { $pull: { thoughts: req.params.thoughtId } }
    );

    return res.json({ message: "Thought successfully deleted" });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * POST Reaction /api/thoughts/:thoughtId/reactions
 * @param string thoughtId
 * @param object reaction
 * @returns updated Thought object
 */
export const addReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res
        .status(404)
        .json({ message: "No thought found with this id!" });
    }

    return res.json(thought);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * DELETE Reaction /api/thoughts/:thoughtId/reactions/:reactionId
 * @param string thoughtId
 * @param string reactionId
 * @returns updated Thought object
 */
export const removeReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );

    if (!thought) {
      return res
        .status(404)
        .json({ message: "No thought found with this id!" });
    }

    return res.json(thought);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
