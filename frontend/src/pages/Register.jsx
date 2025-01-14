import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import styled from 'styled-components'

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      alert(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (formData.password !== formData.password2) {
      alert('Şifreler eşleşmiyor')
      return
    }

    const userData = {
      email: formData.email,
      password: formData.password,
    }

    dispatch(register(userData))
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <RegisterContainer>
      <RegisterForm onSubmit={onSubmit}>
        <h2>Kayıt Ol</h2>
        <FormGroup>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="E-posta"
            required
          />
        </FormGroup>
        <FormGroup>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            placeholder="Şifre"
            required
          />
        </FormGroup>
        <FormGroup>
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={onChange}
            placeholder="Şifreyi Tekrar Girin"
            required
          />
        </FormGroup>
        <Button type="submit">Kayıt Ol</Button>
      </RegisterForm>
    </RegisterContainer>
  )
}

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`

const RegisterForm = styled.form`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  h2 {
    text-align: center;
    color: var(--primary-color);
    margin-bottom: 2rem;
  }
`

const FormGroup = styled.div`
  margin-bottom: 1rem;

  input {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }
`

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }
`

export default Register 