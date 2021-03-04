import React from 'react';
import { useEffect,useState } from 'react'
import '../../App.css';
import axios from 'axios';

function Car(props){

    const [phaseSend, setphase] = useState(0);
    const [person, setperson] = useState("");
    const [date, setdate] = useState("");

    const [personMaintenance, setpersonMaintenance] = useState("");
    const [dateMaintenance, setdateMaintenance] = useState("");

    useEffect(()=>{
        if(props.data.inMaintenance){
            axios.get('https://examenappbackend.herokuapp.com/maintenancePerson/'+props.data.id)
        .then(response  => {  
            setphase(2);  
            console.log(response);
            setpersonMaintenance(response.data[0].person);
            setdateMaintenance(response.data[0].date);   
        })          
        }
            
    },[]) 

    const validate = () =>{
        if (person == ""){
            alert("Enter a person");
            return false;
        }
        if (date == ""){
            alert("Enter a date");
            return false;
        }

        return true;        
    }

    const save  = () => {
        if(!validate())
            return false;
        
        console.log("IdCar: "+props.data.id+" person:"+person+" date:"+date);

        axios.post('https://examenappbackend.herokuapp.com/register', {
            idCar: props.data.id,
            person: person,
            date: date,
          })
          .then(function (response) {            
          })
          .catch(function (error) {
            console.log(error);
          });

            clear()  
            setphase(2);  
            props.data.inMaintenance = true;
            setpersonMaintenance(person);
            setdateMaintenance(date); 
    }

    const clear  = () => {
        setperson("");
        setdate("");
        setphase((phaseSend == 0)?1:0)     
    }

    return (
        props.data && (
        <div className={phaseSend==0?"Card":"CardRed"}> 
            <div className="Make">  
                {props.data.make}<br/>
            </div>
            <div>  
                {props.data.model}<br/>
            </div>
            <div>
                <img className="carrImg" src={"img/"+props.data.image} />
            </div>
            <div>
                Description: {props.data.description}
            </div>
            <div>
                KM: {props.data.id}
            </div>
            <div>
                Estimate: {props.data.estimatedate!=""?props.data.estimatedate:"Not Defined"}
            </div>            
            <div>
                ID: {props.data.id}
            </div>
            <button className={(phaseSend == 0)?"btn":"btn NotDisplayExtraInfo"} onClick={()=>setphase((phaseSend == 0)?1:0)}>Mark in Maintenance</button>
            <div className={phaseSend == 1?"":"NotDisplayExtraInfo"}>
                Person: <input type="text" value={person} onChange={evt => setperson(evt.target.value)}/><br/>
                
                Estimated date: <input type="date" value={date} onChange={evt => setdate(evt.target.value)}/><br/>
                <button onClick={save} className="btnOptions">Guardar</button>
                <button onClick={clear} className="btnOptions">Cancelar</button>
                <br/>                
            </div>
            <div className={(phaseSend == 2)?"":"NotDisplayExtraInfo"}>
                In Maintenance by {personMaintenance} and estimated date is {dateMaintenance}
            </div>
            <div>--</div>
        </div>
        )
    )
}

export default Car;
