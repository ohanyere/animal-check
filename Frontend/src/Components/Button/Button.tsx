import type { buttonTypes } from "./buttonTypes";

const Button = ({className, children,url,  ...rest} : buttonTypes) => {
    return ( 
        <button 
            className={` ${className}`}
            {...rest}
            // onClick={onClick}
        >
            {children}
        </button>
     );
}
 
export default Button;