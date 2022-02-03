import { useState, useEffect } from 'react';

import './page-styles.css';

const Contatos = () => {

    const url = 'http://localhost:5000/message'
    const [message, setMessage] = useState([]);
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [validator, setValidator] = useState(false);
    const [render, setRender] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(async () => {
        const response = await fetch(url)
        const data = await response.json();
        setMessage(data);
    }, [render])

    const sendMessage = () => {
        setValidator(false);
        if (author.length <= 0 || content.length <= 0) {
            return setValidator(!validator)
        }
        const bodyForm = {
            email: author,
            message: content,
        }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyForm)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.id) {
                    setRender(true);
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                    }, 5000)
                }
            })

        setAuthor('');
        setContent('');

        console.log(content)
    }

    return (
        <>
            <div className='container mt-5'>
                <h2 className='page-title'>DEIXE SUA MENSAGEM</h2>
                <form className='col-md-4 offset-md-4'>
                    <div className="form-group mt-2">
                        <input type="text" className="form-control formulario" id="name" placeholder="Nome" value={author} onChange={(event) => { setAuthor(event.target.value) }} />
                    </div>
                    <div className="form-group mt-2">
                        <textarea type="text" className="form-control formulario" id="message" placeholder="Mensagem" rows='3' value={content} onChange={(event) => { setContent(event.target.value) }} />
                    </div>
                </form>
            </div>

            {validator &&
                <div className="alert alert-warning alert-dismissible fade show mt-2" role="alert">
                    <strong>Por favor preencha todos os campos!</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }

            {success &&
                <div className="alert alert-success alert-dismissible fade show mt-2" role="alert">
                    <strong>Mensagem foi enviada</strong>
                </div>
            }
            <div className='container'>
                <button onClick={sendMessage} className="mt-2 col-md-4 offset-md-4 col-sm-12 col-12 btn-message border-0">
                    Enviar
                </button>
            </div>

            <div className='container-fluid mt-5'>
                <div className='row'>
                    {message.map((content) => {
                        return (
                            <div className='col-xm-4 col-md-6 mt-2'>
                                <div className="card card-message" key={content.id}>
                                    <div className="card-body">
                                        <h5 className="card-title">{content.email}</h5>
                                        <p className="card-text">{content.message}</p>
                                        <p className="card-text"><small className="text-muted">{content.created_at}</small></p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Contatos;
