import Nav from './components/Nav';
import './App.css';
import Row from './components/Row';
import Banner from './components/Banner'
import categories from './api';

function App() {
  return (
    <div className="App">
      <Nav/>
      {/* DESTAQUE*/}
      <Banner/>
      {/* EM ALTA */}
      {categories.map((category) => {
        return <Row key={category.name} title={category.title} path={category.path} isLarge={category.isLarge}/>
      })}

    </div>
  );
}

export default App;
