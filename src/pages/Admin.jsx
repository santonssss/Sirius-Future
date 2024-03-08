import React from "react";
import ProductDetail from "../Component/ProductDetail";
import { Link } from "react-router-dom";

const Admin = ({ serverIsWork, uplo, setUplo }) => {
  return (
    <div className="be-adm">
      <div className="kleym-c">
        <Link className="to-s" to={"/admin-panel"}>
          Посмотреть статистику
        </Link>
      </div>
      <section>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((tableNumber) => (
          <ProductDetail
            serverIsWork={serverIsWork}
            key={tableNumber}
            uplo={uplo}
            setUplo={setUplo}
            tableNumber={tableNumber}
          />
        ))}
      </section>
    </div>
  );
};

export default Admin;
