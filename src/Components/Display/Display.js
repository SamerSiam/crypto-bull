import React from 'react'

function Display({items}) {
    
    
    return (
        <div>
             {items.map((item, index) => (
        <div key={item.id} >
          <p>{item.id}</p>
          <p>{item.symbol}</p>
          <p>{item.name}</p>
          <p> <img src={item.image} alt={item.name}/> </p>
          <p>{item.symbol}</p>
          <p> {item.current_price}</p>
          
          </div>
      ))}
        </div>
    )
}
export default Display