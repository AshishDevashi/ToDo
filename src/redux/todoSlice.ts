import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { FilterType, SortType, Todo, TodoState } from '../utils/types';


const initialState: TodoState = {
    todos: [],
    filter: 'All',
    sort: 'id',
    loading: false,
    error: null as string | null,
    hasMore: true,
};


// Async thunk to fetch todos
export const fetchTodos = createAsyncThunk<Todo[], number>(
    'todo/fetchTodos',
    async (page: number) => {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/todos`, {
            params: {
                _page: page,
                _limit: 10, // Optional: set how many items per page
            },
        });

        return res.data.map((todo: Omit<Todo, 'created_at' | 'updated_at'>) => ({
            ...todo,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            created_by: 'api',
        }));
    }
);


const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const newTodo: Todo = {
                userId: 0,
                id: Date.now(),
                title: action.payload,
                completed: false,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                created_by: 'user',
            };
            state.todos.unshift(newTodo);
        },
        updateTodo: (state, action: PayloadAction<{ id: number; title: string }>) => {
            const { id, title } = action.payload;
            const todo = state.todos.find(t => t.id === id);
            if (todo) {
                todo.title = title;
                todo.updated_at = new Date().toISOString();
            }
        },
        toggleTodo: (state, action: PayloadAction<number>) => {
            const todo = state.todos.find(t => t.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
                todo.updated_at = new Date().toISOString();
            }
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter(t => t.id !== action.payload);
        },
        editTodo: (state, action: PayloadAction<{ id: number; title: string }>) => {
            const todo = state.todos.find(t => t.id === action.payload.id);
            if (todo) {
                todo.title = action.payload.title;
                todo.updated_at = new Date().toISOString();
            }
        },
        setFilter: (state, action: PayloadAction<FilterType>) => {
            state.filter = action.payload;
        },
        setSort: (state, action: PayloadAction<SortType>) => {
            state.sort = action.payload;
        },
        clearToDos: (state) => {
            state.todos = [];
            state.hasMore = true;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.length === 0 || (state.todos.length + action.payload.length) >= 70) {
                    state.hasMore = false;
                } else {
                    state.todos = [...state.todos, ...action.payload];
                }
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch todos';
            });
    },
});

export const {
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    setFilter,
    setSort,
    updateTodo,
    clearToDos
} = todoSlice.actions;

export default todoSlice.reducer;
