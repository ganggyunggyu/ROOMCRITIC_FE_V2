import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to={'/'}>
      <h1 className="hover:text-violet-400 transition-all w-min-fit">ROOM CRITIC</h1>
    </Link>
  );
};
