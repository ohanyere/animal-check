import AnchorLink from "react-anchor-link-smooth-scroll"
import { selectedPage } from "../Navigation/navigationTypes"

type NavigionPropsType = {
    page: string,
    selectedPage: selectedPage | undefined
    setSelectedPage : (value: selectedPage) => void,
    children : React.ReactNode
}

const SmootScrollLink = ({page, selectedPage, setSelectedPage, children} : NavigionPropsType, ) => {

    const lowerCase = page.toLowerCase().replace(/ /g, "") as selectedPage


    return (
    <AnchorLink
        className={`${selectedPage === lowerCase ? "": ""} transition duration-500 hover:text-primary-300`}
        href={`#${lowerCase}`}
        onClick={() => setSelectedPage(lowerCase)}
        >
        {children}
        
    </AnchorLink>
    )
}
 
export default SmootScrollLink;