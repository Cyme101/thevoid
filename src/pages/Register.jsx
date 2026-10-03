import { useState } from "react";
import AuthLayout, {
  Form,
  Input,
  Note,
  SubmitButton,
} from "../components/AuthLayout";

const Register = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setMessage(
      form.get("password") === form.get("confirmPassword")
        ? "Account creation isn't available yet."
        : "Passwords don't match."
    );
  };

  return (
    <AuthLayout image="register-background" title="CREATE ACCOUNT">
      <Form onSubmit={handleSubmit}>
        <Input
          name="firstName"
          placeholder="First Name"
          aria-label="First name"
          autoComplete="given-name"
          required
        />
        <Input
          name="lastName"
          placeholder="Last Name"
          aria-label="Last name"
          autoComplete="family-name"
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          aria-label="Email"
          autoComplete="email"
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          aria-label="Password"
          autoComplete="new-password"
          minLength={8}
          required
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          aria-label="Confirm password"
          autoComplete="new-password"
          required
        />
        <SubmitButton>CREATE</SubmitButton>
        {message && <Note role="status">{message}</Note>}
      </Form>
    </AuthLayout>
  );
};

export default Register;
