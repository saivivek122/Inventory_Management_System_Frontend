import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import axios from "axios";

const ChartJs = () => {
  const [products,setProducts]=useState([]);
  const [loading,setLoading]=useState(true);
  
  async function handleFetchProducts(){
    try{
      const res=await axios.get("http://localhost:3000/products");
      setProducts(res.data.products);
      console.log("From chart",res.data.products)
      setLoading(false)
    }
    catch(error){
      console.log("Error is",error)
      setLoading(false)
    }
  }
   useEffect(()=>{
    handleFetchProducts()
  },[])

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if(loading ||products.length==0)return;
    let categories=[];
    let map=new Map()
    products.map((item)=>{
      if(!categories.includes(item.category)){
        categories.push(item.category)
      }
    })
    products.map((item)=>{
      if(!map.has(item.category)){
        map.set(item.category,0)
      }
     map.set(item.category,map.get(item.category)+item.price)
    })
    console.log("the map is",map)
    if (chartInstance.current) {
      chartInstance.current.destroy(); 
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: categories,
        datasets: [
          {
            label: "Product Category Wise Prices",
            data: [...map.values()],
            backgroundColor: ["red", "blue", "green", "orange","purple"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }, [products,loading]);
  
if(loading)return<p>Loading...</p>
  return (
    <div className="chart">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ChartJs;
