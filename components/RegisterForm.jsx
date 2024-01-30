import React, {useState} from 'react';
import { diasCollection } from '/imports/api/dias';
import { useNavigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import LoginButton from './LoginButton';
import { useFormik } from 'formik';

export const RegisterForm = () => {
    const navigate = useNavigate();

    const register = (openModal) => {
      formik.handleSubmit()
      if (formik.errors) {
        openModal()
      }
    }

    const validate = values => {
      const errors = {};

      if (!values.username) {

        errors.username = 'Username required';
   
      }
   
      if (!values.password1 || !values.password2) {
   
        errors.password = 'Password required';
   
      } else if (password1 !== password2) {
   
        errors.password = 'Passwords must match';
   
      }

      return errors;
    }

    const formik = useFormik({

      initialValues: {
 
        username: '',
        password1: '',
        password2: '',
      },

      validate,
 
      onSubmit: ({values, openModal}) => {
 
        var info = {
          username: values.username,
          password: values.password1
        };

        Accounts.createUser(info, function(error) {
         
            if (Meteor.user()) {
              navigate('/dias-home-page');
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
              value = {formik.values.email}
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
            <LoginButton id='buttonRegister' loginFunc={register} buttonText={'Create Account'} buttonColor={'#00DB89'} textColor={'#FFFFFF'} error={formik.errors} />
          </div>
        </form>
    );
};