function Footer() {
  return (
    <div>
      <footer>{currentYear} - Timothée and Leo</footer>
    </div>
  );
}

const currentYear = new Date().getFullYear();

export default Footer;