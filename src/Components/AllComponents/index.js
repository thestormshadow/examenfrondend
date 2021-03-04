import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Car from '../Car'

function  AllComponents(){
    const [cars, setCars] = useState([]);

    useEffect(() => {
        getAllCars();    
    }, []) 
    
    const getAllCars  = () => {
        axios.get('https://examenappbackend.herokuapp.com/cars')
        .then(response  => {         
            setCars(response.data);
        })   
    }

    return (
        cars && (
        <div>    
            { cars.map((carrObj, index) => <Car key={index} data={carrObj}></Car>) } 
        </div>
        )
    )
}

export default AllComponents;
