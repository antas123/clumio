import React from "react";
import styles from "./FilterCarousel.module.css";


const Pagination =({page, setPage, totalPages})=>{

    const prevPage=()=>{
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
        setPage((x) => Math.max(x - 1, 1))
    }

    const nextpage =()=>{
        setPage((x) => x + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
    
return (
    <div className={styles.paginationContainer}>
    <button
      className={styles.paginationButton}
      disabled={page === 1}
      onClick={prevPage}
    >
      Prev
    </button>
    <span className={styles.paginationCounter}>{page} of {totalPages}</span>
    <button
      className={styles.paginationButton}
      disabled={page === totalPages}
      onClick={nextpage }
    >
      Next
    </button>
  </div>
)
}

export default Pagination