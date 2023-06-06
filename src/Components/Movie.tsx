import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import { movie , ApiResponse } from "./types";
import "./Movie.css"


const Movie = () => {
  const { id } = useParams<{ id: string }>();

  const [Msg, setMsg] = useState<string>("Please Wait") ;
  const [Data, setData] = useState<movie>() ;
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const data:Response = await fetch("https://api.tvmaze.com/search/shows?q=all#") ;
        const json:ApiResponse = await data.json() ;
        
        const currMovie = json.find((elem) => {
          return elem.show.id === Number(id);
        })

        console.log(currMovie) ;
        if (currMovie){
          setData(currMovie) ;
          console.log(currMovie) ;
        }
        else {
          setMsg("Movie not found Invalid URL") ;
        }
      }
      catch(err) {
        setMsg("Error Occurred") ;
        console.log(err) ;
      }
    }

    fetchData() ;
  }, [])
  
  return (
    <div id="Movie" className="flcol">
      { (!Data) ?
        (
          <div  className="flrow acen jcen">
            <h1>{Msg}</h1>
          </div>
        ):
        (
          <div id="MovieNow" className="flcol">
            <div className="bgdiv w100 flrow jcen acen">
              <img src={Data.show.image.original} alt="Ok" className="bgimg" />
            </div>
            <h1 className="tcen movie-name">{Data.show.name}</h1>
            <div className="datas flcol">
              <p className="summ" dangerouslySetInnerHTML={{ __html: Data.show.summary }} />

              <div className="other">
                <table>
                  <tr><td>Type : </td>{Data.show.type}</tr>
                  <tr><td>Language : </td> <td>{Data.show.language}</td></tr>
                  <tr><td>Genre : </td> {Data.show.genres.map((elem:string) => (<td>{elem}</td>))}</tr>
                </table>
      
              </div>

            </div>

              <div className="buy wcolor flrow jcen acen curpoi">+</div>

          </div>
        )

      }
    </div>
  )
}

export default Movie