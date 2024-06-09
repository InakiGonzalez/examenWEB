import NavigationBar from '../../src/shared/NavigationBar';
import Form from './components/Form';

const Register = () => {
    return (
        <NavigationBar>
            <div style = {{display: 'flex', justifyContent: 'center'}}>
                <div style={{width: '50%'}}>
                    <Form />
                </div>
            </div>
        </NavigationBar>
    )
}

export default Register;