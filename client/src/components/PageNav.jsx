import React from 'react';

function PageNav(props) {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(props.dogsQty/props.dogsPerPage); i++) {
        pageNumbers.push(i)
    }
    if (pageNumbers.length === 1 || pageNumbers.length === 0) {
        return <></>
    }

    return (
        <div className="container">
            {
                pageNumbers?.map(elem => {
                    if (elem === props.currentPage) {
                        return (
                            <div className="number-current-page" key={elem} onClick={() => props.paginator(elem)}>
                                {elem}
                            </div>
                        )
                    } else {
                        return (
                            <div className="number-page" key={elem} onClick={() => props.paginator(elem)}>
                                {elem}
                            </div>
                        )
                    }
                })
            }
        </div>
    )
};

export default PageNav;