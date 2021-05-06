import {
    HashRouter as Router,
    // Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { StaysEdit } from './pages/StaysEdit/StaysEdit';
import { StaysDetails } from './pages/StaysDetails/StaysDetails';
import { ExplorePage } from './pages/ExplorePage/ExplorePage';
import { AppHeader } from './cmps/AppHeader/AppHeader';
import { UserProfile } from './pages/UserProfile/UserProfile';
import { LoginSignup } from './pages/LoginSignup/LoginSignup';
// import hero from '../src/assests/imgs/hero.jpg';
import './App.css';

function App() {

    return (
        <Router>
            <div className='App'>
                <AppHeader />
                <Switch>
                    <Route
                        component={UserProfile}
                        path='/user-profile/:userId'
                    />
                    <Route component={StaysEdit} path='/stays/edit/:id?' />
                    <Route component={StaysDetails} path='/stays/:id' />
                    <Route component={LoginSignup} path='/signup' />
                    <Route component={ExplorePage} path='/stays' />
                    <Route component={HomePage} path='/' />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
