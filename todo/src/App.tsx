import React, { useEffect, useState } from 'react'
import './App.css';
import TodoForm from './components/TodoForm'
import Todos from './components/Todos';
import Select from './components/Select';
import { Modal } from './components/Modal'
import Pagination from './components/Pagination';


function App() {

  const [dummyData, setDummyData] = useState<{ id: number, title: string, dueDate: string, notes: string }[]>([])
  const [completedData, setCompletedData] = useState<{ id: number, title: string, dueDate: string, notes: string }[]>([])
  const [editObject, setEditObject] = useState<{ id: number, title: string, dueDate: string, notes: string }>({ id: 0, title: '', dueDate: '', notes: '' })
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [notes, setNotes] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [id, setId] = useState<number>()
  const [completeDate, setCompleteDate] = useState<string>("")
  const [toggle, setToggle] = useState(true)
  const [sortValue, setSortValue] = useState('aToz')
  const [message, setMessage] = useState('')
  const [editOpen, setOpenEdit] = useState<boolean>(true)
  const [currentNum, setCurrentNum] = useState(0)
  const [limit, setLimit] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [newNum, setNewNum] = useState(1)
  const [lastToggle, setLastToggle] = useState(false)

  const handleDelete = (id: number) => {
    setMessage("Are you sure you want to delete?")
    setConfirmDelete(true)
    setShowModal(true)
    setId(id)
  }

  const showModalMessage = (message: string) => {
    setMessage(message)
    setShowModal(true)
  }

  const toggleList = () => {
    setToggle(!toggle)
  }

  const yesDelete = (id: number) => {
    if (toggle) {
      const updatedData = dummyData.filter((todos: { id: number, title: string, dueDate: string, notes: string }) => {
        return todos.id !== id
      })
      setDummyData(updatedData)
    } else {
      const updatedData = completedData.filter((todos: { id: number, title: string, dueDate: string, notes: string }) => {
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

  const onSubmit = (e: React.SyntheticEvent, title: string, dueDate: string, notes: string) => {
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

  const onSubmitEdit = (e: React.SyntheticEvent, id: number, title: string, dueDate: string, notes: string) => {
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
      var foundIndex = dummyData.findIndex((x: { id: number }) => x.id == editedData.id);
      dummyData[foundIndex] = editedData;
      setTitle('')
      setDueDate('')
      setNotes('')
      setOpenEdit(true)
    }
  }

  const markComplete = (e: React.SyntheticEvent, id: number) => {
    e.preventDefault()
    dummyData.map((todo: { id: number, title: string, dueDate: string, notes: string }) => {
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

  const handleEdit = (id: number, title: string, dueDate: string, notes: string) => {
    setOpenEdit(false)
    setEditObject({
      id: id,
      title: title,
      dueDate: dueDate,
      notes: notes
    })
  }

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortValue(e.target.value)
    if (toggle) {
      let newData: { id: number, title: string, dueDate: string, notes: string }[] = dummyData.sort((a: { id: number, title: string, dueDate: string, notes: string }, b: { id: number, title: string, dueDate: string, notes: string }): any => {
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
      let newData: { id: number, title: string, dueDate: string, notes: string }[] = completedData.sort((a: { id: number, title: string, dueDate: string, notes: string }, b: { id: number, title: string, dueDate: string, notes: string }): any => {
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
    setCurrentPage(currentPage + 1)
  }

  const onPreviousClick = () => {
    if (currentNum >= 5) {
      setCurrentNum(currentNum - 5)
      setLimit(limit - 5)
    }
    setCurrentPage(currentPage - 1)
  }

  const onFirstClick = () => {
    setCurrentNum(0)
    setLimit(5)
  }

  const onLastClick = () => {
    let page = dummyData.length / 5
    let pageNum = Math.ceil(page)
    setLastToggle(true)
    setLimit(pageNum * 5)
  }

  useEffect(() => {
    if (lastToggle === true) {
      setCurrentNum(limit - 5)
    }
  }, [limit])


  return (
    <div className="App">
      <div>
        <TodoForm
          editOpen={editOpen}
          onSubmit={onSubmit}
          onSubmitEdit={onSubmitEdit}
          editObject={editObject}
          title={title}
          notes={notes}
          dueDate={dueDate}
          setTitle={setTitle}
          setDueDate={setDueDate}
          setNotes={setNotes}
          markComplete={markComplete}
          showModalMessage={showModalMessage} />
        {editOpen ?
          <div>
            <Select toggle={toggle} toggleList={toggleList} sortValue={sortValue} handleSort={handleSort} />
            <Todos currentNum={currentNum} limit={limit} toggle={toggle} completeDate={completeDate} completedData={completedData} handleEdit={handleEdit} handleDelete={handleDelete} dummyData={dummyData} />
            <Pagination onFirstClick={onFirstClick} onLastClick={onLastClick} completedData={completedData} dummyData={dummyData} onNextClick={onNextClick} onPreviousClick={onPreviousClick} />
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
