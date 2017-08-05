import React, {Component} from 'react';
import {arrayMove} from 'react-sortable-hoc';
import PropTypes from 'prop-types';

export class SortableList extends Component {
    static propTypes = {
        onSortEnd: PropTypes.func.isRequired,
        items: PropTypes.array.isRequired,
        children: PropTypes.func.isRequired,
    }
    constructor(props) {
        super(props);
        this.onSortEnd = this.onSortEnd.bind(this);
    }

    onSortEnd({oldIndex, newIndex}) {
        let {onSortEnd, items} = this.props;
        onSortEnd(arrayMove(items, oldIndex, newIndex));
    }

    render() {
        const {items, children: List} = this.props;

        return <List items={items} onSortEnd={this.onSortEnd}/>;
    }
}
