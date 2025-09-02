import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from '@mui/material';

import {
  Alarm as TimeIcon,
  AccountCircle as UserIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

import { green } from '@mui/material/colors';

import { formatRelative } from 'date-fns';

import { useNavigate } from 'react-router-dom';

export default function Item({item, remove, primary}) {
  const navigate = useNavigate();

  const formattedTime = item.createdAt
    ? (() => {
        try {
          return formatRelative(new Date(item.createdAt), new Date());
        } catch {
          return 'Invalid date';
        }
      })()
    : 'Unknown time';

    return (
        <Card sx={{ mb: 2 }}>
            {primary && <Box sx={{ height: 50, bgcolor: green[500] }} />}
            <CardContent onClick={() => navigate(`/profile/${item.id}`)} sx={{ cursor: 'pointer' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> 
                <Box>
                  <TimeIcon/>
                  <Typography variant='caption' sx={{ color: green[500]}}>
                   {formattedTime}
                  </Typography>
                </Box>
                <IconButton
                sx={{ color: 'text.fade' }}
                size='small'
                onClick={e => {
                  e.stopPropagation(); 
                  remove.mutate(item.id);       
                }}
                >
                  <DeleteIcon fontSize='inherit'/>
                </IconButton>
              </Box>
                <Typography sx={{ my: 3 }}>{item.content}</Typography>

                <Box 
                sx={{ display: 'flex',flexDirection: "row", alignItems: 'center', gap: 1 }}>
                  <UserIcon fontSize='12' color='info'/>
                  <Typography variant='caption'>{item.author?.name || 'Unknown Author'}</Typography>
                </Box>
            </CardContent>
        </Card>
  );
}