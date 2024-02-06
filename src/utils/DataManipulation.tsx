



export const getCharachterstics = (data: any) => {

    const filter = data.map(it => it.value)

    return filter.join(' • ')
}