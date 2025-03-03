import React from 'react'
import { Box, H2, Text, Label, Input, Button, FormGroup } from '@adminjs/design-system'
import { styled } from '@adminjs/design-system/styled-components'

// Custom styled components
const StyledLogo = styled(Box)`
  height: 100px;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
`

const StyledForm = styled(Box)`
  width: 400px;
  padding: 36px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
`

const StyledButton = styled(Button)`
  width: 100%;
  background-color: #002147;
  color: white;
  &:hover {
    background-color: #003366;
  }
`

const StyledInput = styled(Input)`
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  padding: 12px;
  margin-top: 8px;
  &:focus {
    border-color: #002147;
    box-shadow: 0 0 0 2px rgba(0, 33, 71, 0.2);
  }
`

const StyledLabel = styled(Label)`
  font-weight: 500;
  margin-bottom: 4px;
`

const Login = (props) => {
  const { action, error } = props

  return (
    <Box
      flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      style={{
        backgroundImage: 'url(https://www.tigeranalytics.com/wp-content/uploads/2023/07/hero-image-1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      {/* Overlay for better text readability */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      />

      <StyledForm style={{ position: 'relative', zIndex: 1 }}>
        <StyledLogo>
          <img src="/assets/logo.svg" alt="Tiger Analytics" height="80px" />
        </StyledLogo>
        <H2 mb="24px" textAlign="center" style={{ color: '#002147' }}>
          Welcome to Tiger Analytics Admin Panel
        </H2>
        {error && (
          <Text color="red" mb="16px" textAlign="center">
            {error}
          </Text>
        )}
        <form method="POST" action={action}>
          <FormGroup mb="16px">
            <StyledLabel>Email</StyledLabel>
            <StyledInput type="email" name="email" placeholder="Enter your email" required />
          </FormGroup>
          <FormGroup mb="24px">
            <StyledLabel>Password</StyledLabel>
            <StyledInput type="password" name="password" placeholder="Enter your password" required />
          </FormGroup>
          <StyledButton type="submit" variant="contained">
            Log In
          </StyledButton>
          <Box mt="16px" textAlign="center">
            <Text size="sm" style={{ color: '#666' }}>
              © 2023 Tiger Analytics. All rights reserved.
            </Text>
          </Box>
        </form>
      </StyledForm>
    </Box>
  )
}

export default Login

