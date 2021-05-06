import { Component } from 'react';
import { UploadImage } from '../../cmps/UploadImage/UploadImage';
import './LoginSignup.scss';

export class LoginSignup extends Component {
    componentDidMount() {
        console.log(this.props)
    }
    setSignup(ev) {
        ev.preventDefault();
        this.props.history.push('/')
    
    }
    setLogin(ev) {
        ev.preventDefault();
      
    }
    onChangeToLogin() {
        var divLogin = document.querySelector('.login-page');
        var divSignup = document.querySelector('.signup-page');
        divSignup.classList.toggle('isShown');
        var div = divLogin.classList.toggle('isShown');
        if (div) {
            document.querySelector('.change-shown').innerHTML =
                'Already A Member?';
        } else {
            document.querySelector('.change-shown').innerHTML =
                '';
                var elBtn = document.querySelector('.change-shown')
                elBtn.style.cursor = 'none'
        }
    }
    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.type === 'number' ? +target.value : target.value;
        this.setState({ [field]: value });
    };

    render() {
        return (
            <section className='signup-login-page'>
                <div className='signup-page'>
                    <h1>SignUp</h1>
                    <form className='signup' onSubmit={this.setSignup}>
                        <UploadImage></UploadImage>
                        <label htmlFor='username'>username</label>
                        <input
                            type='text'
                            name='username'
                            id='username'
                            onChange={this.handleChange}
                        />
                        <label htmlFor='password'>password</label>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            onChange={this.handleChange}
                        />
                        <label htmlFor='fullname'>fullname</label>
                        <input
                            type='text'
                            id='fullname'
                            name='fullname'
                            onChange={this.handleChange}
                        />
                        <button>signup</button>
                    </form>
                </div>
                <div className='login-page isShown'>
                    <h1>Login</h1>
                    <form className='login' onSubmit={this.setLogin}>
                        <label htmlFor='username'>username</label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            required
                        />
                        <label htmlFor='password'>password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            required
                        />
                        <button>login</button>
                    </form>
                </div>
                <button className='change-shown' onClick={this.onChangeToLogin}>
                    Already A Member?
                </button>
            </section>
        );
    }
}


