import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import CONSTANTS from '../gql/constants';
import graphqlMutations from '../gql/mutations';
import { useForm } from '../hooks/customHooks';


const Register = (props) => {
    const { login } = useContext(AuthContext);
    const [errors, setErrors ] = useState({});

    let { onChange, onSubmit, values } = useForm(registerUser,{
        username:'',
        password:'',
        email:'',
        confirmPassword:''
    })

    const [addUser,{ loading }] = useMutation(graphqlMutations(CONSTANTS.REGISTER_USER),{
        update(_,result){
            login(result.data.register);
            props.history.push('/')
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })

    function registerUser(){
        addUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1>Register</h1>
                <Form.Input 
                    label="Username"
                    placeholder="Username"
                    name='username'
                    type='text'
                    required
                    error={errors.username ? true : false}
                    value={values.username}
                    onChange={onChange}
                />
                <Form.Input 
                    label="Email"
                    placeholder="Email"
                    name='email'
                    type='email'
                    required
                    error={errors.email ? true : false}
                    value={values.email}
                    onChange={onChange}
                />
                <Form.Input 
                    label="Password"
                    placeholder="Password"
                    name='password'
                    type='password'
                    required
                    error={errors.password ? true : false}
                    value={values.password}
                    onChange={onChange}
                />
                <Form.Input 
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    name='confirmPassword'
                    type='password'
                    required
                    error={errors.confirmPassword ? true : false}
                    value={values.confirmPassword}
                    onChange={onChange}
                />
                <Button type='submit' primary>
                    Register
                </Button>
            </Form>
            {
                Object.keys(errors).length > 0 && (
                    <div className="ui error message">
                        <ul className="list">
                            {
                                Object.values(errors).map(value=>(
                                    <li key={value}>{value}</li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    )
}

export default Register
