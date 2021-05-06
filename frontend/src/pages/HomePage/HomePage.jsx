import { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import { UploadImage } from '../../cmps/UploadImage/UploadImage';
import { uploadImg } from '../../services/img-upload.service';

import './HomePage.scss';

export class HomePage extends Component {
    onUploadImage = async (ev) => {
        const res = await uploadImg(ev);
        return res.url
    };
    render() {
        return (
            <div className='home-page'>
                <div className='main'>
                    <h1>
                        Just <span className='stay-span'>Stay.</span>
                        <br />
                        AnyWhere.
                        <span className='stay-span'>AnyTime</span>
                    </h1>
                    <NavLink exact to='/signup'>
                        Get Started
                    </NavLink>
                    {/* <UploadImage onUploadImage={this.onUploadImage} /> */}
                </div>
            </div>
        );
    }
}
