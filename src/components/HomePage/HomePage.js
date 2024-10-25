import Header from "./Header"
import Search from "./Search"
import ImageBoard from "./ImageBoard"
import FoodCategory from "./FoodCategory"
import { Container } from "react-bootstrap"
const HomePage = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <Container fluid>

                <div>
                    <Search />
                </div>
                <div>
                    <ImageBoard />
                </div>
                <div>
                    <FoodCategory />
                </div>
            </Container>
        </>


    )
}
export default HomePage