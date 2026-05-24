import Container from "react-bootstrap/Container";

function Footer() {
  return (
    <footer
      style={{
        background:
          "linear-gradient(135deg, rgba(9, 78, 72, 0.92), rgba(7, 99, 87, 0.82))",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 -10px 30px rgba(9, 78, 72, 0.28)",
        color: "#f9fafb",
        marginTop: "4rem",
        padding: "2rem 0",
      }}
    >
      <Container className="text-center">
        <p
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: "1.2rem",
            marginBottom: "0.5rem",
            color: "#ffffff",
          }}
        >
          FakeStore
        </p>
        <p
          style={{
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.65)",
            marginBottom: "0",
          }}
        >
          © {new Date().getFullYear()} FakeStore. Built with React &
          FakeStoreAPI.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
