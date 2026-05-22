import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

function AsyncStatus({
  loading,
  error,
  loadingMessage,
  children,
  loadingClassName = "text-center mt-5",
  errorClassName = "",
}) {
  if (loading) {
    return (
      <Container className={loadingClassName} role="status" aria-live="polite">
        <Spinner animation="border" variant="dark" />
        <p className="mt-3">{loadingMessage}</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className={errorClassName} role="alert" aria-live="assertive">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return typeof children === "function" ? children() : children;
}

export default AsyncStatus;
