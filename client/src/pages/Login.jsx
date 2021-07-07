import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react'
import { Button, Form } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import CONSTANTS from '../gql/constants';
import graphqlMutations from '../gql/mutations';
import { useForm } from '../hooks/customHooks';


const Login = (props) => {
    const [errors, setErrors] = useState({});
    const { login } = useContext(AuthContext);

    let { onChange, onSubmit, values } = useForm(loginUser,{
        username:'',
        password:'',
    });

    const [logUser,{loading}] = useMutation(graphqlMutations(CONSTANTS.LOGIN_USER),{
        update(_,result){
            login(result.data.login);
            props.history.push('/');
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function loginUser(){
        logUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
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
                    label="Password"
                    placeholder="Password"
                    name='password'
                    type='password'
                    required
                    error={errors.password ? true : false}
                    value={values.password}
                    onChange={onChange}
                />
                <Button type='submit' primary>
                    Login
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

export default Login
