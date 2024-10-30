import { Router } from 'express';
import User from '../../models/User';

const userRouter = Router();

// Route to get all users
userRouter.get('/', async (_req, res) => {
  try {
    const users = await User.find(); // Retrieve all users from the database
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get users' });
  }
});

// Route to create a new user
userRouter.post('/', async (req, res) => {
  try {
    const { username, email } = req.body;
    const newUser = await User.create({ username, email });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Route to update a user by ID
userRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update user' });
  }
});

// Route to delete a user by ID
userRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default userRouter;