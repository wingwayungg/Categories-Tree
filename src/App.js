import logo from './logo.svg';
import './App.css';
import Items from './pages/itemList'
import './pages/itemList.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit  and save to reload.
        </p>
        <Items></Items>
      </header>
    </div>
  );
}

export default App;
