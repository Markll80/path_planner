import React from 'react';
import './homepage.styles.scss';

import Popup from '../../components/popup/popup.component';

class HomePage extends React.Component {
    constructor() {
        super();

        this.state = {
            settings: true,
            mapWidth: 0,
            mapHeight: 0,
        };
    }

    toggleSettings = () => {
        return null;
    }

    handleSubmit = (config) => {
        this.setState({
            settings: false,
            mapWidth: config.mapWidth,
            mapHeight: config.mapHeight,
            start: config.start,
            goal: config.goal,
            costs: config.costs
        });
    }

    render() {
        return(
            <Popup toggle={this.toggleSettings} handleSubmit={this.handleSubmit}/>
        );
    }
}