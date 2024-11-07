import React, { useState } from 'react';
import './App.css';

function App() {
  // Стан для зберігання тексту нового завдання та його опису
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  // Стан для зберігання списку завдань
  const [tasks, setTasks] = useState([]);

  // Функція для додавання завдання до списку
  const addTask = () => {
    if (taskTitle.trim()) { // Перевірка на непорожнє значення заголовка
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        description: taskDescription,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setTaskTitle(''); // Очистити поле заголовка
      setTaskDescription(''); // Очистити поле опису
    }
  };

  // Функція для видалення завдання
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Функція для позначення завдання як виконаного
  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="App">
      <h1>Список Завдань</h1>
      <div>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Введіть заголовок завдання"
        />
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Введіть опис завдання"
        />
        <button onClick={addTask}>Додати</button>
      </div>
      <TaskList tasks={tasks} deleteTask={deleteTask} toggleCompletion={toggleCompletion} />
    </div>
  );
}

// Компонент для відображення списку завдань
function TaskList({ tasks, deleteTask, toggleCompletion }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <div>
            <span
              onClick={() => toggleCompletion(task.id)}
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            >
              <strong>{task.title}</strong>
            </span>
            <p>{task.description}</p>
          </div>
          <button onClick={() => deleteTask(task.id)}>Видалити</button>
        </li>
      ))}
    </ul>
  );
}

export default App;
