import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import {
  CATEGORY_OPTIONS,
  clearFakeStoreCache,
  fetchProductById,
  toTwoDecimalPrice,
} from "../utils/fakestore";

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
        clearFakeStoreCache();
      } catch (err) {
        setError(`Failed to update product: ${err.message}`);
        setSuccess(null);
      }
    }
    setValidated(true);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="dark" />
        <p>Loading product...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-3" style={{ maxWidth: "600px" }}>
      <Button
        variant="outline-dark"
        className="mb-4"
        onClick={() => navigate(`/products/${id}`)}
      >
        ← Back to Product
      </Button>
      <h2>Edit Product</h2>

      {success && (
        <Alert variant="success" dismissible>
          {success}
        </Alert>
      )}
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

        <div className="d-flex gap-2">
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
    </Container>
  );
}

export default EditProduct;
