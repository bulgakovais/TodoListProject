import { CREATE_TODO, DELETE_TODO, SET_TODOS } from './actions'

const initialState = { todoList: [] }

export const todoReducer = (state = initialState, action) => {
    switch (action?.type) {
        case (CREATE_TODO):
            {
                return {
                    todoList: [
                        ...state.todoList,
                        action.payload
                    ]
                }
            }
        case (DELETE_TODO):
            {
                const { id } = action.payload
                return {

                    todoList: [
                        ...state.todoList.filter(el => el.id !== id)

                    ]
                }
            }

        case (SET_TODOS):
            {
                return {
                    todoList: [...action.payload]
                }
            }

        default:
            {
                return state
            }
    }
}