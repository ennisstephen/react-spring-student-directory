import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';
import { Typography } from '@mui/material';

export default function Student() {
  const [studentName, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [students, setStudents] = React.useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    const student = { studentName, address };
    console.log(student);
    fetch("http://localhost:8080/student/add",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(student)
  }).then(()=>{
    console.log("New student added")
  })
};

React.useEffect(()=>{
  fetch("http://localhost:8080/student/getAll")
  .then(res=>res.json())
  .then((result)=>{
    setStudents(result);
  }
)
},[])

const theme = createTheme({
  palette: {
    primary: {
      main: '#6a1b9a',
    },
    secondary: {
      main: '#4caf50',
    },
  },
});

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > :not(style)': { m: 1, width: '80ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <Stack spacing={2}>
          <TextField
            id="outlined-basic"
            label="Student Name"
            variant="filled"
            color="primary"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Student Address"
            variant="filled"
            color="secondary"
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button variant="contained" onClick={handleClick}>
            Submit
          </Button>
        </Stack>
        <Stack>
        <Typography variant="h4" sx={{ mb: 2 }}>
    Students Table
  </Typography>
  {students.map((student) => (

    <Paper key={student.id} sx={{ p: 2 }}>
      <Typography variant="h6">Student ID: {student.id}</Typography>
      <Typography variant="body1">Name: {student.name}</Typography>
      <Typography variant="body1">Address: {student.address}</Typography>
    </Paper>
  ))}
</Stack>
      </Box>
    </ThemeProvider>
  );
}