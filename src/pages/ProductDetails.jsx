import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value));

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(`Failed to fetch product: ${error.message}`);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      navigate("/products");
    } catch (error) {
      setError(`Failed to delete product: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="dark" />
        <p>Loading product...</p>
      </Container>
    );
  }

  if (error)
    return (
      <Container>
        <p>{error}</p>
      </Container>
    );

  return (
    <Container className="mt-3">
      <Button
        variant="outline-dark"
        className="mb-4"
        onClick={() => navigate("/products")}
      >
        ← Back to Products
      </Button>
      <Row>
        <Col md={4} className="text-center">
          <img
            src={product.image}
            alt={product.title}
            style={{ maxHeight: "300px", objectFit: "contain" }}
          />
        </Col>
        <Col md={8}>
          <h2>{product.title}</h2>
          <Badge bg="secondary" className="mb-3">
            {product.category}
          </Badge>
          <p>{product.description}</p>
          <h3 className="mb-4">${formatPrice(product.price)}</h3>
          <div className="d-flex gap-2">
            <Button
              variant="dark"
              onClick={() => navigate(`/edit-product/${id}`)}
            >
              Edit Product
            </Button>
            <Button variant="danger" onClick={() => setShowModal(true)}>
              Delete Product
            </Button>
          </div>
        </Col>
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <b>{product.title}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProductDetails;
