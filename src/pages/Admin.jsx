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
        <ProductDetail
          serverIsWork={serverIsWork}
          uplo={uplo}
          setUplo={setUplo}
          tableNumber={1}
          cabine={true}
        />
        <ProductDetail
          serverIsWork={serverIsWork}
          uplo={uplo}
          setUplo={setUplo}
          tableNumber={2}
          cabine={true}
        />
        {[3, 4, 5, 6, 7, 8, 9, 10, 11].map((tableNumber) => (
          <ProductDetail
            serverIsWork={serverIsWork}
            key={tableNumber}
            uplo={uplo}
            setUplo={setUplo}
            tableNumber={tableNumber}
          />
        ))}
        <ProductDetail
          serverIsWork={serverIsWork}
          uplo={uplo}
          setUplo={setUplo}
          tableNumber={12}
          cabine={true}
        />
        <ProductDetail
          serverIsWork={serverIsWork}
          uplo={uplo}
          setUplo={setUplo}
          tableNumber={13}
          cabine={true}
        />
      </section>
    </div>
  );
};

export default Admin;
