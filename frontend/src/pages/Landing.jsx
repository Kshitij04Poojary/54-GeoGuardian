import EarthCanvas from '../components/Earth';

const Landing = () => {
  return (
    <div className="h-screen bg-black">
      <h1 className="text-5xl text-white text-center pt-10 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
        GeoGuardian
      </h1>
      <EarthCanvas />
    </div>
  );
};

export default Landing;
