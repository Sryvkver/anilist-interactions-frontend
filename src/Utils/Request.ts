export const updateModule = async(module: string, moduleData: any, moduleId: string): Promise<string> => {
    if(!process.env.REACT_APP_BACKEND_URI) throw("NO BACKEND URL SUPPLIED!");

    return fetch(process.env.REACT_APP_BACKEND_URI, {
        body: JSON.stringify({
            module,
            moduleData,
            moduleId
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        if(data.err) throw(data.err)

        return data.idWithSecret
    });
}

export const loadModule = async(moduleId: string): Promise<any> => {
    if(!process.env.REACT_APP_BACKEND_URI) throw("NO BACKEND URL SUPPLIED!");

    const id = moduleId.split('-')[0];

    return fetch(process.env.REACT_APP_BACKEND_URI + 'data/' + id)
    .then(response => response.json())
    .then(data => {
        if(data.err) throw(data.err)

        return data;
    });
}