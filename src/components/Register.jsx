import { useRef } from 'react';

import { useMutation, gql } from '@apollo/client';

import { useNavigate } from 'react-router-dom';

const REGISTER_MUTATION = gql`
    mutation($input: registerUserInput!) {
        register(input: $input) {
            id
            username
            token
            createdAt
            email
        }
    }
`

function Register({ className: classes }) {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const navigate = useNavigate();

    const [registerMutation, { data, loading, error }] = useMutation(REGISTER_MUTATION);

    const handleSubmit = (e) => {
        e.preventDefault();
        registerMutation({ variables: {
            input: { 
                username: usernameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                confirmPassword: confirmPasswordRef.current.value,
            } 
        } })
        .then((res) => {
            const { login: { token, username } } = res.data;
            dispatch(login())
            dispatch(setUser({ username, token }))
            navigate('/feeds')
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/login');
    }

    return (
        <div className={`${classes} flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0`}>
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Sign up
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                            <input type="text" ref={usernameRef}  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-aggreen" placeholder="username" required="" />
                        </div>
                        <div>
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <input type="text" ref={emailRef}  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-aggreen" placeholder="username" required="" />
                        </div>
                        <div>
                            <label for="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" ref={passwordRef} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-aggreen" required="" />
                        </div>
                        <div>
                            <label for="password" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                            <input type="password" ref={confirmPasswordRef} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-aggreen" required="" />
                        </div>
                        <button type="submit" className="w-full text-white bg-aggreen hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={handleSubmit}>Sign in</button>
                        <p className="text-sm font-light text-gray-500">
                            Already have an account? <button href="#" className="font-medium text-primary-600 hover:underline" onClick={handleLogin}>login</button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;