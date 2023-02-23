import { useEffect } from 'react';
import { useState } from 'react'

// 4 - custom hook

export const useFetch = (url) => {
    const [data, setData] = useState(null);

    // 5 - refatorando post
    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);

    // 6 - loading
    const [loading, setLoading] = useState(false);

    // 7 - tratando erros
    const [error, setError] = useState(null);

    // 8 - desafio 6
    const [itemId, setItemId] = useState(null);

    const httpConfig = (data, method) => {

        if (method === "POST") {
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            setMethod(method);

        } else if (method === "DELETE") {
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json"
                },
            });

            setMethod(method);
            setItemId(data);
        }
    }

    useEffect(() => {

        // RECEBER OS DADOS
        const fetchData = async () => {

            // 6 - loading
            setLoading(true)

            try{
                const res = await fetch(url);
            const data = await res.json();

            setData(data);
            } catch (error) {
                console.log(error.message);

                setError('Houve um erro ao carregar a dados...')
            }

            setLoading(false);

        }

        fetchData();

    }, [url, callFetch]);

    // 5 - refatorando post
    useEffect (() => {

        // ENVIAR OS DADOS
        const httpRequest = async () => {

            let json

            if (method === "POST") {
            
                let fetchOptions = [url, config]
    
                const res = await fetch(... fetchOptions);
    
                json = await res.json();
    
            } else if (method === "DELETE") {

                const deleteURL = `${url}/${itemId}`;

                const res = await fetch(deleteURL, config);

                json = await res.json();

            }

            setCallFetch(json);

        }

        httpRequest();

    }, [config, url, method]);

  return {data, httpConfig, loading, error};
}
