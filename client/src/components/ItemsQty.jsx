import React from 'react';

function ItemsQty(props) {
    if (props.qty === 0) {
        return <></>
    }
    return (
        <div className="items-qty-container">
            {props.qty} items found - Showing items {props.from} to {props.to}
        </div>
    )
};

export default ItemsQty;