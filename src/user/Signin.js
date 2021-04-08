import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../auth/helper";

const Signin = () => {

  const [values, setValues] = useState({
    email: "sharath@a.com",
    password: "12345",
    error: "",
    loading: false,
    didRedirect : false
  })

  const {email, password, error, loading, didRedirect} = values;
  const {user} = isAuthenticated() ;

  const handelChange = email => event => {
     setValues({...values, error:false, [email]: event.target.value })
  }

  const onSubmit = event => {
    event.preventDefault();
    setValues({...values, error: false, loading:true})
    signin({email,password})
    .then(data => {
      if(data.error){
        setValues({...values, error:data.error, loading:false})
      } else {
        authenticate(data, () => {
          setValues({...values, didRedirect:true })
        })
      }
    })
    .catch( err => {console.log(err)})  
  }
  
  const performRedirect = () => {
    if(didRedirect){
      if(user && user.role === 1){
        return <Redirect to="/admin/dashboard"/>;  
      } else {
        return <Redirect to="/user/dashboard"/>;
      }
    }
    if(isAuthenticated()){
      return <Redirect to="/" />;
    }
  }

  const loadingMessage = () => {
    return (
         loading && (
            <div className='alert alert-info'>
              <h1>Loading...</h1>
            </div>)
    );
  }

  const errorMessage = () => {
    return ( 
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className='alert alert-danger'
              style={{ display: error ? "" : "none" }} >
            {error} 
          </div>
        </div>
      </div>
    );
  }

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input className="form-control" onChange={handelChange("email")} value={email} type="email" />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input className="form-control" onChange={handelChange("password")} value={password} type="password" />
            </div>
            <button className="btn btn-success btn-block" onClick={onSubmit}>Submit</button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign In page" description="A page for user to sign in!">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      
    </Base>
  );
};

export default Signin;
