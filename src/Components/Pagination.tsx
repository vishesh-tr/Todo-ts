const Pagination: React.FC<{ 
    currentPage: number; 
    setCurrentPage: (page: number) => void; 
    totalPages: number;
  }> = ({ currentPage, setCurrentPage, totalPages }) => {
  
    const generatePageNumbers = (): (number | string)[] => {
      const pages: (number | string)[] = [];
      
      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(2);
  
        if (currentPage > 4) pages.push("...");
        
        for (let i = Math.max(3, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) {
          pages.push(i);
        }
        
        if (currentPage < totalPages - 3) pages.push("...");
        
        pages.push(totalPages - 1);
        pages.push(totalPages);
      }
      
      return pages;
    };
  
    return (
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
  
        {generatePageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={index} className="mx-2">...</span>
          ) : (
            <button
              key={index}
              className={`btn ${currentPage === page ? "btn-primary" : "btn-outline-primary"} mx-1`}
              onClick={() => setCurrentPage(page as number)}
            >
              {page}
            </button>
          )
        )}
  
        <button
          className="btn btn-outline-primary ms-2"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;
  