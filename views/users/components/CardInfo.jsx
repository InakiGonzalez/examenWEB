import userImage from '../../../user.jpeg';

const CardInfo = ({user}) => {
    return (
        <div style={{width: 'auto', height:'auto', border: 'solid black 2px', borderRadius: '5px', display: 'flex', alignItems: 'center', padding: '10px'}}>
            <img src={userImage} width={50} height={50} alt="user" style={{marginRight: '10px'}} />
            <div>
                <p>Nombre: {user.name}</p>
                <p>Correo: {user.email}</p>
                <p>Edad: {user.age}</p>
                <p>Dirección: {user.address}</p>
                <p>Altura: {user.heigth}</p>
            </div>
        </div>
    )
}

export default CardInfo;