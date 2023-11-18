const host = 'http://localhost:3030/jsonstore/todos';

export const getAll = async () => {
    try {
        const response = await fetch(host);

        const result = response.json();

        return result;
    } catch (error) {
        console.log(error.message);
    }
};

export const create = async (text) => {
    try {
        const response = await fetch(host, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text, isCompleted: false })
        });
    
        const result = await response.json();
    
        return result;
    } catch (error) {
        console.log(error.message);
    }
};

export const update = async (id, todo) => {
    try {
        const response = await fetch(host + `/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isCompleted: !todo.isCompleted })
        });
        
        const result = await response.json();

        return result;
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteTodo = async (id) => {
    try {
        const response = await fetch(host + `/${id}`, {
            method: 'DELETE'
        });
    
        const result = await response.json();
    
        return result;
    } catch (error) {
        console.log(error.message);
    }
}