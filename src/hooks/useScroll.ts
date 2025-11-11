import { useState, useEffect } from "react";

const useScroll = () => {
    const [scroll, setScroll] = useState<boolean>(false)
      useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScroll(true);
                } else {
                setScroll(false);
            }
        };
                window.addEventListener("scroll", handleScroll);
                return () => {
                    window.removeEventListener("scroll", handleScroll);
                };
                    }, []);
    
    return {scroll};
}
 
export default useScroll;

