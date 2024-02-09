import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to My WebApp</h1>
      <Link href="/auth/login">
        Login
      </Link>
    </div>
  );
};

export default Home;
