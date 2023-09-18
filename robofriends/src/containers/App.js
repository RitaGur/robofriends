import React, { useState, useEffect } from 'react';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry';

const App = () => {
  const [robots, setRobots] = useState([]);
  const [searchField, setSearchField] = useState('');

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  }

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        return response.json();
      })
      .then(users => {
        setRobots(users);
      })
  }, []);

  const filterRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  })

  if (robots.length === 0) {
    return <h1>Loading</h1>
  }
  else {
    return (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filterRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default App;