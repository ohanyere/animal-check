import Hero from "../../Components/Hero";
import Benefits from "../../Components/benefits/Benefits";
import Faq from "../../Components/Faq/index"
import Maquee from "../../Components/marquee";
const Home = () => {
  
      return ( 
        <div>
            <Hero />
            <Benefits / >
            <Maquee />
            <Faq />

        </div>
     );
}
 
export default Home;