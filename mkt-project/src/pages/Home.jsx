import { useState } from "react";

import { Box } from "@mui/material";

import Form from "../components/Form";
import Item from "../components/Item";

import { useApp } from "../ThemedApp";

export default function Home() {

  const { showForm, setGlobalMsg } = useApp();

  const [data, setData] = useState([
    {id: 1, content: 'Item 1', name: 'Name 1'},
    {id: 2, content: 'Item 2', name: 'Name 2'},
    {id: 3, content: 'Item 3', name: 'Name 3'},
  ]);


  const remove = (id) => {
    setData(data.filter(item => item.id !== id));
    setGlobalMsg('Item removed');
  };

  const add = (content, name) => {
    const id = data[data.length - 1]?.id + 1;
    setData([...data, {id, content, name}]);
    setGlobalMsg('Item added');
  };
    return (
        <Box>
            {showForm && <Form add={add} />}
            {data.map(item => (
                <Item key={item.id} item={item} remove={remove} />
            ))}
        </Box>
    );
}