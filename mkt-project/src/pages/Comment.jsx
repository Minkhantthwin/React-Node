import { Box, TextField, Button, Alert } from "@mui/material";
import Item from "../components/Item";

import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, useApp } from "../ThemedApp";
import { use } from "react";

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
    const removePost = useMutation({
        mutationFn: async (id) => {
            const res = await fetch(`${api}/content/posts/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete post');
            return res.json();
        },
        onMutate: (id) => {
            queryClient.cancelQueries({ queryKey: ["posts", id] });
            queryClient.setQueryData(['posts', id], old => old.filter(item => item.id !== id));
            setGlobalMsg('Deleting post...');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts", id] });
            setGlobalMsg('Post deleted');
            navigate('/');
        },
        onError: (error) => {
            setGlobalMsg(error.message);
        },
    });

    const removeComment = useMutation({
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

    if (isError){
        return <Box><Alert severity="warning">{error.message}</Alert></Box>;
    }
    if (isLoading){
        return <Box sx={{textAlign: "center"}}>Loading...</Box>;
    }

    return (
        <Box>
            <Item
               primary
               item = {data}
               remove={removePost.mutate}
            />
            {data.comments.map(comment => (
                <Item
                   key={comment.id}
                   item = {{...comment, post: data.id}}
                   remove={removeComment.mutate}
                />
            ))}
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