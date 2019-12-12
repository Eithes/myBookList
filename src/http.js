class Http {

  async get(url) {
     const response = await fetch(url);     
     if (!response.ok) throw new Error(response.error);
     const resData = await response.json();
     return resData;
  }

  async post(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(response.error);
    const resData = await response.json();
    return resData; 
  }

  async put(url, data) {
    const response = await fetch(url, { 
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
          }, 
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(response.error);
    const resData = await response.json();
    return resData;        
  }

  async delete(url) {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
             'Content-type': 'application/json'
          }
    });
    if (!response.ok) throw new Error(response.error);
    const resData = await response.json();
    return 'post deleted';             
   }
}

export const http = new Http();