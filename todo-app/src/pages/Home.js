import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Typography, Container, Dialog, DialogContent, DialogTitle, TextField, TablePagination, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { useDeleteTodo, useGetTodoList, useUpdateTodo } from '../api/actions/todo';

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [openForm, setOpenForm] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [sortOrder, setSortOrder] = useState('desc');
    const [sortBy, setSortBy] = useState('all');

    const { data } = useGetTodoList(page, limit, filter, search, sortOrder, sortBy);
    const { mutateAsync: updateTodo } = useUpdateTodo();
    const { mutateAsync: deleteTodo } = useDeleteTodo();

    useEffect(() => {
        setTodos(data);
    }, [data]);

    const handleDelete = async (id) => {
        try {
            const response = await deleteTodo(id);
            if (response.status === 200) {
                console.log('Todo deleted successfully:', response.data);
            } else {
                console.error('Failed to delete todo:', response.status);
            }
        } catch (err) {
            console.error('Error deleting todo:', err);
        }
    };

    const handleToggleCompletion = async (id, values) => {
        try {
            const response = await updateTodo({ id: values._id, ...values });
            if (response.status === 200) {
                console.log('Todo updated successfully:', response.data);
            } else {
                console.error('Failed to update todo:', response.status);
            }
        } catch (err) {
            console.error('Error updating todo:', err);
        }
    };

    const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(1); // Reset to first page
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage + 1);
    };

    const handleEdit = (todo) => {
        setSelectedTodo(todo);
        setOpenForm(true);
    };

    const handleAddTodo = () => {
        setSelectedTodo(null);
        setOpenForm(true);
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearch(value);
        setPage(1);
    };


    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    // Handle filtering by completion status
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
    };



    return (
        <Container maxWidth="md">
            <Box sx={{ my: 3 }}>
                <Typography variant="h4" gutterBottom>Todo List</Typography>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                    

                    <Grid item xs={12} sm={2}>
                        <FormControl fullWidth size="small">
                            <Select value={sortOrder} onChange={handleSortOrderChange}>
                                <MenuItem value="asc">Ascending</MenuItem>
                                <MenuItem value="desc">Descending</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <FormControl fullWidth size="small">
                            <Select value={filter} onChange={handleFilterChange}>
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="true">Completed</MenuItem>
                                <MenuItem value="false">Not Completed</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl fullWidth size="small">
                            <Select value={sortBy} onChange={handleSortByChange}>
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="dueDate">Due Date</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Search"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button variant="contained" color="secondary" onClick={handleAddTodo} fullWidth>
                            Add Todo
                        </Button>
                    </Grid>
                </Grid>

                <TodoList
                    todos={todos}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onToggleCompletion={handleToggleCompletion}
                />
                {
                    todos?.count === 0 && (
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 2,
                        }}>
                            No Data found!
                        </Box>
                    )
                }


                {
                    todos?.count > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={todos?.count || 0}
                                rowsPerPage={limit}
                                page={page - 1}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Box>
                    )
                }

                <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
                    <DialogTitle>{selectedTodo ? 'Edit Todo' : 'Add Todo'}</DialogTitle>
                    <DialogContent>
                        <TodoForm initialValues={selectedTodo} onClose={() => setOpenForm(false)} />
                    </DialogContent>
                </Dialog>
            </Box>
        </Container>
    );
};


export default TodoApp;
