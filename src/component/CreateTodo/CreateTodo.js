import { useState } from "react"
import { useDispatch } from "react-redux"
import { nanoid } from 'nanoid';
import { createTodo } from '../../store/todo/actions'
// import dayjs from 'dayjs'
import { getTodoRefById } from '../../services/firebase'
import { set } from "firebase/database"
// import { getTodoList } from "../../store/todo/selector";


export function CreateTodo() {

    const dispatch = useDispatch()
    const [titleTodo, setTitleTodo] = useState('')

    const [descriptionTodo, setDescriptionTodo] = useState('')

    const [fileTodo, setFileTodo] = useState('')


    // Создание задачи
    const handleCreateTodo = (event) => {

        event.preventDefault()
        if (titleTodo === '') {
            alert("Введите название ToDo")
            return
        }
        const newTodoId = `${nanoid()}`
        const newTodo = {
            id: newTodoId,
            title: titleTodo,
            description: descriptionTodo,
            file: fileTodo
        }
        console.log(newTodo);
        dispatch(createTodo(newTodo))
        set(getTodoRefById(newTodoId), newTodo)

        getDefaultInputValue()

    }

    function getDefaultInputValue() {
        setTitleTodo('')
        setDescriptionTodo('')
        setFileTodo('')
    }


    // const check = getTodoList()
    // console.log('check: ', check);

    return (<>
        <form onSubmit={handleCreateTodo} >
            <label htmlFor="title">Укажите название заметки</label>
            <input type='text' id='title' value={titleTodo} onChange={(e) => { setTitleTodo(e.target.value) }} />

            <label htmlFor="descr">Описание заметки</label>
            <input type='text' id='descr' value={descriptionTodo} onChange={(e) => { setDescriptionTodo(e.target.value) }} />

            <label htmlFor="file">Прикрепить файл</label>
            <input type="file" id="file" name="file" value={fileTodo} onChange={(e) => { setFileTodo(e.target.value) }} multiple />


            <button type='submit'>Создать</button>

        </form >
        {/* <p>{check}</p> */}
    </>
    )
}