import React from 'react';

function PageNav(props) {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(props.dogsQty/props.dogsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul>
                {
                    pageNumbers?.map(elem => (
                        <li key={elem} onClick={() => props.paginator(elem)}>
                            {elem}
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
};

export default PageNav;