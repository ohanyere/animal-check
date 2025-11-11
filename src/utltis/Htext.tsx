type HtextPropsType = {
    children : React.ReactNode,
    className ?: string
}

const Htext = ({children, className} : HtextPropsType) => {
    return ( 
        <h1 className={`text-3xl text-dark-green-20 mx-auto text-center w-5/6 font-bold capitalize ${className}`}>{children}</h1>
     );
}
 
export default Htext;