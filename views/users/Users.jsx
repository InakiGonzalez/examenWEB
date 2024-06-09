import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "../../src/shared/NavigationBar";
import PrevDescription from "./components/PrevDescription";
import CardInfo from "./components/CardInfo";
import './Users.css';  // Import the CSS file

const Users = () => {
    const { id } = useParams();
    const idAsNumber = parseInt(id);
    const [user, setUser] = useState({});
    const [form, setForm] = useState({
        user_id: idAsNumber,
        description: '',
        prescription: ''
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const [descriptions, setDescriptions] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const fetchDescription = async () => {
        const response = await fetch(`http://localhost:3003/description/${id}`);
        const data = await response.json();
        console.log(data);
        setDescriptions(data);
    };

    const fetchUserById = async () => {
        const response = await fetch(`http://localhost:3003/users/${id}`);
        const data = await response.json();
        setUser(data);
    };

    const handleGenerateHelp = async () => {
        const prompt = { prompt: form.description };
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3003/chat/gemini', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify(prompt),
            });
            const data = await response.json();
            setForm({ ...form, prescription: data.response });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    const createDescription = async (e) => {
        e.preventDefault();
        console.log(form);
        try {
            const response = await fetch(`http://localhost:3003/description/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (response.status === 201) {
                alert('Descripción creada');
                setForm({ ...form, description: '', prescription: '' }); // Clear the form fields
                fetchDescription(); // Refresh the descriptions
            } else {
                alert('Error al crear descripción');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDescription();
        fetchUserById();
    }, [id]);

    return (
        <NavigationBar>
            <div className="casino-container">
                <div className="casino-content">
                    <div className="prev-description-container">
                        <PrevDescription descriptions={descriptions} />
                    </div>
                    <div className="info-container">
                        <CardInfo user={user} />
                        <div className="casino-textarea-container">
                            <p className="label">Description</p>
                            <textarea
                                label="Description"
                                value={form.description}
                                name='description'
                                onChange={handleInputChange}
                                className="casino-textarea"
                            />
                            <p className="label">Prescription</p>
                            <textarea
                                label="Prescription"
                                value={form.prescription}
                                name='prescription'
                                onChange={handleInputChange}
                                className="casino-textarea"
                            />
                            <div className="button-container">
                                <button 
                                    className="casino-button generate-button"
                                    disabled={isLoading}
                                    onClick={handleGenerateHelp} 
                                >
                                    {isLoading ? 'Cargando' : 'Generar Respuesta'}
                                </button>
                                <button 
                                    className="casino-button upload-button"
                                    onClick={createDescription}
                                >
                                    Subir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NavigationBar>
    );
};

export default Users;
