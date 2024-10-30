import { Request, Response } from 'express';
import Thought from '../models/Thought';
import User from '../models/User';

/**
 * GET All Thoughts /thoughts
 * @returns an array of Thoughts
 */
export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET Thought by ID /thoughts/:thoughtId
 * @param string thoughtId
 * @returns a single Thought object
 */
export const getThoughtById = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findById(thoughtId);
    if (thought) {
      res.json(thought);
    } else {
      res.status(404).json({ message: 'Thought not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * POST Thought /thoughts
 * @param object thoughtText, username, userId
 * @returns a single Thought object
 */
export const createThought = async (req: Request, res: Response) => {
  const { thoughtText, username, userId } = req.body;
  try {
    const newThought = await Thought.create({ thoughtText, username });
    await User.findByIdAndUpdate(userId, { $push: { thoughts: newThought._id } });
    res.status(201).json(newThought);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * PUT Thought by ID /thoughts/:thoughtId
 * @param object thoughtId, thought data to update
 * @returns a single Thought object
 */
export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (thought) {
      res.json(thought);
    } else {
      res.status(404).json({ message: 'No thought with this ID!' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * DELETE Thought by ID /thoughts/:thoughtId
 * @param string thoughtId
 * @returns string
 */
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (thought) {
      res.json({ message: 'Thought deleted!' });
    } else {
      res.status(404).json({ message: 'No thought with that ID' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};