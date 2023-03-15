import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../utils/api";

const CategorySort = () => {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getCategories().then((categories) => {
      setCategoryList(categories);
    });
  }, []);
  return (
    <div>
      <h2>
        To get started, click to search by category or you can view all reviews
        below
      </h2>
      <ul className="categoryList">
        {categoryList.map((category) => {
          return (
            <li className="categoryItem" key={category.slug}>
              <Link to={`/categories/${category.slug}`}>
                <p>View {category.slug} games</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategorySort;
