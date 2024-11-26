import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to={'/'}>
      <h1 className="hover:text-violet-400 transition-all w-min-fit">ROOM CRITIC</h1>
    </Link>
  );
};

export default Logo;
