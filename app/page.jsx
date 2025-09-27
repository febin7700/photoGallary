import ImageGallery from "./components/ImageGallery";

export default function Home() {
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0",fontFamily:"italic" }}>
        Grace & Glow
      </h1>
      <ImageGallery />
    </div>
  );
}
