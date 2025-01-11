import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useCreateTodo, useUpdateTodo } from '../api/actions/todo'; // Assuming you have an update hook

// Validation schema
const TodoSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  dueDate: Yup.date(),
  completed: Yup.boolean(),
});

const TodoForm = ({ initialValues = {}, onClose }) => {
  const { mutateAsync: createTodo } = useCreateTodo();
  const { mutateAsync: updateTodo } = useUpdateTodo();

  const isUpdate = !!initialValues;
  return (
    <Box >
      <Formik
        initialValues={{
          title: initialValues?.title || '',
          description: initialValues?.description || '',
          dueDate: initialValues?.dueDate ? initialValues.dueDate.split('T')[0] : '',
          completed: initialValues?.completed || false,
        }}
        validationSchema={TodoSchema}
        onSubmit={async (values) => {
          try {
            if (isUpdate) {
              const response = await updateTodo({ id: initialValues._id, ...values });
              console.log('Update response:', response);
            } else {
              const response = await createTodo(values);
              console.log('Create response:', response);
            }
            onClose(); 
          } catch (err) {
            console.error('Error:', err);
          }
        }}
      >
        {({ errors, touched, handleChange, handleBlur, values }) => (
          <Form>
            <Box mb={2} mt={3}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Title"
                sx={{color:"#fff"}}
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
              />
            </Box>

            <Box mb={2}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                multiline
                rows={4}
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
            </Box>

            <Box mb={2}>
              <TextField
                fullWidth
                id="dueDate"
                name="dueDate"
                label="Due Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={values.dueDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.dueDate && Boolean(errors.dueDate)}
                helperText={touched.dueDate && errors.dueDate}
              />
            </Box>

            <Button type="submit" variant="contained" color="secondary" fullWidth>
              {isUpdate ? 'Update' : 'Submit'}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default TodoForm;
