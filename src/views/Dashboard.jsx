import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FFF'];

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(()=> {
    axios.get('http://localhost:5000/products').then(r => setProducts(r.data)).catch(()=>{});
  },[]);

  // category counts
  const byCategory = Object.values(products.reduce((acc,p) => {
    const k = p.category || 'Other';
    acc[k] = acc[k] || { name: k, value: 0 };
    acc[k].value += 1;
    return acc;
  }, {}));

  const lowStock = products.filter(p => Number(p.quantity) <= 5).length;

  return (
    <div className="p-3">
      <h1 className='text-center  ' style={{color:'black'}}>Dashboard </h1>
      <div style={{display:'flex', gap:20, flexWrap:'wrap'}}>
        <div style={{width: 360, height: 260, background:'#fff', borderRadius:12, padding:16}}>
          <h5>Products by Category</h5>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie data={byCategory} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70} fill="#8884d8">
                {byCategory.map((entry, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{width: 520, height: 260, background:'#fff', borderRadius:12, padding:16}}>
          <h5>Stock Overview</h5>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={products}>
              <XAxis dataKey="productName" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-3 text-white fs-4" >
        <strong >Low stock items: </strong> {lowStock}
      </div>
    </div>
  );
}
