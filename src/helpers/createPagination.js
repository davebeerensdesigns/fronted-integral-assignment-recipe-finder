const Offset = (page, number) => {
    return (parseInt(page) * number) - number;
}

const NextPage = (page) => {
    return parseInt(page) + 1;
}

const NextPageURL = (nextParameters, baseLink) => {
    return nextParameters ? baseLink + '?' + nextParameters.join('&') : baseLink
}

const PreviousPage = (page) => {
    return parseInt(page) - 1;
}

const PreviousPageURL = (previousParameters, baseLink) => {
    return previousParameters ? baseLink + '?' + previousParameters.join('&') : baseLink;
}

const createPagination = {
    Offset,
    NextPage,
    NextPageURL,
    PreviousPage,
    PreviousPageURL
}

export default createPagination