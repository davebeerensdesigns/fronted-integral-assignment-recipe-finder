import React, {useMemo} from "react";

const Params = (search) => {
    return useMemo(() => new URLSearchParams(search), [search]);
}

const PageNumber = (query) => {
    return query.get("page") !== null ? query.get("page") : 1;
}

const Type = (query) => {
    return query.get('type') !== null ? query.get('type') : '';
}

const GetQuery = {
    Params,
    PageNumber,
    Type
}

export default GetQuery;