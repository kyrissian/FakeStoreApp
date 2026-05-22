import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function ProductCard({ product, onViewDetails, formatPrice }) {
  return (
    <Card className="h-100 product-card">
      <div className="product-card__image-wrap">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="product-card__image"
        />
      </div>
      <Card.Body className="d-flex flex-column product-card__body">
        <div className="product-card__content">
          <Card.Title className="product-card__title">
            {product.title}
          </Card.Title>
        </div>
        <div className="product-card__meta">
          <Card.Text className="product-card__price mb-2">
            <strong>${formatPrice(product.price)}</strong>
          </Card.Text>
          <Button
            variant="dark"
            onClick={() => onViewDetails(product.id, product.title)}
            aria-label={`View details for ${product.title}`}
          >
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
