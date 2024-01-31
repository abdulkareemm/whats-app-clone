export default function TraingleIcon({className,points}){
    return (
      <svg width="30" height="30" className={className} xmlns="http://www.w3.org/2000/svg">
        <polygon points={points} />
      </svg>
    );
}