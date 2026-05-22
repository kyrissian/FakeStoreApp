import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import {
  CATEGORY_OPTIONS,
  clearFakeStoreCache,
  toTwoDecimalPrice,
} from "../utils/fakestore";

const REDIRECT_DELAY_MS = 1500;

function AddProduct() {
  const navigate = useNavigate();
  const PRODUCTS_ROUTE = "/products";
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!success) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      navigate(PRODUCTS_ROUTE);
    }, REDIRECT_DELAY_MS);

    return () => clearTimeout(timeoutId);
  }, [success, navigate, PRODUCTS_ROUTE]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      setIsSubmitting(true);

      try {
        const payload = {
          ...formData,
          price: Number(formData.price),
        };

        const response = await axios.post(
          "https://fakestoreapi.com/products",
          payload,
        );

        setSuccess(
          `Product "${response.data.title}" created successfully! ID: ${response.data.id}`,
        );
        setError(null);
        clearFakeStoreCache();
        setFormData({ title: "", price: "", description: "", category: "" });
        setValidated(false);
      } catch (err) {
        setError(`Failed to create product: ${err.message}`);
        setSuccess(null);
      } finally {
        setIsSubmitting(false);
      }
    }

    setValidated(true);
  };

  return (
    <Container className="mt-3 p-5" style={{ maxWidth: "600px" }}>
      <Button
        variant="outline-dark"
        className="mb-4"
        onClick={() => navigate(PRODUCTS_ROUTE)}
      >
        ← Back to Products
      </Button>
      <h2>Add New Product</h2>

      {success && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setSuccess(null)}
          aria-live="polite"
        >
          {success} Redirecting to products...
        </Alert>
      )}
      {error && (
        <Alert
          variant="danger"
          dismissible
          onClose={() => setError(null)}
          aria-live="assertive"
        >
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

        <div className="d-flex gap-2 mt-5">
          <Button variant="dark" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Product"}
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => navigate(PRODUCTS_ROUTE)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default AddProduct;
