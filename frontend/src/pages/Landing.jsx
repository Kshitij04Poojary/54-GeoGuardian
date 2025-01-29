import EarthCanvas from '../components/Earth';
import { Link, useNavigate } from 'react-router-dom';

const Landing = () => {

  const navigate = useNavigate();
  return (
    <div className="h-screen bg-black">
      <div className='flex gap-2 justify-end p-4'>
        <button className='px-4 py-2 rounded-lg bg-white cursor-pointer'
          onClick={() => navigate('/login')}>
          login
        </button>
        <button className='px-4 py-2 rounded-lg bg-white'
          onClick={() => navigate('/register')}>
          SignUp
        </button>
        <button className='px-4 py-2 rounded-lg bg-white'
          onClick={() => navigate('/notices')}>
          Notices
        </button>
      </div>
      <h1 className="text-5xl text-white text-center pt-10 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
        GeoGuardian
      </h1>
      <EarthCanvas />
    </div>
  );
};

export default Landing;
