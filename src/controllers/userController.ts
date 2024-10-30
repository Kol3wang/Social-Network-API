import { Request, Response } from 'express';
import User from '../models/User';
import Thought from '../models/Thought';

/**
 * GET All Users /users
 * @returns an array of Users
 */
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET User by ID /users/:userId
 * @param string userId
 * @returns a single User object
 */
export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate('thoughts').populate('friends');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * POST User /users
 * @param object username, email
 * @returns a single User object
 */
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * PUT User by ID /users/:userId
 * @param object userId, user data to update
 * @returns a single User object
 */
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'No user with this ID!' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * DELETE User by ID /users/:userId
 * @param string userId
 * @returns string
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (user) {
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and associated thoughts deleted!' });
    } else {
      res.status(404).json({ message: 'No user with that ID' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};