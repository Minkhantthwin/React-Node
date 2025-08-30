import { Box, TextField, Button } from "@mui/material";
import Item from "../components/Item";

export default function Comment() {
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