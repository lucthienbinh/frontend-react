import React from 'react'

export default function CustomerCard(props) {
    return (
        <div>
            <p>{props.customer.id}</p>
            <p>{props.customer.name}</p>
            <p>{props.customer.age}</p>
            <p>{props.customer.phone}</p>
            <p>{props.customer.gender}</p>
            <p>{props.customer.address}</p>
            <p>{props.customer.point}</p>
            <p>{props.customer.created_at}</p>
            <hr></hr>
        </div>
    )
}