import { useState } from "react"
import { useDispatch } from "react-redux"
import { nanoid } from 'nanoid';
import { createTodo } from '../../store/todo/actions'
import { getTodoRefById } from '../../services/firebase'
import { set, update } from "firebase/database"
import '../../App.less'

export function CreateTodo({ ...todo }) {

    const dispatch = useDispatch()
    const [titleTodo, setTitleTodo] = useState(todo.title ? todo.title : '')
    const [descriptionTodo, setDescriptionTodo] = useState(todo.descr ? todo.descr : '')
    const [dateTodo, setDateTodo] = useState(todo.date ? todo.date : '')
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
            file: fileTodo,
            status: false,
            date: dateTodo
        }
        console.log(newTodo);
        dispatch(createTodo(newTodo))
        set(getTodoRefById(newTodoId), newTodo)

        getDefaultInputValue()

    }

    // Обновление задачи
    const handleUpdateTodo = () => {

        const updateTodo = {
            title: titleTodo,
            description: descriptionTodo,
            file: fileTodo,
            status: todo.status,
            date: dateTodo
        }
        console.log(`todo.id:`, todo.id)
        update(getTodoRefById(todo.id), updateTodo)
    }

    function getDefaultInputValue() {
        setTitleTodo('')
        setDescriptionTodo('')
        setFileTodo('')
        setDateTodo('')
    }

    return (<>
        <form onSubmit={
            todo.id ? handleUpdateTodo : handleCreateTodo
        } className='form'>
            <label htmlFor="title">Название заметки</label>
            <input className='input_main' type='text' id='title' value={titleTodo} onChange={(e) => { setTitleTodo(e.target.value) }} />

            <label htmlFor="descr">Описание заметки</label>
            <input className='input_main' type='text' id='descr' value={descriptionTodo} onChange={(e) => { setDescriptionTodo(e.target.value) }} />

            <label id="labelFile" className="label_file" htmlFor="file">Прикрепить файл</label>
            <div>
                <input className='input_file' type="file" id="file" value={fileTodo} onChange={(e) => { setFileTodo(e.target.value) }} multiple />
            </div>
            <label htmlFor="date">Дата окончания</label>
            <input className='input_date' type='date' id='date' value={dateTodo} onChange={(e) => {
                setDateTodo(e.target.value)
                console.log(`date Create todo:`, e.target.value)
            }} />
            <button className='input_main btn' type='submit'>
                {todo.title ? (<span>Обновить</span>) :
                    (<span>Создать</span>)}
            </button>

        </form >
    </>
    )
}