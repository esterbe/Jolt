import {Component} from "react";


export class Login extends Component {

   componentDidMount() {
       _init();
   }

   _init() {
       // fetching the user to check if he is logged in
       axios.get("http://localhost:3000/user/current")
           .then(function (res) {
            this.setState({user: res.data.user})
       });
   }

    _onSubmit() {
        // creating a post request to log the user in
        //ETY; pass parameters in post data at request body and not in URL for security matter
        //consider using encryption as well
        axios.post("http://localhost:3000/user/login", {
            pass: this.refs.pass.value,
            user: this.refs.user.value,
        }).then(function (res) {
            // if got a user in return, set the state
            if (res.data.user) {this.setState({user: res.data.user})}
        });
    }

    /**
     * Rendering the component
     * @returns {*}
     */
    render() {
        // if the user is not logged in
        if (!this.state.user) {
            return <form onSubmit={this._onSubmit}>
                        <input type="text" ref="user" name="email"/><br/>
                        <input type="text" ref="pass" name="pass"/><br/>
                        <button type="submit"/>
                    </form>
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