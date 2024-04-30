const getShortIso = (date: Date) => {
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const monthDate = `${date.getDate()}`.padStart(2, '0');

    return `${date.getFullYear()}-${month}-${monthDate}`;
}

export default getShortIso;