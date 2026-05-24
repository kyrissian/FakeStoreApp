import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AsyncStatus from "../components/AsyncStatus";
import {
  fetchProductById,
  formatPrice,
  clearFakeStoreCache,
} from "../utils/fakestore";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const deleteButtonRef = useRef(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProductById(id)
      .then((productData) => {
        setProduct(productData);
      })
      .catch((error) => {
        setError(`Failed to fetch product: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      clearFakeStoreCache();
      navigate("/products");
    } catch (error) {
      setError(`Failed to delete product: ${error.message}`);
    }
  };

  return (
    <AsyncStatus
      loading={loading || !product}
      error={error}
      loadingMessage="Loading product..."
    >
      {() => (
        <Container className="mt-3">
          <Button
            variant="outline-dark"
            className="mb-4"
            onClick={() => navigate("/products")}
          >
            ← Back to Products
          </Button>
          <Row className="align-items-stretch">
            <Col md={4} className="mb-4 mb-md-0">
              <div className="product-detail__image-wrap text-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-detail__image"
                />
              </div>
            </Col>
            <Col md={8} className="d-flex flex-column">
              <div>
                <h2>{product.title}</h2>
                <Badge
                  bg=""
                  className="mb-3"
                  style={{
                    backgroundColor: "#17a589",
                    color: "white",
                    border: "none",
                  }}
                >
                  {product.category}
                </Badge>
                <p>{product.description}</p>
              </div>
              <div className="mt-auto pt-3">
                <h3 className="mb-4">${formatPrice(product.price)}</h3>
                <p className="mb-4">
                  ⭐ <strong>{product.rating?.rate}</strong> / 5 &nbsp;·&nbsp;{" "}
                  {product.rating?.count} reviews
                </p>
                <div className="d-flex gap-2">
                  <Button
                    variant="dark"
                    onClick={() => navigate(`/edit-product/${id}`)}
                    aria-label={`Edit product ${product.title}`}
                  >
                    Edit Product
                  </Button>
                  <Button
                    variant="danger"
                    ref={deleteButtonRef}
                    onClick={() => setShowModal(true)}
                    aria-label={`Delete product ${product.title}`}
                  >
                    Delete Product
                  </Button>
                </div>
              </div>
            </Col>
          </Row>

          {/* Delete Confirmation Modal */}
          <Modal
            show={showModal}
            onHide={() => {
              setShowModal(false);
              deleteButtonRef.current?.focus();
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete <b>{product.title}</b>?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowModal(false);
                  deleteButtonRef.current?.focus();
                }}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )}
    </AsyncStatus>
  );
}

export default ProductDetails;
