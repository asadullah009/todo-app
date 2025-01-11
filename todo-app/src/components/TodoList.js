import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment/moment';

const TodoList = ({ todos, onDelete, onEdit, onToggleCompletion }) => {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedTodoId(id);
    setDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(selectedTodoId);
    setDeleteConfirmationOpen(false);
    setSelectedTodoId(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setSelectedTodoId(null);
  };

  return (
    <>
      <List>
  {todos?.data?.map((todo) => (
    <ListItem key={todo.id} divider>
      <Checkbox
        checked={todo.completed}
        onChange={() => onToggleCompletion(todo._id, {...todo, completed: !todo.completed})}
      />
      <ListItemText
        primary={todo.title}
        secondary={
          <>
            <Typography variant="body2" color="textSecondary">
              Due: {moment(todo.dueDate).format('MMMM Do YYYY, h:mm a')}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {todo.description}
            </Typography>
          </>
        }
      />
      <Box>
        <IconButton onClick={() => onEdit(todo)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDeleteClick(todo._id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </ListItem>
  ))}
</List>

      {/* Confirmation Modal */}
      <Dialog open={deleteConfirmationOpen} onClose={handleCancelDelete}>
        <DialogTitle>Are you sure you want to delete this todo?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TodoList;
