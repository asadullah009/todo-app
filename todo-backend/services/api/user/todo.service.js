const TodoModel = require('../../../models/todo');

module.exports = {

 list: async (req) => {
  try {
    const { completed, search, sortBy = 'dueDate', order = 'asc', page = 1, limit = 10 } = req.query;

    // Initialize the filter object
    const filter = {};

    // Apply filter for completed if not 'all'
    if (completed && completed !== 'all') {
      filter.completed = completed === 'true';
    }
    
    // Apply search filter if a search term is provided
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Determine sort order (ascending or descending)
    const sortOrder = order === 'asc' ? 1 : -1;

    // Pagination: Skip records based on page and limit
    const skip = (page - 1) * limit;

    // Fetch the total count of matching documents
    const totalCount = await TodoModel.countDocuments(filter);

    // Fetch the todos with the specified filters, sorting, and pagination
    const todos = await TodoModel.find(filter)
      .sort({ [sortBy]: sortOrder })  // Sort by dynamic field
      .skip(skip)
      .limit(Number(limit));

    return {
      status: 200,
      count: totalCount,
      data: todos,
    };
  } catch (error) {
    console.error('Error fetching Todo list:', error);
    return { status: 500, message: 'Internal server error', error };
  }
},



  create: async (req) => {
    try {
      const { title, description, completed, dueDate } = req.body;

      if (!title) {
        return res.status(400).json({ message: 'Title is required' });
      }

      const newTodo = new TodoModel({
        title,
        description,
        completed,
        dueDate
      });

      const savedTodo = await newTodo.save();
      return { status: 201, data: savedTodo };
    } catch (error) {
      console.error('Error fetching Todo list:', error);
      return { status: 500, message: 'Internal server error', error };
    }
  },
  update: async (req) => {
    try {
      const { id } = req?.params;

      const { title, description, completed, dueDate } = req.body;

      if (!title) {
        return res.status(400).json({ message: 'Title is required' });
      }

      const updatedTodo = await TodoModel.findByIdAndUpdate(
        id,
        {
          title: title,
          description: description,
          completed: completed,
          dueDate: dueDate,
        },
        { new: true }
      );
      return { status: 200, data: updatedTodo };
    } catch (error) {
      console.error('Error fetching Todo list:', error);
      return { status: 500, message: 'Internal server error', error };
    }
  },
  delete: async (req) => {
    try {
      const { id } = req?.params;

      await TodoModel.findByIdAndDelete(id);
      return { status: 200, message: 'Delete the data successfully!' };
    } catch (error) {
      console.error('Error fetching Todo list:', error);
      return { status: 500, message: 'Internal server error', error };
    }
  },
}
