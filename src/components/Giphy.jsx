import axios from 'axios'
import React, {useEffect,useState}from 'react'
import Paginate from './Paginate';
import Spinner from "./Spinner";

const Giphy = () => {
    const[data,setData] = useState([]);
    const[loading , setLoading] = useState(false);
    const[isError , setIsError] = useState(false);
    const[search , setSearch] = useState("");
    const[currentPage , setCurrentPage] = useState(1);
    const[itemsPerPage , _setItemsPerPage] = useState(5);
    const indexOfLastItem = currentPage*itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem,indexOfLastItem);
    useEffect(()=>{
        const fetchData = async () =>{
            setIsError(false)
            setLoading(true);
            try{
                const results = await axios("https://api.giphy.com/v1/gifs/trending",{
                    params: {
                        api_key: "GlVGYHkr3WSBnllca54iNt0yFbjz7L65",
                        limit: "25"
                    }
                })
                console.log(results);
                setData(results.data.data);

            } catch(err){
            setIsError(true);
            setTimeout(()=>
                setIsError(false), 3000
            )
            }
          
           
            setLoading(false);
        };
        fetchData();
       
    },[]);
    const renderGifs = () => {
        if(loading){
            return <Spinner/>;
        }
        return currentItems.map(e =>{
            return(
                <div key = {e.id}className = "gif">
                <img src={e.images.fixed_height.url} />
                </div>
            )
        })
    }
    const renderError = () =>{
        if(isError){
            return(
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    Unable to get Gifs
                </div>
            )
        }
    }
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }
    const handleSubmission = async (e) => {
            e.preventDefault();
            setIsError(false);
            setLoading(true);
            const results = await axios("https://api.giphy.com/v1/gifs/search",{
                params: {
                    api_key: "GlVGYHkr3WSBnllca54iNt0yFbjz7L65",
                    q: search,
                    limit: 25
                }
            })
        setData(results.data.data);
        setLoading(false);
    }
    const pageSelected = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }
        
    
  return (
    <div className='m-2'>
        {renderError()}
        <form className="form-inline justify-content-center row g-2">
            <div className = "col-sm-6">
            <input value= {search} onChange={handleSearchChange} type = "text" placeholder = "Article name or keywords.."
            className = "form-control" />
            </div> 
            <div className='col-auto'>
            <button onClick={handleSubmission} type = "submit" className = "btn btn-dark mx-2" >
                Search Results
            </button>
            </div> 
        </form>
    <div className = "container gifs my-4">
      {renderGifs()}
    </div>
    <div className='footer'>
        <Paginate 
        pageSelected={pageSelected}
        currentPage = {currentPage} itemsPerPage= {itemsPerPage} 
        totalItems = {data.length}
        />
    </div>
    </div>
  )
  }

export default Giphy
