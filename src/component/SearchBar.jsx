import React from 'react';

 function SearchBar({ value, onChange, onClear } )
 {
  return (
    <div className="mb-3 d-flex gap-2 align-items-center" >
      <input 
        type="search"
        className="form-control"
        placeholder="Search by name, category, supplier..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {/* <select className="form-select" onChange={e => onChange(prev => ({...prev, filter: e.target.value}))}>
      </select> */}
      <button className="btn btn-secondary" onClick={onClear}>Clear</button>
    </div>
  );
}
export default SearchBar;