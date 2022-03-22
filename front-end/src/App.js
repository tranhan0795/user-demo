
import './App.css';
import UsersList from './components/UsersList';
import NewUser from './components/NewUser';

function App() {
  return (
    <div className="App">
      <NewUser />
      <UsersList />
    </div>
  );
}

export default App;
