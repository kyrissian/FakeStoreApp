import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

function HomePage() {
  const navigate = useNavigate();

  return (
    <Container className="py-4 py-md-5">
      <div className="hero-panel p-4 p-md-5 mb-4 mb-md-5">
        <Row className="align-items-center g-4 position-relative">
          <Col lg={7}>
            <div className="hero-badge mb-3">Curated retail playground</div>
            <h1 className="hero-title mb-3">
              Make browsing products feel a lot less plain.
            </h1>
            <p className="hero-copy text-muted mb-4">
              A sharper storefront, richer product cards, and a more polished
              flow make this app feel like something you would actually want to
              shop in.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Button
                variant="dark"
                size="lg"
                onClick={() => navigate("/products")}
              >
                Browse Products
              </Button>
              <Button
                variant="outline-dark"
                size="lg"
                onClick={() => navigate("/add-product")}
              >
                Add a Product
              </Button>
            </div>
            <p
              className="mt-3"
              style={{ fontSize: "0.8rem", color: "var(--muted)" }}
            >
              ⚠️ This app uses FakeStoreAPI, a mock testing API. Your product
              will appear to be created successfully, but the data will not be
              permanently saved.
            </p>
          </Col>

          <Col lg={5}>
            <Card className="hero-card p-4 p-md-4 border-0">
              <Card.Body className="p-0">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <div className="text-uppercase small text-muted">
                      Store pulse
                    </div>
                    <h2 className="mb-0 text-white">Fresh, fast, focused</h2>
                  </div>
                  <div className="stat-pill">
                    <span>★</span>
                    <strong>4.9</strong>
                  </div>
                </div>

                <div className="d-grid gap-3">
                  <div className="stat-pill justify-content-between">
                    <span>Featured categories</span>
                    <strong>4</strong>
                  </div>
                  <div className="stat-pill justify-content-between">
                    <span>Product actions</span>
                    <strong>CRUD-ready</strong>
                  </div>
                  <div className="stat-pill justify-content-between">
                    <span>Price formatting</span>
                    <strong>2 decimals</strong>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      <div className="mb-3">
        <div className="section-label">Why it feels better</div>
        <h2 className="mb-0">
          Small details create a much better first impression.
        </h2>
      </div>

      <Row className="g-3 g-md-4">
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <h3 className="h5">Visual hierarchy</h3>
              <p className="text-muted mb-0">
                Clear hero area, stronger headings, and more breathing room.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <h3 className="h5">More depth</h3>
              <p className="text-muted mb-0">
                Layered backgrounds, glassy surfaces, and richer hover states.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <h3 className="h5">Cleaner flow</h3>
              <p className="text-muted mb-0">
                Better CTA placement and a more deliberate onboarding feel.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
