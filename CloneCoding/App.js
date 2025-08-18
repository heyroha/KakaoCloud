import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import SearchBar from "./components/SearchBar/SearchBar";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <SearchBar />
      </main>
      <Footer />
    </>
  );
}
