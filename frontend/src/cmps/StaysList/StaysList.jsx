import React from 'react';
import { StaysPreview } from '../StaysPreview/StaysPreview';
import './StaysList.scss';

export function StaysList({ stays }) {
    return (
        <div className='stay-list'>
            {stays &&
                stays.map((stay) => {
                    return <StaysPreview key={stay._id} stay={stay} />;
                })}
        </div>
    );
}
