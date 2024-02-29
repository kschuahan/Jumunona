



export const getCharachterstics = (data: any) => {

    const filter = data.map(it => it.value)

    return filter.join(' • ')
}

export const getAge = (dobYear: number) => {
    var today = new Date();
    return today.getFullYear() - dobYear
}