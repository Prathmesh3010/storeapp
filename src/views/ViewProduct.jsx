import axios from 'axios'
import React, { useEffect,useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import SearchBar from '../component/SearchBar';
import Pagination from '../component/Pagination';
import '../views/DelButton.css';
const PAGE_SIZE = 5;// items per page

function ViewProduct() {
 const [products, setProducts]=useState([]);
 const [q, setQ] = useState(''); // search query
 const [sortBy, setSortBy] = useState({ key: 'id', dir: 'asc' });
 const [currentPage, setCurrentPage] = useState(0);

//     useEffect(()=>{
// axios.get('http://localhost:5000/products')
// .then(res=>setProducts(res.data))
// .catch(error=>console.log(error.message))
//     },[])

useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await axios.get('http://localhost:5000/products');
      setProducts(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load products');
    }
  }

    function onDeletAll(){
         axios.delete(`http://localhost:5000/products`)
          .then(res=>{
        if(res.status===200){
            toast.success('All products deleted');
            window.location.reload();
        }
    })
    .catch(error=> console.log(error))
    toast.error('Delete all failed');
    }
    

    function onDelete(id){
    axios.delete(`http://localhost:5000/products/${id}`)
    .then(res=>{
        if(res.status===200){
            toast.success('Product deleted');
            window.location.reload();
        }
    })
    .catch(error=> console.log(error))
    toast.error('Delete failed');
    }

    // Filter + Search
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    let arr = products.slice();

    if (term) {
      arr = arr.filter(p =>
        (p.productName || '').toLowerCase().includes(term) ||
        (p.category || '').toLowerCase().includes(term) ||
        (p.supplier || '').toLowerCase().includes(term)
      );
    }

    // Sorting
    arr.sort((a, b) => {
      const aVal = (a[sortBy.key] ?? '').toString().toLowerCase();
      const bVal = (b[sortBy.key] ?? '').toString().toLowerCase();
      if (aVal < bVal) return sortBy.dir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortBy.dir === 'asc' ? 1 : -1;
      return 0;
    });

    return arr;
  }, [products, q, sortBy]);

  // Pagination
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE);

  function handlePageChange({ selected }) {
    setCurrentPage(selected);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  }

  function toggleSort(key) {
    setCurrentPage(0);
    setSortBy(prev => {
      if (prev.key === key) return { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' };
      return { key, dir: 'asc' };
    });
  }

  return (
    <div className='p-2 '>
        <h1 className='text-center  ' style={{color:'black'}}>View Products here...! </h1>
        <div className='search-container' >
          <SearchBar style={{color:'black'}} value={q} onChange={(v) => { setQ(v); setCurrentPage(0); }} onClear={() => { setQ(''); setCurrentPage(0); }} />
        </div>
        <table className=' table table-light w-100 fs-5'> 
            <thead>
                <tr>
                    <th onClick={() => toggleSort('id')} style={{cursor:'pointer'}}>ID {sortBy.key==='id' ? (sortBy.dir==='asc' ? '▲':'▼'):null}</th>
                    <th onClick={() => toggleSort('productName')} style={{cursor:'pointer'}}>Product Name {sortBy.key==='productName' ? (sortBy.dir==='asc' ? '▲':'▼'):null}</th>
                    <th>Description</th>
                    <th onClick={() => toggleSort('category')} style={{cursor:'pointer'}}>Category {sortBy.key==='category' ? (sortBy.dir==='asc' ? '▲':'▼'):null}</th>
                    <th onClick={() => toggleSort('price')} style={{cursor:'pointer'}}>Price {sortBy.key==='price' ? (sortBy.dir==='asc' ? '▲':'▼'):null}</th>
                    <th>Quantity</th>
                    <th>Supplier</th>
                    <th>In Stock</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    pageData.map((prod)=> (
                    <tr key={prod.id}>
                        <td>{prod.id}</td>
                        <td>{prod.productName}</td>
                        <td>{prod.description}</td>
                        <td>{prod.category}</td>
                        <td>{prod.price}</td>
                        <td>{prod.quantity}</td>
                        <td>{prod.supplier}</td>
                        <td>
                            <label className='container'>
                            <input type="checkbox" style={{width:25 , height:20 }} checked={prod.inStock}  />
                              <div className="checkmark"></div>
                              </label>
                        </td>
                        <td >
                            <button className='btn text-danger' onClick={()=>onDelete(prod.id)}><i className="bi bi-trash3-fill"></i> </button>
                            <Link className='btn text-primary' to={`/edit/${prod.id}`} ><i className="bi bi-pen-fill"></i> </Link>

                        </td>
                    </tr>))
                }
                {pageData.length === 0 && (
              <tr><td colSpan={9} className="text-center">No items found</td></tr>
            )}
            </tbody>
        </table>
        <div>
             <button className='delete-all-btn' onClick={()=>onDeletAll()}>
            <span class="text">DeleteAll</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" 
            width="24" height="24" viewBox="0 0 24 24">
            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 
            3.666 3.666 8.237-8.318 8.285 8.203z">
                </path></svg></span>
             </button>
        </div>
        <Pagination pageCount={pageCount} onPageChange={handlePageChange} forcePage={currentPage} />
    </div>
    
  )
}

export default ViewProduct