import { useState } from "react";
import AuthLayout, {
  Form,
  Input,
  Note,
  SubmitButton,
  TextLink,
} from "../components/AuthLayout";

const Login = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <AuthLayout image="login-background" title="LOGIN">
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          aria-label="Email"
          autoComplete="email"
          required
        />
        <Input
          type="password"
          placeholder="Password"
          aria-label="Password"
          autoComplete="current-password"
          required
        />
        <TextLink as="span">Forgot your password?</TextLink>
        <SubmitButton>SIGN IN</SubmitButton>
        {submitted && <Note role="status">Sign-in isn't available yet.</Note>}
        <TextLink to="/register">Create account</TextLink>
      </Form>
    </AuthLayout>
  );
};

export default Login;
