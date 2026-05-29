import { useEffect, useState } from 'react';

function App() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const data = await window.api.getUsers();
    setUsers(data);
  };

  const addUser = async () => {
    if (!name) return;
    await window.api.addUser(name);
    setName("");
    loadUsers();
  };

  const deleteUser = async (id) => {
    await window.api.deleteUser(id);
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Electron + React + better-sqlite3</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />

      <button onClick={addUser}>Add</button>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name}
            <button onClick={() => deleteUser(u.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

