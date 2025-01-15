import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import activityReducer from './activities/activitySlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    activities: activityReducer,
  },
}) 