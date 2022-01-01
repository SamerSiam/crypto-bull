import React from 'react';
import './Home.css'

const HomePage = (props) => {
   

    return (
        <div className="img"> 
           
           <img src={require('./welcome.jpg')} alt="welcome" />
      
        </div>
    )
};

export default HomePage;