import { createSlice } from "@reduxjs/toolkit";
import { Istate, Iaction, IaddAction } from "../interfaces";


export const workSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: []
    },
    reducers: {
        addElement(state: Istate, action: IaddAction) {
            const {title, task} = action.payload;
            if (title && task) {
                state.tasks.push(
                    {
                        id: new Date().toISOString(),
                        title,
                        task,
                        acheived: false
                    }
                )
            }
            
        },
        toggleElement(state: Istate, action: Iaction) {
            const element = state.tasks.find(task => task.id == action.payload.id)
            if (element) {
                element.acheived = !element.acheived
            }
            
            
        },
        deleteElement(state: Istate, action: Iaction) {
            state.tasks = state.tasks.filter(task => task.id === action.payload.id)
        }
    },
})

export const { addElement, toggleElement, deleteElement } = workSlice.actions

export default workSlice.reducer