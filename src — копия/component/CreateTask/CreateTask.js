import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { nanoid } from 'nanoid';
import { createTodo } from '../../store/todo/action'
import dayjs from 'dayjs'

export function CreateTask() {

    const dispatch = useDispatch()
    const [titleTodo, setTitleTodo] = useState('')
    const [descriptionTodo, setDescriptionTodo] = useState('')
    // const handleSubmit = () => {

    // }
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

    // Изменение значения инпута
    // const onChangeInput = (event) => {
    //     setInputValue(event.target.value)
    // }

    // Добавление чата
    const handleCreateChat = () => {

        if (titleTodo === '') {
            alert("Введите название ToDo")
            return
        }
        const newTodoId = `${inputValue}:${nanoid()}`
        dispatch(createTodo({
            id: newTodoId,
            name: titleTodo,
            description: descriptionTodo,

        }))
        set(getChatRefById(newChatId), { name: inputValue, id: newChatId })

        setTitleTodo('')

    }

    // Удаление чата
    const handleDeleteChat = (itemId) => {
        remove(getChatRefById(itemId))
        remove(getChatMsgRefById(itemId))
    }

    return (<form onSubmit={handleCreateChat}>
        <label for="title">Прикрепить файл</label>
        <input type='text' id='title' value={titleTodo} onChange={(e) => { setTitleTodo(e.target.value) }} />

        <label for="descr">Choose file to upload</label>
        <input type='text' id='descr' value={descriptionTodo} onChange={(e) => { setDescriptionTodo(e.target.value) }} />

        <label for="file">Choose file to upload</label>
        <input type="file" id="file" name="file" multiple />


        <button type='submit'>Создать</button>
    </form >
    )
}