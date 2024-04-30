const getPercentageOf = (value: number, budget: number) => {
    if (budget !== 0) {
        return Math.round((value * 100) / budget);
    }
    
    return 0;
};

export default getPercentageOf;