import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTodoRefById } from '../../services/firebase'
import { onValue, update, remove } from "firebase/database"
import { getTodoList } from "../../store/todo/selector"
import { setTodos } from "../../store/todo/actions"
import { todosRef } from '../../services/firebase'
import '../../App.less'
import { CreateTodo } from "../CreateTodo/CreateTodo"
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import * as dayjs from 'dayjs'


export function Todo() {

    const [seeTodo, setSeeTodo] = useState(false)
    const [todoId, setTodoId] = useState('')
    const [edit, setEdit] = useState(false)
    const [valid, setValid] = useState(true)
    const dispatch = useDispatch()
    const todos = useSelector(getTodoList)
    const today = dayjs().format().substring(0, 10)


    function handlerValidDate(date) {
        dayjs.extend(isSameOrBefore)
        const truthDate = dayjs(today).isSameOrBefore(date)
        setValid(truthDate)
    }

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


    const handleChangeStatus = (el) => {
        const updateTodo = {
            title: el.title,
            description: el.description,
            file: el.file,
            status: !el.status
        }

        update(getTodoRefById(el.id), updateTodo)
    }

    const handlerSeeTodo = (id) => {
        if (id === todoId) {
            setSeeTodo(!seeTodo)
        }
        else if (id !== todoId) {
            setSeeTodo(true)
        }
    }
    function deleteTodo(el) {
        remove(getTodoRefById(el.id))
    }

    return (<>
        <h3 className='todoHeader'>Имеющиеся задачи</h3>
        <div>{todos?.map((el) => (
            <div id={el.id} className='todoItem' key={el.id}>
                <div className='todoItem_flex'>

                    <button id='check' className='btn_todo' onClick={() => {
                        handleChangeStatus(el)
                    }}>
                        {
                            el.status ? (
                                <i className="fa fa-check-circle" aria-hidden="true"></i>
                            ) : <i className="fa fa-circle-o" aria-hidden="true"></i>
                        }
                    </button>

                    <h4 className='todoItem_title'>{el.title}</h4>
                    <div>

                        <button id='see' className='btn_todo' onClick={() => {
                            setTodoId(el.id)
                            handlerValidDate(el.date)
                            handlerSeeTodo(el.id)
                        }}><i className="fa fa-eye" aria-hidden="true"></i>
                        </button>

                        <button id='edit' className='btn_todo' onClick={() => {
                            setTodoId(el.id)
                            setEdit(!edit)
                        }}><i className="fa fa-pencil" aria-hidden="true"></i>
                        </button>

                        <button id='delete' className='btn_todo btn_todo_delete' onClick={
                            () => {
                                deleteTodo(el)
                            }}><i className="fa fa-times" aria-hidden="true"></i>
                        </button>

                    </div>
                </div>

                {todoId === el.id && seeTodo && !edit ? (

                    <div className='todoItem_description'>
                        {el.description ? (<div><span className='todoItem_description_text'>Описание: </span> {el.description}</div>) : (<p></p>)}

                        {el.file ? (<div><span className='todoItem_description_text'>Прикрепленные файлы: </span>{el.file}</div>) : (<p></p>)}

                        {el.date ? (!valid && !el.status ?
                            (<div> <span className='todoItem_description_text unvalid_data'>Дата завершения: </span>{el.date}</div>)
                            : (<div><span className='todoItem_description_text'>Дата завершения: </span>{el.date}</div>))
                            : (<p></p>)}
                    </div>
                )
                    : (<p></p>)}

                {todoId === el.id && edit ?
                    (<div className='updateTodoFlex'>
                        <CreateTodo title={el.title} descr={el.description} file={el.file} status={el.status} id={el.id} date={el.date}></CreateTodo>
                    </div>
                    ) :
                    (<p></p>)}
            </div>

        ))}</div>

    </>)

}