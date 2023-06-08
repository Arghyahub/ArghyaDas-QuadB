import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import { movie , ApiResponse } from "../types";
import "./Movie.css"


const Movie = () => {
  const { id } = useParams<{ id: string }>();

  const [Msg, setMsg] = useState<string>("Please Wait") ;
  const [Data, setData] = useState<movie>() ;
  const [buyMsg, setbuyMsg] = useState("In Cinemas") ;
  const [BuyState, setBuyState] = useState(false) ;
  const [Modal, setModal] = useState<boolean>(false) ;

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
  },)

  useEffect(() => {
    if (Data){
      const bought = localStorage.getItem(`${Data.show.id}`) as string ;
      if (bought === 'true'){
        setBuyState(true) ;
        setbuyMsg("Successfully bought") ;
      }
    }
  }, [Data])
  

  const buyTicket = (e:React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    if (Data){
      const formData = new FormData(e.currentTarget) ;
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const phone = formData.get('phone') as string;
      
      localStorage.setItem(`${Data.show.id}`,`true`) ;
      localStorage.setItem('Name',`${name}`) ;
      localStorage.setItem('Email',`${email}`) ;
      localStorage.setItem('Phone',`${phone}`) ;
      setBuyState(true) ;
      setbuyMsg("Successfully bought") ;
    }
  }

  const remTicket= ():void => {
    if (Data) {
      localStorage.removeItem(`${Data.show.id}`) ;
      localStorage.removeItem('Name') ;
      localStorage.removeItem('Email') ;
      localStorage.removeItem('Phone') ;
      setBuyState(false) ;
      setbuyMsg("In Cinemas") ;
    }
  }

  
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
                  <tbody>
                    <tr><td>Type :</td><td>{Data.show.type}</td></tr>
                    <tr><td>Language :</td><td>{Data.show.language}</td></tr>
                    <tr><td>Genre : </td>{Data.show.genres.map((elem:string ,ind:number) => (<td key={ind}>{elem}</td>))}</tr>
                  </tbody>
                </table>
      
              </div>

            </div>

              <div className="buy wcolor flrow jcen acen curpoi" onClick={() => setModal(true)}>+</div>

              {Modal && (
                <>
                <div className="movie-form fcol acen modal">
                  <button className="rem curpoi" onClick={() => setModal(false)}>&times;</button>
                  <div className="flcol form-div">
                    <h1 className="tcen">{Data.show.name}</h1>
                    <p className="tcen">{Data.show.language}</p>
                    <p className="tcen">{`${Data.show.schedule.days}  ${Data.show.schedule.time}`}</p>
                    <h3 className="tcen">{buyMsg}</h3>
                  </div>

                  {!BuyState ? (
                    <form className="flcol jcen acen" onSubmit={buyTicket}>
                      <div className="inner-form">
                        <label htmlFor="name">Name :</label>
                        <input className="ip" type="text" name="name" />
                      </div>
                      <div className="inner-form">
                        <label htmlFor="email">Email :</label>
                        <input className="ip" type="email" name="email" />
                      </div>
                      <div className="inner-form">
                        <label htmlFor="phone">Phone :</label>
                        <input className="ip" type="number" name="phone" />
                      </div>
                      <button type="submit" className="buy-btn curpoi">Buy Now</button>
                    </form>
                  ) : (
                    <div className="flrow w-100 jcen">
                      <button className="cancel-btn curpoi" onClick={remTicket}>Cancel Ticket</button>
                    </div>
                  )}
  
                </div>
  
                <div className="overlay"></div>
                </>
              ) }

          </div>
        )

      }
    </div>
  )
}

export default Movie