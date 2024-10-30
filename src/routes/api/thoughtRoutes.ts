import { Router } from 'express';
import Thought from '../../models/Thought';

const thoughtRouter = Router();

// Route to get all thoughts
thoughtRouter.get('/', async (_req, res) => {
  try {
    const thoughts = await Thought.find(); // Retrieve all thoughts
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get thoughts' });
  }
});

// Route to get a single thought by ID
thoughtRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const thought = await Thought.findById(id);

    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    return res.json(thought);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to get thought' });
  }
});

// Route to create a new thought
thoughtRouter.post('/', async (req, res) => {
  try {
    const { thoughtText, username } = req.body;
    const newThought = await Thought.create({ thoughtText, username });
    res.status(201).json(newThought);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create thought' });
  }
});

// Route to update a thought by ID
thoughtRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { thoughtText, username } = req.body;

    const updatedThought = await Thought.findByIdAndUpdate(
      id,
      { thoughtText, username },
      { new: true, runValidators: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    return res.json(updatedThought);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update thought' });
  }
});

// Route to delete a thought by ID
thoughtRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedThought = await Thought.findByIdAndDelete(id);

    if (!deletedThought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    return res.json({ message: 'Thought deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete thought' });
  }
});

export default thoughtRouter;