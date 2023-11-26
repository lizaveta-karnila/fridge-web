interface IProps {
  color?: string
}

function SearchIcon({color}: IProps) {
  return (
    <svg viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path stroke={color}
            clipRule="evenodd" d="M5.5 11.146a6.144 6.144 0 1 1 12.288-.002 6.144 6.144 0 0 1-12.288.002Z"
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path stroke={color}
            d="m15.989 15.49 3.511 3.511"
            strokeWidth="1.5" strokeLinecap="round"
            strokeLinejoin="round"/>
    </svg>
  );
}

export default SearchIcon;
