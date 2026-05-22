import { Component } from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

class RouteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // Keep error output visible for debugging without crashing the whole app.
    console.error("Route rendering error:", error);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container className="mt-4" role="alert" aria-live="assertive">
          <Alert variant="danger">
            <Alert.Heading>Something went wrong on this page.</Alert.Heading>
            <p className="mb-3">
              Try reloading this page. If it keeps happening, go back to
              products and try again.
            </p>
            <div className="d-flex gap-2">
              <Button variant="dark" onClick={this.handleReload}>
                Reload Page
              </Button>
              <Button variant="outline-dark" href="/products">
                Back to Products
              </Button>
            </div>
          </Alert>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default RouteErrorBoundary;
