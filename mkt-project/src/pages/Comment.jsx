import { Box, TextField, Button } from "@mui/material";
import Item from "../components/Item";

import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, useApp } from "../ThemedApp";

const api = import.meta.env.VITE_API;

export default function Comment() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { setGlobalMsg } = useApp();

    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = await fetch(`${api}/content/posts/${id}`);
            if (!res.ok) throw new Error('Failed to fetch comments');
            return res.json();
        },
    });
    const remove = useMutation({
        mutationFn: async (id) => {
            const res = await fetch(`${api}/content/comments/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete comment');
            return res.json();
        },
        onMutate: (id) => {
            queryClient.cancelQueries({ queryKey: ["comments", id] });
            queryClient.setQueryData(['comments', id], old => old.filter(item => item.id !== id));
            setGlobalMsg('Deleting comment...');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", id] });
            setGlobalMsg('Comment deleted');
        },
        onError: (error) => {
            setGlobalMsg(error.message);
        },
    });

    return (
        <Box>
            <Item
                primary
                key={1}
                remove={() => {}}
                item={{
                    id: 1,
                    name: 'User 1',
                    content: 'This is my first comment',
                }}
            />
            <Item
                key={2}
                remove={() => {}}
                item={{
                    id: 2,
                    name: 'User 2',
                    content: 'This is my second comment',
                }}
            />
            <form>
                <Box sx={{ display:'flex', gap: 1, mt: 2, flexDirection: 'column' }}>
                    <TextField
                        placeholder="Write a comment..."
                        multiline
                        rows={4}
                        fullWidth
                    />
                    <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-end' }}>
                        Reply
                    </Button>
                </Box>
            </form>            

        </Box>
    );
}