import { configureStore } from "@reduxjs/toolkit";
import workReducer from "./workSlice";


export default configureStore({
  reducer: {
    tasks: workReducer
  }
})