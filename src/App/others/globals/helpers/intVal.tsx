const intVal = (value: string) => {
    return parseInt(value.replace(/[^\d]/g, ''));
}

export default intVal;