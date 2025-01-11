import apiClient from "../client";
import endpoints from "../endpoints";


export const getAllList = async (page, limit, filter, search, sortOrder, sortBy) => {
  try {
    const response = await apiClient.get(
      `${endpoints.TODO}?completed=${filter}&search=${search}&sortBy=${sortBy}&order=${sortOrder}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch List",
      error
    };
  }
};

export const createTodo = async (values) => {
  const response = await apiClient.post(endpoints.TODO, values);

  return response;
};

export const updateTodo = async (values) => {
  console.log('values:', values);
  const response = await apiClient.put(`${endpoints.TODO}/${values.id}`, values);

  return response;
};


export const deleteTodo = async (id) => {
  const response = await apiClient.delete(`${endpoints.TODO}/${id}`);

  return response;
};


