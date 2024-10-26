import { MDBContainer } from 'mdb-react-ui-kit'
import './App.css'
import Header from './components/Header'
import Routing from './routes/Routing'
import { useLocation } from 'react-router-dom';
import MessageTemplate from './components/Messages';
import CreateMessageTemplate from './components/CreateMessageTemplate';

function App() {
  const {pathname} = useLocation();
  let showHeader = !pathname.includes('A1');
  return (
   <div >
    <MDBContainer style={{width: "100%"}}>
      {showHeader && <Header/>}
       <Routing/>
    </MDBContainer>
   </div>
  )
}

export default App
