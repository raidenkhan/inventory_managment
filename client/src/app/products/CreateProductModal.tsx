import React, { ChangeEvent, FormEvent, useState } from 'react'
import { v4 } from 'uuid';
import Header from '../(components)/Header';
type ProductFormData={
    name:string;
    price:number;
    stockQuantity:number;
    rating :number;

}
type CreateProductModalProps = {
    isOpen:boolean;
    onClose:()=>void;
    onCreate:(formData:ProductFormData)=>void;
}

const CreateProductModal = ({
    isOpen,
    onClose,
    onCreate
}:CreateProductModalProps) => {
  const [formData,setFormdata]=useState({
    productId:v4(),
    name:"",
    price:0,
    stockQuantity:0,
    rating:0,

  })
  const labelCssStyles='block w-full mb-2 p-2 border-gray-500 border-2 rounded-md' ;
  const inputCssStyles="'block text-sm font-medium text-gray-700"
  const handleChange =(e:ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target;
    setFormdata({
      ...formData,[name]:name==="price" || name==="stockQuantity" || name === "rating"?parseFloat(value):value
    })
  }
  if(!isOpen) return null;
  const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    onCreate(formData)
    onClose();
  }

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20'>
      <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
    <Header name="Create new Product"/>
    <form action="" onSubmit={handleSubmit} className='mt-5'>
    {/* PRODUCT NAME */}
      <label htmlFor="productName" className={inputCssStyles}>
        Product Name
      </label>
    <input type="text" name="name" placeholder='Name'
    onChange={handleChange} 
    value={formData.name}
    className={labelCssStyles} required
    />
    {/* PRICE */}
      <label htmlFor="PRICE" className={inputCssStyles}>
        Product Price
      </label>
    <input type="number" name="price" placeholder='$'
    onChange={handleChange} 
    value={formData.price}
    className={labelCssStyles} required
    />
    {/* STOCK QUANTITY */}
      <label htmlFor="stockQuantity" className={inputCssStyles}>
        Stock Quantity
      </label>
    <input type="number" name="stockQuantity" placeholder='Qty'
    onChange={handleChange} 
    value={formData.stockQuantity}
    className={labelCssStyles} required
    />
    {/* RATING */}
    <label htmlFor="rating" className={inputCssStyles}>
        Rating
      </label>
    <input type="number" name="rating" placeholder='rating'
    onChange={handleChange} 
    value={formData.rating}
    className={labelCssStyles} required
    />
    {/* create ations */}
    <button type='submit' className='mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>Create
    </button>
    <button onClick={onClose} type='button' className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 ml-2'>Cancel</button>
    </form>
      </div>
    </div>
  )
}

export default CreateProductModal