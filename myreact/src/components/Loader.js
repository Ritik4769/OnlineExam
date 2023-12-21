import { useState } from "react";
let toggleLoader;
function Loader(){
      const [isLoading,setIsLoading]=useState(false);
      toggleLoader = () => {
        (isLoading) ? setIsLoading(false) : setIsLoading(true);
        document.getElementById('loader').classList.toggle('loader');
    }
    return(
    <>
      <div id='loader' className="position-fixed top-0 ">
                {isLoading ? (
                    <>
                        <div className="spinner-grow m-1 text-danger " role="status" style={{width:'10px',height:'10px'}}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow m-1 text-danger " role="status" style={{width:'10px',height:'10px'}}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow m-1 text-danger " role="status" style={{width:'10px',height:'10px'}}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </>
                ) : ""}
        </div>  
    </>
    )
}
export {Loader,toggleLoader};