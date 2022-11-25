import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTodoRefById } from '../../services/firebase'
import { onValue, update, remove } from "firebase/database"
import { getTodoList } from "../../store/todo/selector"
import { setTodos } from "../../store/todo/actions"
import { todosRef } from '../../services/firebase'
import '../../App.less'

export function Todo() {

    const [watch, setWatch] = useState(null)
    const [todoId, setTodoId] = useState('')
    const [edit, setEdit] = useState(null)

    const dispatch = useDispatch()
    const todos = useSelector(getTodoList)
    console.log('todos: ', todos);


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

    function deleteTodo(el) {

        remove(getTodoRefById(el.id))
    }

    return (<>
        <h1>список</h1>
        <div>{todos?.map((el) => (
            <div id={el.id} className='todoItem' key={el.id}>
                <div className='todoItem_flex'>
                    <button className='btn_todo' onClick={() => {
                        handleChangeStatus(el)
                    }}>
                        {
                            el.status ? (
                                <i class="fa fa-check-circle" aria-hidden="true"></i>
                            ) : <i class="fa fa-circle-o" aria-hidden="true"></i>
                        }
                    </button>
                    <h4 className='todoItem_title'>{el.title}</h4>
                    <div>
                        <button className='btn_todo' onClick={() => {
                            setTodoId(el.id)
                            setWatch(watch ? false : true)
                        }}><i className="fa fa-eye" aria-hidden="true"></i></button>

                        <button className='btn_todo'><i className="fa fa-pencil" aria-hidden="true"></i></button>
                        <button className='btn_todo btn_todo_delete' onClick={() => { deleteTodo(el) }}><i className="fa fa-times" aria-hidden="true"></i></button>

                    </div>
                </div>
                {todoId == el.id && watch ?
                    (<div className='todoItem_description'>
                        <div><span className='todoItem_description_text'>Описание: </span> {el.description}</div>
                        {/* <div>{el.data}</div> */}
                        <div><span className='todoItem_description_text'>Прикрепленные файлы: </span>{el.file}</div>
                    </div>
                    )
                    : (<p></p>)}
            </div>

        ))}</div>

    </>)

}


 // function toggleCheck(el) {
    //     const current = e.target.value
    //     if (current.checked === true) {
    //         current.checked = false
    //     } else {
    //         current.checked = true
    //     }
    //     handleUpdateTodo(el, current.checked)
    // }

    // function handleUpdateTodo(e) {

    //     const checkbox = e.target == 'on' ? true : false
    //     console.log('checkbox: ', checkbox);
    //     const parentNode = e.target.parentNode
    //     console.log('parentNode: ', parentNode);

    //     const updateTodo = {

    //         checked: checkbox
    //     }
    //     // console.log(updateTodo);
    //     update(getTodoRefById(parentNode.id), updateTodo)
    // }