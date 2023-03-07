import React, { Component } from 'react'
import Load from '../components/Spinner-0.6s-336px.gif'
const Loading = ()=> {
    
        return (
            <div className='text-center'>
                <img src={Load} alt='loading' style={{width:'110px'}} />

            </div>
        )
    
}

export default Loading