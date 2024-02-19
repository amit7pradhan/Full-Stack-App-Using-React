import axios from 'axios';
import { Link ,useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react'

export default function Home() {

    const[users,setUsers]=useState([]);

    const { id } = useParams();

    useEffect(()=>{
        
        loadUsers();
    },[]);

    const loadUsers= async ()=>{
        const result= await axios.get("http://localhost:8080/users");
        setUsers(result.data);
    };

    const deleteUser = async (id) => {
      
        if(window.confirm("Are you sure , You want to delete...!!")){
          await axios.delete(`http://localhost:8080/user/${id}`);
        }
        loadUsers();
      };

  return (
    <div className='container'>
        <div className='py-4'>

        <table  className="table border border-dark shadow">
  <thead>
    <tr>
    <th scope="col">S.N</th>
    <th scope="col">Name</th>
    <th scope="col">Username</th>
     <th scope="col">Email</th>
    <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
{
      users.map((user, index) => (
        <tr>
          <th scope="row" key={index}>{index+1}</th>
          <td>{user.name}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>
            <Link className="btn btn-success mx-2"  to={`/viewuser/${user.id}`} >View</Link>
            <Link className="btn btn-primary mx-2" to={`/edituser/${user.id}`} >Edit</Link>
            <Link className="btn btn-danger mx-2" onClick={() => deleteUser(user.id)} >Delete</Link>
          </td>
        </tr>
        ))
}


  </tbody>
</table>
        </div>
    </div>
  )
}
