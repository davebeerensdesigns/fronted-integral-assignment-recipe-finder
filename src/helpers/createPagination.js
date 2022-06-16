const Offset = (page, number) => {
    return (parseInt(page) * number) - number;
}

const NextPage = (page) => {
    return parseInt(page) + 1;
}

const PreviousPage = (page) => {
    return parseInt(page) - 1;
}

const createPagination = {
    Offset,
    NextPage,
    PreviousPage
}

export default createPagination