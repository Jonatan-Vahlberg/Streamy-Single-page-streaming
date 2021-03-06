import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  UPDATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM
} from "../actions/types"
import streams from "../apis/streams.js"
import history from "../history"

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: {
      userId: userId
    }
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}

export const createStream = formValues => async (dispatch,getState) =>{
  const {userId} = getState().auth
  const response = await streams.post('/streams',{ ...formValues,userId })

   dispatch({type: CREATE_STREAM, payload: response.data})
   history.push('/')
}

export const updateStream = (id,formValues) => async (dispatch,getState) =>{
  const {userId} = getState().auth
  const response = await streams.patch(`/streams/${id}`,formValues)
    console.log(id,formValues)
   dispatch({type: UPDATE_STREAM, payload: response.data})
   history.push('/')
}

export const fetchStreams = formValues => async dispatch =>{
  const response = await streams.get('/streams')

   dispatch({type: FETCH_STREAMS, payload: response.data})
}

export const fetchStream = id => async dispatch =>{
  const response = await streams.get(`/streams/${id}`)

   dispatch({type: FETCH_STREAM, payload: response.data})
}

export const deleteStream = id => async dispatch =>{
  await streams.delete(`/streams/${id}`)

   dispatch({type: DELETE_STREAM, payload: id })
   history.push('/')
}
