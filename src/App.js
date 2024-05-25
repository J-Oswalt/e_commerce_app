import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import ProductsListPage from "./pages/ProductsListPage";
import categories from "./categories";
import users from "./users";
import LoginPage from "./pages/LoginPage";
import UserProfilePage from "./pages/UserProfilePage";

const App = () => {
  const loggedIdUser = JSON.parse(sessionStorage.getItem('loggedInUser'))
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          {loggedIdUser && <ProductsListPage />}
          {loggedIdUser &&  !loggedIdUser.isAdmin && <UserProfilePage></UserProfilePage>}
          {!loggedIdUser && <LoginPage />}
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
