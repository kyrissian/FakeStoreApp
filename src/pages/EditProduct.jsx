import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import AsyncStatus from "../components/AsyncStatus";
import {
  CATEGORY_OPTIONS,
  clearFakeStoreCache,
  fetchProductById,
  toTwoDecimalPrice,
} from "../utils/fakestore";

const REDIRECT_DELAY_MS = 1500;

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    if (!success) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      navigate(`/products/${id}`);
    }, REDIRECT_DELAY_MS);

    return () => clearTimeout(timeoutId);
  }, [success, navigate, id]);

  useEffect(() => {
    fetchProductById(id)
      .then((productData) => {
        const { title, price, description, category } = productData;
        setFormData({
          title,
          price: toTwoDecimalPrice(price),
          description,
          category,
        });
        setLoading(false);
      })
      .catch((error) => {
        setError(`Failed to fetch product: ${error.message}`);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePriceBlur = () => {
    if (formData.price === "") {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      price: toTwoDecimalPrice(prev.price),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const payload = {
          ...formData,
          price: Number(formData.price),
        };

        const response = await axios.put(
          `https://fakestoreapi.com/products/${id}`,
          payload,
        );
        setSuccess(`Product "${response.data.title}" updated successfully!`);
        setError(null);
        setShowSuccessToast(true);
        clearFakeStoreCache();
      } catch (err) {
        setError(`Failed to update product: ${err.message}`);
        setSuccess(null);
      }
    }
    setValidated(true);
  };

  return (
    <AsyncStatus loading={loading} loadingMessage="Loading product...">
      <Container className="mt-3 pb-5" style={{ maxWidth: "600px" }}>
        <ToastContainer position="top-end" className="p-3">
          <Toast
            show={showSuccessToast && Boolean(success)}
            onClose={() => setShowSuccessToast(false)}
            delay={2500}
            autohide
            bg="success"
            className="text-white product-toast"
          >
            <Toast.Header closeButton={false}>
              <strong className="me-auto">Product updated</strong>
            </Toast.Header>
            <Toast.Body>{success}</Toast.Body>
          </Toast>
        </ToastContainer>

        <Button
          variant="outline-dark"
          className="mb-4 mt-5"
          onClick={() => navigate(`/products/${id}`)}
        >
          ← Back to Product
        </Button>

        <div className="hero-panel p-4">
          <h2 className="mb-4">Edit Product</h2>

          {success && <Alert variant="success" className="d-none" />}
          {error && (
            <Alert variant="danger" dismissible>
              {error}
            </Alert>
          )}

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter product title"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a title
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                onBlur={handlePriceBlur}
                placeholder="Enter price"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a price
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a description
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option hidden value="">
                  Choose a category...
                </option>
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a category
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex gap-2 mt-4 mb-3">
              <Button variant="dark" type="submit">
                Update Product
              </Button>
              <Button
                variant="outline-dark"
                onClick={() => navigate(`/products/${id}`)}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </AsyncStatus>
  );
}

export default EditProduct;
