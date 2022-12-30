import {createSlice} from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import {setError} from "./errors";

const initialState = {entities: [], isLoading: true};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        recived(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
        update(state, action) {
            const elementIndex = state.entities.findIndex(
                (el) => el.id === action.payload.id
            );
            state.entities[elementIndex] = {
                ...state.entities[elementIndex],
                ...action.payload,
            };
        },
        remove(state, action) {
            state.entities = state.entities.filter(
                (el) => el.id !== action.payload.id
            );
        },
        taskRequested(state) {
            state.isLoading = true;
        },
        taskRequestFailed(state) {
            state.isLoading = false;
        },
        addTask(state, {payload}) {
            const {title, completed} = payload.params
            const {id} = payload
            state.entities.push({
                userId: 1,
                id: id,
                title: title,
                completed: completed,
            })
            state.isLoading = false;
        }
    },
});
const {actions, reducer: taskReducer} = taskSlice;
const {update, remove, recived, taskRequested, taskRequestFailed, addTask} = actions;

export const loadTasks = () => async (dispatch) => {
    dispatch(taskRequested());
    try {
        const data = await todosService.fetch();
        dispatch(recived(data));
    } catch (error) {
        dispatch(taskRequestFailed());
        dispatch(setError(error.message));
    }
};

export const completeTask = (id) => (dispatch) => {
    dispatch(update({id, completed: true}));
};

export function titleChanged(id) {
    return update({id, title: `New title for ${id}`});
}

export function taskDeleted(id) {
    return remove({id});
}

export const createTask = (newTask) => async (dispatch) => {
    dispatch(taskRequested())
    try {
        const data = await todosService.set(newTask)
        dispatch(addTask(data))
    } catch (error) {
        dispatch(taskRequestFailed());
        dispatch(setError(error.message));
    }
};

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;

export default taskReducer;
