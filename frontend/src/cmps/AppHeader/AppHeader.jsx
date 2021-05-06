import React from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../store/actions/userActions';
import { NavLink } from 'react-router-dom';
import user from '../../assests/imgs/users.png';
import signup from '../../assests/imgs/signup.png';
import logo from '../../assests/imgs/logo.svg';
import building from '../../assests/imgs/building.png';
import './AppHeader.scss';

class _AppHeader extends React.Component {
    render() {
        return (
            <section className='App-Header'>
                <div className='first-child'>
                    <NavLink exact to='/'>
                        <img src={logo} alt='' />
                    </NavLink>
                    </div>
                    <div className='second-child'>
                        <ul>
                            <li>
                                <NavLink exact to='/stays'>
                                    <img src={building} alt='' />
                                </NavLink>
                            </li>
                            <li>
                                <NavLink exact to='/signup'>
                                    <img src={signup} alt='' />
                                </NavLink>
                            </li>
                            <li>
                                <NavLink exact to='/user-profie + {user._id}'>
                                    <img src={user} alt='' />
                                </NavLink>
                            </li>
                        </ul>
                    </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
    };
};

const mapDispatchToProps = {
    loadUser,
};

export const AppHeader = connect(
    mapStateToProps,
    mapDispatchToProps
)(_AppHeader);
