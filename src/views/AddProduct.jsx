import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { data, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
function AddProduct() {
const {register,handleSubmit,reset,setValue}=useForm();
  const {id} =useParams();
  const navigate =useNavigate();
useEffect(()=>{
 if(id) {axios.get(`http://localhost:5000/products/${id}`)
         .then(res=>{
             for(let prop in res.data){
                setValue(prop,res.data[prop]);
             }  
         })
 } else{
    reset();
 }
 
},[])

function storeProductDetails(data){
    if(id===null || id=== undefined){
    axios.post('http://localhost:5000/products',data)
    .then(res=>{
        if(res.status===200){
            toast.success('Product details saved...!')
            reset();
        }
    })
    .catch(error=>console.log(error.message))
}else{
    axios.put(`http://localhost:5000/products/${id}`, data)
    .then(res=>{
        if(res.status===200){
            toast.success('Product details updated..!')
            reset();
            //navigate
            navigate('/view')
        }
    })
}
}

  return (
    <div className='d-flex justify-content-center' >
        <div className='w-50 bg-neon mt-0.2 p-5'>
            {
                (!id)?<h1 className='text-center fs-3' style={{color:'black'}}>Add New Products here...! </h1>:<h1 className='text-center fs-3'>Edit existing Products here...! </h1>

            }
                    <form onSubmit={handleSubmit(storeProductDetails)}>
                        <div className='mb-2'>
                            <label className='form-label fs-4' style={{color:'black'}}>Product Name</label>
                            <input type="text"  className='form-control'style={{fontSize:20}} {...register('productName')}/>
                        </div>

                         <div className='mb-2'>
                            <label className='form-label fs-4' style={{color:'black'}}>Product Description</label>
                            <input type="text"  className='form-control 'style={{fontSize:20}} {...register('description')} />
                        </div>

                         <div className='mb-2'>
                            <label className='form-label fs-4' style={{color:'black'}}>Product category</label>
                            <input type="text"  className='form-control' style={{fontSize:20}}{...register('category')}/>
                        </div>
                         <div className='mb-2'>
                            <label className='form-label fs-4' style={{color:'black'}}>Product Price</label>
                            <input type="text"  className='form-control'style={{fontSize:20}} {...register('price')}/>
                        </div>
                         <div className='mb-2'>
                            <label className='form-label fs-4' style={{color:'black'}}>Product Quantity</label>
                            <input type="text"  className='form-control'style={{fontSize:20}} {...register('quantity')}/>
                        </div>
                         <div className='mb-2'>
                            <label className='form-label fs-4' style={{color:'black'}}>Product Supplier</label>
                            <input type="text"  className='form-control'style={{fontSize:20}} {...register('supplier')}/>
                        </div>

                         <div className='mb-2'>
                            <label className='container'>
                            <label  className=' form-label fs-4' style={{color:'black'}}>Is product in stock?</label>
                            <input checked:checked='true' type="checkbox"   {...register('inStock')}/>
                              <div className="checkmark"></div>
                              </label>
                        </div>
                        <button className='btn btn-primary '>Submit </button>
                    </form>
        </div>
    </div>
  )
}

export default AddProduct