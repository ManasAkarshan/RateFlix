import React from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { useMutation } from '@tanstack/react-query'
import { mutationLogin } from './mutation'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
    const navigate = useNavigate()
    const { data, mutate } = useMutation({mutationKey : "login", mutationFn : mutationLogin});

    const handleLogin = async ()=>{
        await mutate();
        localStorage.setItem("guest_session_id", data.guest_session_id);
        navigate("/home")
    }

  return (
    <Grid textAlign='center' verticalAlign='middle' style={{height:"100vh"}}>
        <Grid.Column style={{maxWidth : 450}}>
            <Header as="h2" color='green' textAlign='center'>
                Welcome! Click on the button to create a guest session
            </Header> 
            <Form size='large'>
                <Segment>
                    <Button color='blue' size='large' fluid onClick={handleLogin}>Login</Button>
                </Segment>
            </Form>
        </Grid.Column>
    </Grid>
  )
}

export default Auth