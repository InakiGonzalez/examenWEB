import { useEffect, useState } from "react";
import Card from './components/Card';
import NavigationBar from "../../src/shared/NavigationBar";
import './Dashboard.css';  // Import the CSS file

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');

    const fetchUsers = async () => {
        const response = await fetch('http://localhost:3003/users');
        const data = await response.json();
        setUsers(data);
        console.log(data);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleFilterChange = (filterValue) => {
        setFilter(filterValue);
        console.log(filterValue);
    };

    const filteredUsers = users.filter(user =>
        user.name && user.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <NavigationBar onFilter={handleFilterChange}>
            <div className="dashboard-container">
                {filteredUsers.map((user) => (
                    <div key={user.id} className="card-wrapper">
                        <Card user={user} />
                    </div>
                ))}
            </div>
        </NavigationBar>
    )
}

export default Dashboard;
