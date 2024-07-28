import { useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrcode, setQRcode] = useState("");
  const [qrsize, setQRsize] = useState("");

  async function generatorQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(
        qrcode
      )}`;

      setImage(url);
    } catch (error) {
      console.error(`Error generating for QR code ${error}`);
    } finally {
      setLoading(false);
    }
  }

  function downloadQR() {
    fetch(image)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "QRcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error(`Error for download ${error}`);
      });
  }

  return (
    <div className="container">
      <h2>qr code generator</h2>
      {loading && <p>Please Wait...</p>}
      {image && <img src={image} alt="Qr-code" />}
      <div className="input-container">
        <label htmlFor="dataInput">Data for QR code:</label>
        <input
          type="text"
          id="dataInput"
          placeholder="Enter data for QR code"
          onChange={(e) => setQRcode(e.target.value)}
        />
        <label htmlFor="sizeInput">Size for QR code(eg., 150):</label>
        <input
          type="text"
          id="sizeInput"
          placeholder="Enter the size"
          onChange={(e) => setQRsize(e.target.value)}
        />
      </div>
      <div className="buttons">
        <button className="generator" onClick={generatorQR} disabled={loading}>
          Generator QR code
        </button>
        <button className="download" onClick={downloadQR}>
          Download QR code
        </button>
      </div>
      <footer>
        designed by <a href="#">sasidaran</a>
      </footer>
    </div>
  );
}

export default App;
