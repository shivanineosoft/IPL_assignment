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

export const { addTeamDetail,toggleFormModal } = playerSlice.actions

export default playerSlice.reducer