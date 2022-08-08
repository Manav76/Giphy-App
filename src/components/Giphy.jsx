import axios from 'axios'
import React, {useEffect,useState}from 'react'
import Spinner from "./Spinner";

const Giphy = () => {
    const[data,setData] = useState([]);
    const[loading , setLoading] = useState(false);
    useEffect(()=>{
        const fetchData = async () =>{
            setLoading(true)
            const results = await axios("https://api.giphy.com/v1/gifs/trending",{
                params: {
                    api_key: "GlVGYHkr3WSBnllca54iNt0yFbjz7L65",
                    limit: "25"
                }
            })
            console.log(results);
            setData(results.data.data);
            setLoading(false);
        };
        fetchData();
       
    },[]);
    const renderGifs = () => {
        if(loading){
            return <Spinner/>;
        }
        return data.map(e =>{
            return(
                <div key = {e.id}className = "gif">
                <img src={e.images.fixed_height.url} />
                </div>
            )
        })
    }
  return (
    <div className = "container gifs">
      {renderGifs()}
    </div>
  )
}

export default Giphy
