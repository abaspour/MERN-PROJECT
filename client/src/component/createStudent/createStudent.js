import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function CreateStudent() {
  const [student,setStudent]  = React.useState({
    regNo:0,
    studentName:'',
    grade:'',
    section:''
  });
  const {regNo,studentName,grade,section} = student;
  const onChange1 =(e) =>{
    setStudent({...student,[e.target.name]: e.target.value});
   }
   const onChange = (name,e) => {
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: e.target.value,
    }));
    console.log(student);
  };
  const createStudent= ()=>{
    axios.post('http://localhost:5000/students',student)
    .then(()=>window.location.reload(false))

    }
    const style1={borderRadius:15,  margin:'30px 0', display:'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center'}
  return (<>
    <h2>Create Student</h2>
    <form style={style1}>
    <TextField label="Registration No." variant="outlined"  onChange={e=>onChange('regNo',e)} />
    <TextField label="Name"    variant="outlined"   onChange={e=>onChange('studentName',e)} />
    <TextField label="Grade"   variant="outlined"  onChange={e=>onChange('grade',e)} />
    <TextField label="Section" variant="outlined"   onChange={e=>onChange('section',e)} />
      <Button variant="contained" color="primary"   onClick={createStudent}>Create</Button>
    </form></>
  );
}
