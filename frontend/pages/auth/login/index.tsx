import { useState } from 'react';
import { useRouter } from 'next/router';
import { APIURL } from '../../../utils/api';
import { postData } from '../../../services/apiService';
import Link from 'next/link';
import { setUserSession } from '../../../services/common';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      const response = await postData(`${APIURL}/login`, { email, password });

      setUserSession(response.token, response.user);

      router.push(`/dashboard`);

    } catch (error) {
        console.log('Invalid Credentials, Try Again!')
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 border rounded-md shadow-md bg-white">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
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
        onClick={handleLogin}
      >
        Login
      </button>
      <p className="mt-4">
        Don't have an account?{' '}
        <Link href="/auth/signup">
          <span className="text-blue-500 hover:underline">Signup</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
