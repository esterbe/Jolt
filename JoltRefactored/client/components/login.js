import {Component} from "react";


export class Login extends Component {
    constructor() {
        super();

        this.state = {
            user: null,
            status: ''
        }
    }

   componentDidMount() {
       _init();
   }

   _init() {
       // fetching the user to check if he is logged in
       //ETY: do this in mount and not for each render
       axios.get("http://localhost:3000/user/current")
           .then((res) => {
            this.setState({user: res.data.user})
       });
   }

    _onSubmit() {
        // creating a post request to log the user in
        //ETY: pass parameters in post data at request body and not in URL for security matter
        //consider using encryption as well
        axios.post("http://localhost:3000/user/login", {
            pass: this.refs.pass.value,
            user: this.refs.user.value,
        }).then((res) => {
            // if got a user in return, set the state
            if (res.data.user) {
                this.setState({user: res.data.user})
            }
            else {
                //ETY: handle login error
                //consider disaplying a more specific error - what exactly went wrong
                this.setState({status: "there was an error in login"})
            }
        }).catch(error => {
            this.setState({status: error})
        });
    }

    /**
     * Rendering the component
     * @returns {*}
     */
    render() {
        // if the user is not logged in
        if (!this.state.user) {
            return <div><form onSubmit={this._onSubmit}>
                        <input type="text" ref="user" name="email"/><br/>
                        <input type="text" ref="pass" name="pass"/><br/>
                        <button type="submit"/>
                    </form>
                <div>{this.state.status}</>
            </div>
        }
        else {
            // printing the user name Capitalized
            var userName = this.state.user.name.toUpperCase();
            //Ety: the following line is not necessary if we wan the name Capitalized...
            //userName = userName[0].toLowerCase() + userName.substr(1);
            return (<h1>Welcome {userName}. Your role is {this.state.user.role}</h1>)
        }
    }
}