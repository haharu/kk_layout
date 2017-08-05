import React, {Component} from 'react';

import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

export class MoreVertButton extends Component {
    render() {
        return (
            <IconButton><MoreVertIcon/></IconButton>
        );
    }
}
