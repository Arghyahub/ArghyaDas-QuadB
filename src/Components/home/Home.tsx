import { useEffect , useState } from "react"
import { Link } from "react-router-dom"
import "./Home.css"
import { ApiResponse , movie } from "../types"
const Home = () => {
  
  const [Data, setData] = useState<ApiResponse>([]) ;
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const data:Response = await fetch("https://api.tvmaze.com/search/shows?q=all#") ;
        const json:ApiResponse = await data.json() ;
        setData(json) ;
      }
      catch(err) {
        console.log(err) ;
      }
    }

    fetchData() ;

  }, [])
  
  return (
    <div id="Home" className='flrow'>
      {Data.map((elem:movie,index:number) => (
        <Link className="flcol lntxt movies jcen acen" to={`/movie/${elem.show.id}`} key={index} >
          <img src={elem.show.image.medium} alt="Show Poster" className="movieimg" />
          <p className="home-tittle">{elem.show.name}</p>
        </Link>
      ))}
    </div>
  )
}

export default Home