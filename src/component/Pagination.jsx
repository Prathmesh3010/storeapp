import React from 'react';
import ReactPaginate from 'react-paginate';
// optional small styles

export default function Pagination({ pageCount, onPageChange, forcePage=0 }) {
  return (
    <div className="d-flex justify-content-center my-3">
      <ReactPaginate
        breakLabel="..."
        nextLabel="›"
        onPageChange={onPageChange}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="‹"
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        activeClassName="active"
        forcePage={forcePage}
      />
    </div>
  );
}
