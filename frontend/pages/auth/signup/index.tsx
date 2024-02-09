import { useState } from 'react';
import { APIURL } from '../../../utils/api';
import { postData } from '../../../services/apiService';
import Link from 'next/link';
import { setUserSession } from '../../../services/common';

const Signup = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
  
    const handleSignup = async () => {
      try {
        const response = await postData(`${APIURL}/register`, { name, email, password });
        setUserSession(response.token, response.user);
        console.log('Signup Success:', response.data);
      } catch (error) {
        console.error('Error during signup:', error);
      }
    };
  
    return (
        <div className="max-w-md mx-auto mt-20 p-4 border rounded-md shadow-md bg-white">
        <h1 className="text-3xl font-bold mb-6">Signup</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Email"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handleSignup}
        >
          Signup
        </button>
        <p className="mt-4">
          Have an account?{' '}
          <Link href="/auth/login">
            <span className="text-blue-500 hover:underline">Login</span>
          </Link>
        </p>
      </div>
    );
  };

export default Signup;