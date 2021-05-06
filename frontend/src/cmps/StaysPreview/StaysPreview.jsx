import React from 'react';
import { Link } from 'react-router-dom';
import './StaysPreview.scss';

export function StaysPreview({ stay }) {
    console.log('stay:', stay);
    return (
        <Link to={'stays/' + stay._id}>
            <div className='stay-preview'>
                <img src={stay.imgs[1]} alt='' />
                <h1>{stay.name}</h1>
                <h2>capacity: {stay.capacity}</h2>
                <h4>city: {stay.city}</h4>
                <h4>country: {stay.country}</h4>
                <h4>rate: {stay.rate}</h4>
            </div>
        </Link>
    );
}
