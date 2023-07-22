import Link from "next/link";

const Header = () => {
  return (
    <header className='py-4 mb-8 bg-white shadow-md '>
      <nav>
        <ul className='container flex flex-row justify-around'>
          <li>
            <Link className='block p-2' href={"/"}>
              Home
            </Link>
          </li>
          <li>
            <Link className='block p-2' href={"/"}>
              Products
            </Link>
          </li>
          <li>
            <Link className='block p-2' href={"/auth"}>
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
