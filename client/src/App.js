import logo from './logo.svg';
import './App.css';
import { Container,AppBar, Typography, Grow, Grid} from '@mui/material';
import Student from './component/showStudent/showStudent.js'
import create from './component/createStudent/createStudent.js'
import { Color } from '@mui/material';
import ShowStudent from './component/showStudent/showStudent.js';
import CreateStudent from './component/createStudent/createStudent';
//import useStyles from './style'
const style1={borderRadius:15,  margin:'3px 0px 0', display:'flex',
flexDirection: 'column',
justifyContent:'center',
alignItems: 'center'}
function App() {
 // const classes=useStyles();
  return (<>
    <div className="App">
      <Container maxWidth="lg">
        <AppBar  position="static" color='inherit'style={style1}>
          <Typography  variant="h2" align='center'>Student Create & Show</Typography>
        </AppBar>
        <Grow in>
          <Container>
            <Grid container  justify='space-between' alignItems='strect'>
              <Grid item xs={12} sm={7}>
                <AppBar style={style1} position='static' color='inherit'>
                  <ShowStudent/>
                </AppBar>
              </Grid>

              <Grid item xs={12} sm={4}>
                <AppBar  style={{'borderRadius':15,'margin' : '3px 10px '}} position='static' color='inherit'>
                  <CreateStudent/>

                </AppBar>
              </Grid>

            </Grid>
          </Container>
        </Grow>
        </Container>
     </div></>
  );
}

export default App;
