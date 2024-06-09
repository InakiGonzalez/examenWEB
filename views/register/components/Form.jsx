import { useState } from "react";
import './Form.css'; // Import the CSS file

const Form = () => {
    const [form, setForm] = useState({
        userName: '',
        userEmail: '',
        userAge: '',
        userAddress: '',
        userGender: '',
        userHeigth: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        const newForm = {
            ...form, [name]: value,
        };
        setForm(newForm);
    };

    const handleSubitForm = async(e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3003/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form),
            });
            return res.status === 200 ? alert('Registro exitoso') : alert('Error al registrar');
        } catch (error) {
            alert('Error al registrar');
            console.log(error);
        }
    }

    return (
        <div className="form-container">
            <h1 className="form-title">Form</h1>
            <form>
                <input 
                    className="casino-input"
                    type="text" 
                    name="userName" 
                    placeholder="Name" 
                    onChange={handleChange}
                />
                <input 
                    className="casino-input"
                    type="text" 
                    name="userEmail" 
                    placeholder="Email" 
                    onChange={handleChange}
                />
                <input 
                    className="casino-input"
                    type="number" 
                    name="userAge" 
                    placeholder="Age" 
                    onChange={handleChange}
                />
                <input 
                    className="casino-input"
                    type="text" 
                    name="userAddress" 
                    placeholder="Address" 
                    onChange={handleChange}
                />
                <input 
                    className="casino-input"
                    type="text" 
                    name="userGender" 
                    placeholder="Gender" 
                    onChange={handleChange}
                />
                <input 
                    className="casino-input"
                    type="number" 
                    name="userHeight" 
                    placeholder="Height" 
                    onChange={handleChange}
                />
                <button 
                    className="casino-button submit-button"
                    type="submit"
                    onClick={handleSubitForm}
                >
                    Registrar
                </button>
            </form>
        </div>
    )
}

export default Form;
