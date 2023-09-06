import { dataPoint } from './firebase-helper.server';

type Todo = {
  id: string;
  title: string;
};

const userTodos = (uid: string) => dataPoint<Todo>(`users/${uid}/todos`);

export const todoService = {
  getTodosByUid: async (uid: string) => {
    const todoSnap = await userTodos(uid).get();
    return todoSnap.docs.map((doc) => doc.data());
  },
  addTodo: async (uid: string, title: string) => {
    const newTodoRef = userTodos(uid).doc();
    await newTodoRef.set({ title, id: newTodoRef.id });
  },
  removeTodo: async (uid: string, todoId: string) => {
    await userTodos(uid).doc(todoId).delete();
  },
};
