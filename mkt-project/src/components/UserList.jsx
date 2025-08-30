import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";

export default function UserList({ title }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="User 1"/>
          </ListItemAvatar>
          <ListItemText primary="User 1" secondary="A user description" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="User 2"/>
          </ListItemAvatar>
          <ListItemText primary="User 2" secondary="Another user description" />
        </ListItem>
      </List>
    </Box>
  );
}