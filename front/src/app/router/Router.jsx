import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "/src/shared/layout/Layout"
import Categories from "/src/widget/categories/Categories";
import CategoryCard from "/src/widget/category/CategoryCard";
import { CATEGORIES_PATH, CATEGORY_PATH } from "/src/const/path/PagePaths";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                    <Route path={CATEGORIES_PATH} element={<Categories/>}/>
                    <Route path={CATEGORY_PATH} element={<CategoryCard/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;
