// /services/todoService.js

export const fetchTodos = async (page, completed, search) => {
  // Simulate an API call to fetch todos with filters and pagination
  const todos = mockTodosData.filter(todo => {
    if (completed !== '') {
      return todo.completed === (completed === 'true');
    }
    if (search) {
      return todo.title.toLowerCase().includes(search.toLowerCase()) || 
             todo.description?.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });
  
  const startIndex = (page - 1) * 5;
  const paginatedTodos = todos.slice(startIndex, startIndex + 5);
  
  return {
    todos: paginatedTodos,
    totalCount: todos.length,
  };
};

// Example mock data (replace with API data in production)
const mockTodosData = [
  { id: 1, title: 'Todo 1', description: 'Description 1', dueDate: '2025-01-01', completed: false },
  { id: 2, title: 'Todo 2', description: 'Description 2', dueDate: '2025-01-02', completed: true },
  // Add more mock todos here
];
