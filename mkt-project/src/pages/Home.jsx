import { Box, Alert } from "@mui/material";

import Form from "../components/Form";
import Item from "../components/Item";

import { useApp } from "../ThemedApp";
import { useQuery } from "@tanstack/react-query";

const api = import.meta.env.VITE_API;

export default function Home() {

  const { showForm, setGlobalMsg } = useApp();
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetch(`${api}/content/posts`);
      if (!res.ok) throw new Error('Failed to fetch posts');
      return res.json();
    },
  });

  const remove = (id) => {
    setData(data.filter(item => item.id !== id));
    setGlobalMsg('Item removed');
  };

  const add = (content, name) => {
    const id = data[data.length - 1]?.id + 1;
    setData([...data, {id, content, name}]);
    setGlobalMsg('Item added');
  };

  if (isError) {
    return (
     <Box>
      <Alert severity="warning">{error.message}</Alert>
      </Box>
     );
    }
  
  if (isLoading) {
    return (
     <Box>
      <Alert severity="info">Loading....</Alert>
      </Box>
     );
    }
    
    return (
        <Box>
            {showForm && <Form add={add} />}
            {data.map(item => (
                <Item key={item.id} item={item} remove={remove} />
            ))}
        </Box>
    );
}