import { useState } from "react"
import { useDispatch } from "react-redux"
import { nanoid } from 'nanoid';
import { createTodo } from '../../store/todo/actions'
// import dayjs from 'dayjs'
import { getTodoRefById } from '../../services/firebase'
import { set, push } from "firebase/database"
import '../../App.less'

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
            file: fileTodo,
            status: false
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
        <form onSubmit={handleCreateTodo} className='form'>
            <label htmlFor="title">Название заметки</label>
            <input className='input_main' type='text' id='title' value={titleTodo} onChange={(e) => { setTitleTodo(e.target.value) }} />

            <label htmlFor="descr">Описание заметки</label>
            <input className='input_main' type='text' id='descr' value={descriptionTodo} onChange={(e) => { setDescriptionTodo(e.target.value) }} />

            <label id="labelFile" className="label_file" htmlFor="file">Прикрепить файл</label>
            <div>
                <input className='input_file' type="file" id="file" value={fileTodo} onChange={(e) => { setFileTodo(e.target.value) }} multiple />
            </div>

            <button className='input_main btn' type='submit'>Создать</button>

        </form >
        {/* <p>{check}</p> */}
    </>
    )
}