import { useRef } from 'react';
import { Container, Form, Button } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'
type AppProps = {
    setId: React.Dispatch<React.SetStateAction<string | []>>;
};
function Login({ setId }: AppProps) {
    const idRef = useRef<HTMLInputElement>(null!);
    function createNewId(): void {
        setId(uuidV4())
    }
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setId(idRef.current.value)
    }
    return (
        <Container className='align-items-center d-flex' style={{ height: '100vh' }}>
            <Form className='w-100' onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Enter your Id</Form.Label>
                    <Form.Control type='text' ref={idRef} required />
                </Form.Group>
                <Button type='submit' className='m-2'>Login</Button>
                <Button onClick={createNewId} variant='secondary'>Create A New Id</Button>
            </Form>
        </Container>
    );
}

export default Login;