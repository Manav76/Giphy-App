import React from "react";

const Paginate = (props) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <ul className="pagination pagination-dark justify-content-center border-0" >
        {pageNumber.map(e => {
            let present = "page-item ";
            if(e === props.currentPage){
                present += "active";
            } 
          return (
            <li className={present} >
              <a onClick={() => props.pageSelected(e)} className="page-link">
                {e}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Paginate;
