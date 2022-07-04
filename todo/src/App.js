import React, { useState } from 'react'
import './App.css';
import TodoForm from '../src/components/TodoForm'
import Todos from './components/Todos';
import Select from './components/Select';
import { Modal } from './components/Modal'
import PaginationButtons from './components/PaginationButtons';

function App() {

  const [dummyData, setDummyData] = useState([])
  const [completedData, setCompletedData] = useState([])
  const [editObject, setEditObject] = useState({})
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [notes, setNotes] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [id, setId] = useState()
  const [completeDate, setCompleteDate] = useState()
  const [toggle, setToggle] = useState(true)
  const [sortValue, setSortValue] = useState('aToz')
  const [message, setMessage] = useState('')
  const [editOpen, setOpenEdit] = useState(true)
  const [currentNum, setCurrentNum] = useState(0)
  const [limit, setLimit] = useState(5)

  const handleDelete = (id) => {
    setMessage("Are you sure you want to delete?")
    setConfirmDelete(true)
    setShowModal(true)
    setId(id)
  }

  const showModalMessage = (message) => {
    setMessage(message)
    setShowModal(true)
  }

  const toggleList = () => {
    setToggle(!toggle)
  }

  const yesDelete = (id) => {
    if (toggle) {
      const updatedData = dummyData.filter(todos => {
        return todos.id !== id
      })
      setDummyData(updatedData)
    } else {
      const updatedData = completedData.filter(todos => {
        return todos.id !== id
      })
      setCompletedData(updatedData)
    }
    setConfirmDelete(false)
    setShowModal(false)
  }

  const noDelete = () => {
    setConfirmDelete(false)
    setShowModal(false)
  }

  const onSubmit = (e, title, dueDate, notes) => {
    e.preventDefault()
    if (title === '' || dueDate === '' || notes === '') {
      setMessage("All fields must have values.")
      setShowModal(true)
    } else {
      setDummyData([...dummyData, {
        id: Math.random(),
        title: title,
        dueDate: dueDate,
        notes: notes
      }])
      setTitle('')
      setDueDate('')
      setNotes('')
    }
  }

  const onSubmitEdit = (e, id, title, dueDate, notes) => {
    e.preventDefault()
    if (title === '' || dueDate === '' || notes === '') {
      setMessage("All fields must have values.")
      setShowModal(true)
    } else {
      const editedData = {
        id: id,
        title: title,
        dueDate: dueDate,
        notes: notes
      }
      var foundIndex = dummyData.findIndex(x => x.id == editedData.id);
      dummyData[foundIndex] = editedData;
      setTitle('')
      setDueDate('')
      setNotes('')
      setOpenEdit(true)
    }
  }

  const markComplete = (e, id) => {
    e.preventDefault()
    dummyData.map(todo => {
      if (todo.id === id) {
        setCompletedData([...completedData, todo])
      }
    })
    let date = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    setCompleteDate(date)
    yesDelete(id)
    setTitle('')
    setDueDate('')
    setNotes('')
    setOpenEdit(true)
  }

  const handleEdit = (id, title, dueDate, notes) => {
    setOpenEdit(false)
    setEditObject({
      id: id,
      title: title,
      dueDate: dueDate,
      notes: notes
    })
  }

  const handleSort = (e) => {
    setSortValue(e.target.value)
    if (toggle) {
      let newData = dummyData.sort((a, b) => {
        let fa = a.title.toLowerCase();
        let fb = b.title.toLowerCase();
        if (e.target.value === 'zToa') {
          if (fb < fa) { return -1; }
          if (fb > fa) { return 1; }
          return 0;
        } else if (e.target.value === "aToz") {
          if (fa < fb) { return -1; }
          if (fa > fb) { return 1; }
          return 0;
        } else if (e.target.value === 'dateAsc') {
          if (a.dueDate < b.dueDate) { return -1; }
          if (a.dueDate > b.dueDate) { return 1; }
          return 0;
        } else if (e.target.value === "dateDes") {
          if (b.dueDate < a.dueDate) { return -1; }
          if (b.dueDate > a.dueDate) { return 1; }
          return 0;
        }
      })
      setDummyData(newData)
    } else {
      let newData = completedData.sort((a, b) => {
        let fa = a.title.toLowerCase();
        let fb = b.title.toLowerCase();
        if (e.target.value === 'zToa') {
          if (fb < fa) { return -1; }
          if (fb > fa) { return 1; }
          return 0;
        } else if (e.target.value === "aToz") {
          if (fa < fb) { return -1; }
          if (fa > fb) { return 1; }
          return 0;
        } else if (e.target.value === 'dateAsc') {
          if (a.dueDate < b.dueDate) { return -1; }
          if (a.dueDate > b.dueDate) { return 1; }
          return 0;
        } else if (e.target.value === "dateDes") {
          if (b.dueDate < a.dueDate) { return -1; }
          if (b.dueDate > a.dueDate) { return 1; }
          return 0;
        }
      })
      setCompletedData(newData)
    }
  }

  const onNextClick = () => {
    if (dummyData.length > limit) {
      setCurrentNum(currentNum + 5)
      setLimit(limit + 5)
    }
  }

  const onPreviousClick = () => {
    if (currentNum >= 5) {
      setCurrentNum(currentNum - 5)
      setLimit(limit - 5)
    }
  }

  return (
    <div className="App">
      <div>
        <TodoForm
          editOpen={editOpen}
          handleDelete={handleDelete}
          onSubmit={onSubmit}
          dummyData={dummyData}
          onSubmitEdit={onSubmitEdit}
          editObject={editObject}
          title={title}
          notes={notes}
          dueDate={dueDate}
          setTitle={setTitle}
          setDueDate={setDueDate}
          setNotes={setNotes}
          markComplete={markComplete}
          yesDelete={yesDelete}
          noDelete={noDelete}
          showModalMessage={showModalMessage} />
        {editOpen ?
          <div>
            <Select toggle={toggle} toggleList={toggleList} sortValue={sortValue} handleSort={handleSort} />
            <Todos currentNum={currentNum} limit={limit} toggle={toggle} completeDate={completeDate} completedData={completedData} handleEdit={handleEdit} handleDelete={handleDelete} dummyData={dummyData} />
            <PaginationButtons dummyData={dummyData} onNextClick={onNextClick} onPreviousClick={onPreviousClick} />
          </div>
          : <></>}
      </div>
      <div>
        {showModal ? <Modal message={message} id={id} yesDelete={yesDelete} noDelete={noDelete} confirmDelete={confirmDelete} setShowModal={setShowModal} /> : null}
      </div>
    </div>
  );
}

export default App;
