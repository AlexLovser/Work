import { createSlice } from "@reduxjs/toolkit";


export const workSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: []
    },
    reducers: {
        addElement(state, action) {
            const {title, task} = action.payload;
            state.tasks.push(
                {
                    id: new Date().toISOString(),
                    title,
                    task,
                    acheived: false
                }
            )
        },
        toggleElement(state, action) {
            const element = state.tasks.find(task => task.id == action.payload.id)
            element.acheived = !element.acheived
            
        },
        deleteElement(state, action) {
            state.tasks = state.tasks.filter(task => task.id === action.payload.id)
        }
    },
})

export const { addElement, toggleElement, deleteElement } = workSlice.actions

export default workSlice.reducer