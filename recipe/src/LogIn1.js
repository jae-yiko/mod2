import { useState } from 'react'
// import Success1 from './Success1'
import Fail1 from './Fail1'
import Nav from './Nav'
import Contact from './Contact'
import NutFacts from './NutFacts'
import Home from './Home'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


const LogIn1 = (props) => {
    //line 10 and 11 is what will be used to check to see if the username and password is correct
    const userCheck = 'jae';
    const passCheck = '123';

    //line 14 and 15 is used to take users input for username and password
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    //showLogin used in handleLogin to set the result for the if statements
    const [showLogin, setShowLogin] = useState("")


    const handleLogin = (event) => 
    {

        //event.preventDefault is added to cancel any default action that belongs to an event
        event.preventDefault()

        //checking to see if username(user input) = userCheck(hard coded) and the same goes for password
        if (username === userCheck && password === passCheck)
        {
            setShowLogin(
                <Router>
                    <Nav/>
                    <Switch>
                        <Route path = "/" exact component = {Home}></Route>
                        <Route path = "/Home" exact component = {Home}></Route>
                        <Route path = "/Contact" component = {Contact}></Route>
                        <Route path = "/NutFacts" component = {NutFacts}></Route>

                    </Switch>
              </Router>
            )
        }
        else 
        {
            setShowLogin(<Fail1 />)
        }
    }
    
    const handleChange1 = (event) => setUsername(event.target.value)
    const handleChange2 = (event) => setPassword(event.target.value)
    
    return(
        <div>
            <form onSubmit = {handleLogin}>
                <label> <input id="username" type="text" placeholder="Username" onChange={handleChange1}/></label>
                <label><input id="password" type="text" placeholder="Password" onChange={handleChange2}/></label>
                <button>Login</button>
            </form>
           <div> {showLogin} </div>
        </div>
    )
}


export default LogIn1