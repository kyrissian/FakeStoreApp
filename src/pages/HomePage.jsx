import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function HomePage() {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <h1>Welcome to FakeStore! 🛍️</h1>
      <p className="mt-3">
        Browse our amazing collection of products. Find everything you need at
        great prices!
      </p>
      <Button
        variant="dark"
        size="lg"
        className="mt-3"
        onClick={() => navigate("/products")}
      >
        Browse Products
      </Button>
    </Container>
  );
}

export default HomePage;
