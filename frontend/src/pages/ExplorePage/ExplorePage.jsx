import { Component } from 'react';
import { connect } from 'react-redux';
import { loadStays } from '../../store/actions/staysActions';
import { StaysList } from '../../cmps/StaysList/StaysList';
import './ExplorePage.scss';

class _ExplorePage extends Component {
    state = {};
    componentDidMount() {
        this.props.loadStays();
    }
    render() {
        const { stays } = this.props;
        console.log('stays:', stays);
        return (
            <div className='explore-page'>
                <StaysList stays={stays} />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        stays: state.stayReducer.stays,
    };
};

const mapDispatchToProps = {
    loadStays,
};

export const ExplorePage = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ExplorePage);
