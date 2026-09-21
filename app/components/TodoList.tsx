import { useState, useEffect, FormEvent, KeyboardEvent } from "react";

// 1. THE DATA SHAPE
// Every task in the list has these three properties.
type Todo = {
  id: number;    // unique identifier, used to find the task later
  text: string;  // what the task says
  done: boolean; // whether the checkbox is ticked
};

const STORAGE_KEY = "todos";

// 2. LOADING FROM LOCALSTORAGE
// localStorage only stores strings, so we saved the list as JSON text.
// Here we read that text back and turn it into an array again.
function loadTodos(): Todo[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return []; // if the saved data is broken, start with an empty list
  }
}

export default function TodoList() {
  // 3. STATE
  // React re-renders the screen whenever one of these changes.
  const [todos, setTodos] = useState<Todo[]>(loadTodos); // the whole list
  const [newText, setNewText] = useState("");            // the "add" input
  const [editingId, setEditingId] = useState<number | null>(null); // which task is being edited (null = none)
  const [editText, setEditText] = useState("");          // the "edit" input

  // 4. SAVING TO LOCALSTORAGE
  // This effect runs every time `todos` changes and saves the new list.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // 5. ACTIONS
  // Add a new task
  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // stop the page from reloading
    const text = newText.trim();
    if (!text) return; // ignore empty tasks
    setTodos([...todos, { id: Date.now(), text, done: false }]);
    setNewText(""); // clear the input
  };

  // Tick / untick a task: copy the list, flipping `done` on the matching one
  const toggleTodo = (id: number) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  // Delete a task: keep every task except the one with this id
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  // Start editing: remember which task, and put its text in the edit input
  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  // Save the edit (also runs when you press Enter)
  const saveEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = editText.trim();
    if (text) {
      setTodos(todos.map((t) => (t.id === editingId ? { ...t, text } : t)));
    }
    setEditingId(null); // leave edit mode
  };

  // Press Escape to cancel editing
  const handleEditKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") setEditingId(null);
  };

  // 6. WHAT GETS DRAWN ON SCREEN
  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>To-do list</h1>

      {/* Form for adding tasks */}
      <form onSubmit={addTodo} style={{ display: "flex", gap: 8 }}>
        <input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Add a task..."
          style={{ flex: 1 }}
        />
        <button type="submit">Add</button>
      </form>

      {todos.length === 0 && <p>No tasks yet. Add one above.</p>}

      {/* The list: one <li> per task */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0" }}
          >
            {editingId === todo.id ? (
              // EDIT MODE: a small form with an input, Save and Cancel
              <form onSubmit={saveEdit} style={{ display: "flex", gap: 8, flex: 1 }}>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={handleEditKeyDown}
                  autoFocus
                  style={{ flex: 1 }}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              // NORMAL MODE: checkbox, text, Edit and Delete
              <>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span
                  style={{
                    flex: 1,
                    textDecoration: todo.done ? "line-through" : "none",
                    opacity: todo.done ? 0.5 : 1,
                  }}
                >
                  {todo.text}
                </span>
                <button onClick={() => startEditing(todo)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
