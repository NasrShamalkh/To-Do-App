import React from 'react';
import './style.css';
import axios from 'axios';

const App = () => {
  return <Todo_App />;
};

const Todo_App = function() {
  const [allTodos, setAllTodos] = React.useState([]);
  const [newTodo, setNewTodo] = React.useState('');
  // this provoke stete to force the app to rerender and trigger useEffect hook
  const [provoke, setProvoke] = React.useState(true);
  //the trigger that handles wheather to show finished or unfinished todos
  const [showDone, setShowDone] = React.useState(false);

  //main function to get data
  React.useEffect(() => {
    axios
      .get('/api/todos')
      .then(data => {
        if (data.data.length !== 0) {
          setAllTodos(data.data);
        } else {
          setAllTodos([]);
        }
      })
      .catch(err => {
        console.log('Error while fetching data in Use Effect', err);
      });
  }, [provoke]); // here we make the useEffect work on a state change (provoke) and we change it every time we want to rernder :)

  //function to handle pressing the save button
  const handleSave = function() {
    axios
      .post('/api/todos', { content: newTodo })
      .then(res => {
        if (res.data == 'Todo element already exist !') {
          alert('This task is already added into the list !');
        } else {
          setProvoke(!provoke);
        }
      })
      .catch(err => {
        console.log('Error in saving a new Todo', err);
      });
  };

  //function to handle deleting a todo based on id
  const handleDelete = function(e) {
    axios
      .delete(`/api/todos/${e.target.value}`)
      .then(() => {
        setProvoke(!provoke);
      })
      .catch(err => {
        console.log(err);
      });
  };

  //change the status of "done" for the todo with the targeted id
  const handleUpdate = function(e) {
    axios
      .put(`/api/todos/${e.target.value}`)
      .then(res => {
        setProvoke(!provoke);
      })
      .catch(err => console.log(err));
  };

  //Handle deleting all the todos from the database
  const deleteAll = function() {
    const del = confirm('Are you sure you want to delete all todos ?');
    if (del) {
      axios
        .delete('/api/todos')
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }
    setProvoke(!provoke);
  };

  const renderTodos = function() {
    if (allTodos.length == 0) {
      return <p>You dont have any todos, Enjoy !</p>;
    } else {
      if (showDone) {
        if (allTodos.filter(todo => todo.done).length == 0) {
          return <p>You dont have any finished todos, lets finish some !</p>;
        } else {
          return allTodos
            .filter(todo => todo.done)
            .map(todo => {
              return (
                <li key={todo._id}>
                  {todo.content}{' '}
                  <div id='restorButton'>
                    <button
                      className='iconButton'
                      value={todo._id}
                      onClick={e => {
                        handleUpdate(e);
                      }}
                    >
                      &#8634;
                    </button>
                    <button
                      className='iconButton'
                      id='deleteButton'
                      value={todo._id}
                      onClick={e => {
                        handleDelete(e);
                      }}
                    >
                      &#10060;
                    </button>
                  </div>
                </li>
              );
            });
        }
      } else {
        return allTodos
          .filter(todo => todo.done == false)
          .map(todo => {
            return (
              <li key={todo._id}>
                {todo.content}{' '}
                <div id='buttonDiv'>
                  <button
                    className='iconButton'
                    id='doneButton'
                    value={todo._id}
                    onClick={e => {
                      handleUpdate(e);
                    }}
                  >
                    &#10003;
                  </button>
                  <button
                    className='iconButton'
                    id='deleteButton'
                    value={todo._id}
                    onClick={e => {
                      handleDelete(e);
                    }}
                  >
                    &#10060;
                  </button>
                </div>
              </li>
            );
          });
      }
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div id='saveContainer'>
        <input
          type='text'
          value={newTodo}
          onChange={e => {
            setNewTodo(e.target.value);
          }}
        />
        <button type='submit' onClick={handleSave}>
          Save Todo
        </button>
      </div>
      <div id='todosContainer'>
        <ul>{renderTodos()}</ul>
      </div>
      <div id='funDiv'>
        <button className='button1' onClick={deleteAll}>
          Delete All Todos
        </button>
        <button
          className='button1'
          onClick={() => {
            setShowDone(!showDone);
          }}
        >
          {showDone ? 'show active Todos' : 'show finished Todos'}
        </button>
      </div>
    </div>
  );
};

export default App;
