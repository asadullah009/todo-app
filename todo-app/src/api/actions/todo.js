
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodo, deleteTodo, getAllList, updateTodo } from "../services/todo";



export const useGetTodoList = (page, limit, filter, search, sortOrder, sortBy) => {

  return useQuery({
    queryKey: [{ query: "getTodoList", page, limit, filter, search, sortOrder, sortBy }],
    queryFn: () => getAllList(page, limit, filter, search, sortOrder, sortBy),
    refetchOnWindowFocus: false,
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [{ query: "getTodoList" }],
      });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [{ query: "getTodoList" }],
      });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [{ query: "getTodoList" }],
      });
    },
  });
};
