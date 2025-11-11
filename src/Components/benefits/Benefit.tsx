import { motion } from "framer-motion";


type benefitProps = {
    icon : React.JSX.Element,
    description : string,
    title : string

}

const Benefit = ({icon, title, description} : benefitProps) => {
    return ( 
         <motion.div 
        variants={{
          opacity :{opacity: 0, scale :0.93},
          vissibe : {opacity: 1, scale : 1}
        }}
        className="py-10 px-12 space-y-5 mt-4 flex flex-col items-center justify-center border-gray-200 border-2"
                
        >
            <div className="rounded-full h-16 w-16 p-4 flex justify-center bg-[#f8f4eb]">{icon}</div>
            <h2 className="text-center">{title}</h2>
            <p className="text-center">{description}</p>
        </motion.div>
     );
}
 
export default Benefit;