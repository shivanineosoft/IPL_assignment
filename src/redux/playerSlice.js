import { createSlice } from '@reduxjs/toolkit'

export const playerSlice = createSlice({
  name: 'counter',
  initialState: {
    teamDetail:[],
    value: 0,
    FormModal:false
  },
  reducers: {
    addTeamDetail: (state,value) => {
        state.teamDetail = value.payload
    },
    toggleFormModal: (state,value) => {
        state.FormModal = value.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addTeamDetail,toggleFormModal } = playerSlice.actions

export default playerSlice.reducer