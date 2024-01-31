import React, {useState} from 'react';
import { diasCollection } from '/imports/api/dias';
import { useNavigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import LoginButton from './LoginButton';
import { useFormik } from 'formik';

export const RegisterForm = () => {
    const navigate = useNavigate();
    const [loginErrors, updateError] = useState({});

    const register = (openModal) => {
      formik.handleSubmit()
      if (Object.keys(loginErrors).length > 0) {
        openModal();
      }
    }

    const onModalExit = (closeModal) => {
      updateError({});
      closeModal();
    }

    const validate = values => {
      const errors = {};

      if (!values.username) {

        errors.username = 'Username required';
   
      }
   
      if (!values.password1 || !values.password2) {
   
        errors.password = 'Password required';
   
      } else if (values.password1 !== values.password2) {
        errors.password = 'Passwords must match';
   
      }

      updateError(errors);
      return errors;
    }

    const formik = useFormik({

      initialValues: {
        username: '',
        password1: '',
        password2: ''
      },

      validate,
 
      onSubmit: values => {
 
        var info = {
          username: values.username,
          password: values.password1
        };

        Accounts.createUser(info, function(error) {
         
            if (Meteor.user()) {
              navigate('/dias');
            } else {
              updateError({'error': error.reason})
            }
         });
 
      },
 
    });

    return (
        <form className="regContainer">
          <h1 className="regHeader1">Register</h1>
          <div className="inputRegister">
              <h6 className="regHeader6">Username</h6> 
              <input className="inputBoxRegister"
              id = "username"
              name = "username"
              type="text" 
              required
              value = {formik.values.username}
              onChange={formik.handleChange}
                />
          </div>
          <div className="inputRegister">
              <h6 className="regHeader6">Password</h6>
              <input className="inputBoxRegister"
              id = "password1"
              name = "password1" 
              type="password" 
              required 
              value = {formik.values.password1}
              onChange={formik.handleChange}
              />
          </div>
          <div className="inputRegister">
              <h6 className="regHeader6">Re-Enter Password</h6>
              <input className="inputBoxRegister" 
              id = "password2"
              name = "password2" 
              type="password" 
              required 
              value = {formik.values.password2}
              onChange={formik.handleChange}
              />
          </div>
          <div id='buttonRegister'>
            <LoginButton id='buttonRegister' loginFunc={register} closeFunc={onModalExit} buttonText={'Create Account'} buttonColor={'#00DB89'} textColor={'#FFFFFF'} errors={loginErrors} />
          </div>
        </form>
    );
};