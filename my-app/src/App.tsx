import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import 'bootstrap/dist/css/bootstrap.css';


//Declarer les données api on choisit title et body
type TodoType = {
  title: string;
  body: string;
};

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]); 
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data)) {
        setTodos(data);
      } else {
        console.log('Data fetched is not an array', data);
      }
    })
    .catch(error => console.error(error));
  }, []);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    
    <div className="App">
      <Navbar />
      <div className="container text-center">
      <h2 style={{ marginTop: '20px' }}>Data of API</h2>
      </div>
       
      <div className="container text-center">
      <form className="text-center">
      <div className="input-group mb-3">
          <input style={{ marginTop: '20px' }}
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            aria-label="Search"
            aria-describedby="search-button"
          />
          <button style={{ marginTop: '20px' }} className="btn btn-primary" id="search-button" type="button">
            Search
          </button>
          </div>
         </form>
        </div>



      <table  style={{ marginTop: '20px' }} className="table table-bordered table-striped">
      <thead>
        <tr>
          <th>Title</th>
          <th>Body</th>
          
        </tr>
      </thead>
      <tbody>
      {filteredTodos.map((todo, index) => (
          
        <tr key={index}>
          <td>{todo.title}</td>
          <td>{todo.body}</td>
        </tr>
      ))}
        </tbody>
        </table>
    </div>
  );
}

export default App;
