import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jserver-gjvh.onrender.com",
  }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/tasks",
      transformResponse: (todos) => todos.reverse(),
      providesTags: ["Tasks"],
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/tasks",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Tasks"],
      async onQueryStarted(todo, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getTodos", undefined, (draft) => {
            draft.unshift({ id: crypto.randomUUID(), ...todo });
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    updateTodo: builder.mutation({
      query: ({ id, ...updatedTodo }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: updatedTodo,
      }),
      invalidatesTags: ["Tasks"],
      async onQueryStarted(
        { id, ...updatedTodo },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          api.util.updateQueryData("getTodos", undefined, (draft) => {
            const todoIndex = draft.findIndex((todo) => todo.id === id);
            draft[todoIndex] = {
              ...updatedTodo[todoIndex],
              id,
              ...updatedTodo,
            };
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getTodos", undefined, (todoList) => {
            const todoIndex = todoList.findIndex((todo) => todo.id === id);
            todoList.splice(todoIndex, 1);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = api;
