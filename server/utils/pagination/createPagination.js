const createPagination = (limit, page, totalCounts) => {
    let perPage = limit;
    let currentPage = page;
    if (perPage > totalCounts) perPage = totalCounts;
    const totalPages = Math.ceil(totalCounts / perPage);
    if (totalPages < currentPage) currentPage = totalPages;
    const offSet = (currentPage - 1) * limit;

    return {
        perPage: perPage,
        currentPage: currentPage,
        offSet: offSet,
        totalCounts: totalCounts,
        totalPages: totalPages || 0,
    };
};

module.exports = createPagination;
