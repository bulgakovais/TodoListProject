import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { chatsRef, getChatMsgRefById, getChatRefById } from '../../services/firebase'
import { onValue, set, remove } from "firebase/database"

export default function Todo() {

    const dispatch = useDispatch()

    // Подгрузка всех todo на unmount
    useEffect(() => {
        const unsubscribe = onValue(todosRef, (snapShots) => {
            const newTodos = []

            snapShots.forEach(snapshot => {
                newTodos.push(snapshot.val())
            })
            dispatch(setTodos(newTodos))
        })

        return unsubscribe
    }, [])

    // // Удаление задачи
    // const handleDeleteChat = (itemId) => {
    //     remove(getChatRefById(itemId))
    //     remove(getChatMsgRefById(itemId))
    // }

    return
}