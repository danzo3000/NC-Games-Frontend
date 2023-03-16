import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../utils/api";

const CategorySort = ({ setIsLoadingReviews }) => {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getCategories().then((categories) => {
      setCategoryList(categories);
    });
  }, [setIsLoadingReviews]);

  return (
    <div>
      <h2 className="introText">
        Welcome to NC Games Review! To get started, select a category or view
        all our reviews below!
      </h2>
      <ul className="categoryList">
        {categoryList.map((category) => {
          return (
            <li className="categoryItem" key={category.slug}>
              <Link to={`/categories/${category.slug}`}>
                View {category.slug} games
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategorySort;
