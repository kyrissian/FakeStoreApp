import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  fetchProducts,
  formatPrice,
  CATEGORY_OPTIONS,
} from "../utils/fakestore";
import ProductCard from "../components/ProductCard";
import AsyncStatus from "../components/AsyncStatus";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts()
      .then((productsData) => {
        setProducts(productsData);
      })
      .catch((error) => {
        setError(`Failed to fetch products: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const filteredProducts = useMemo(() => {
    const normalizedSearchTerm = debouncedSearchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        normalizedSearchTerm.length === 0 ||
        product.title.toLowerCase().includes(normalizedSearchTerm) ||
        product.description.toLowerCase().includes(normalizedSearchTerm);
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, debouncedSearchTerm, selectedCategory]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
  };

  return (
    <AsyncStatus
      loading={loading}
      error={error}
      loadingMessage="Loading products..."
    >
      <Container as="section" aria-labelledby="products-heading">
        <h2 id="products-heading" className="mb-4">
          Our Products
        </h2>
        <div className="product-toolbar p-3 p-md-4 mb-4">
          <Form
            className="row g-3 align-items-end"
            role="search"
            aria-label="Filter products"
          >
            <div className="col-12 col-md-6">
              <Form.Label htmlFor="product-search">Search products</Form.Label>
              <Form.Control
                id="product-search"
                type="search"
                placeholder="Search by title or description"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            <div className="col-12 col-md-4">
              <Form.Label htmlFor="category-filter">Category</Form.Label>
              <Form.Select
                id="category-filter"
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                <option value="all">All categories</option>
                {CATEGORY_OPTIONS.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="col-12 col-md-2 d-grid">
              <Button variant="outline-dark" onClick={handleClearFilters}>
                Clear
              </Button>
            </div>
          </Form>
          <p className="mt-3 mb-0 text-muted">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>
        <Row>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Col
                key={product.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-4"
              >
                <ProductCard
                  product={product}
                  formatPrice={formatPrice}
                  onViewDetails={(productId) =>
                    navigate(`/products/${productId}`)
                  }
                />
              </Col>
            ))
          ) : (
            <Col>
              <div className="product-empty p-4 p-md-5 text-center">
                <h3 className="h4 mb-2">No products match your filters</h3>
                <p className="text-muted mb-3">
                  Try a different search term or clear the filters to see the
                  full catalog.
                </p>
                <Button variant="dark" onClick={handleClearFilters}>
                  Clear filters
                </Button>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </AsyncStatus>
  );
}

export default ProductList;
