class ContactApi {
    static URL = 'https://62054479161670001741b708.mockapi.io/api/contacts/'

    static request(url = '', method = 'GET', body ){
        return fetch(ContactApi.URL + url, {
            method,
            body: body ? JSON.stringify(body) : undefined,
            headers:{
                'Content-type': 'application/json',
            } 
        })
            .then(res =>{
                if(res.ok){
                    return res.json();
                }
                throw new Error('Cannot execute request method',{cause:res});
            })
    }

    static getList() {
        return ContactApi.request()
            .catch((error) =>{
                throw new Error('Can not Retrieve Contact List from server');
            })
    }  

    static create(contact) {
        return ContactApi
        .request('', 'POST', contact)
        .catch((error) => {
            throw new Error('Can not Retrieve Contact from server');
        })
    }

    static update(id, changes) {
        return ContactApi
            .request(id, 'PUT', changes)
            .catch((error) => {
                throw new Error('Can not update Contact from server');
        })
    }

    static delete(id) {
        return ContactApi
        .request(id, 'DELETE',)
        .catch((error) => {
            throw new Error('Can not delete Contact from server');
    })
    }
}
