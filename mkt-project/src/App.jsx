import {useState} from 'react';

import {Box, Container} from '@mui/material';

import { useApp } from './ThemedApp';

import Header from './components/Header';
import Item from './components/Item';
import Form from './components/Form';

export default function App() { 

  const { showForm } = useApp();

  const [data, setData] = useState([
    {id: 1, content: 'Item 1', name: 'Name 1'},
    {id: 2, content: 'Item 2', name: 'Name 2'},
    {id: 3, content: 'Item 3', name: 'Name 3'},
  ]);

  const remove = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  const add = (content, name) => {
    const id = data[data.length - 1]?.id + 1;
    setData([...data, {id, content, name}]);
  }

  return (
    <Box>
      <Header/>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        {showForm && <Form add={add}/>}

        {data.map(item => { 
          return (
          <Item
            key={item.id}
            item={item}
            remove={remove}/>
        );
  })}
      </Container>
    </Box>
  );
}