const Pagination = ({ page, totalPages, setPage }) => {
    return (
        <div className="d-flex justify-content-center mt-3">
            <button
                className="btn btn-secondary me-2"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
            >
                Previous
            </button>
            <span className="align-self-center">
                {page} / {totalPages}
            </span>
            <button
                className="btn btn-secondary ms-2"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;