import { Box, Alert } from "@mui/material";

import Form from "../components/Form";
import Item from "../components/Item";

import { queryClient, useApp } from "../ThemedApp";
import { useQuery, useMutation } from "@tanstack/react-query";

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

  const remove = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${api}/content/posts/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete post');
      return res.json();
    },
      onMutate: (id) => {
        queryClient.cancelQueries({ queryKey: ["posts"]});
        queryClient.setQueryData(['posts'], old => old.filter(item => item.id !== id));
        setGlobalMsg('Deleting item...');
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        setGlobalMsg('Item deleted');
      },
      onError: (error) => {
        setGlobalMsg(error.message);
      },
});

  const add = useMutation({
    mutationFn: async ({ content, name }) => {
      const res = await fetch(`${api}/content/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, name }),
      });
      if (!res.ok) throw new Error('Failed to add post');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setGlobalMsg('Item added');
    },
    onError: (error) => {
      setGlobalMsg(`Add failed: ${error.message}`);
    },
  });

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