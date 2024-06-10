import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../../Images/icons/Logomark_1_.png";
import "./SignIn.css";

const SignIn: React.FC = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "RU"
  );

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Некорректный адрес электронной почты")
      .matches(/@/, "Адрес электронной почты должен содержать символ '@'")
      .required("Введите адрес электронной почты"),
    password: Yup.string().required("Введите пароль"),
  });

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    console.log(values);
    setSubmitting(false);
  };

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <div className="signin">
      <div className="signin__center">
        <div className="signin__center-img">
          <img src={logo} alt="Логотип" />
        </div>
        <span className="signin__center-title">
          {language === "RU" ? "Войти" : "Signin"} Sirius Future
        </span>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="signin__center-form">
            <Field type="email" name="email" placeholder="E-mail" />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />
            <Field
              type="password"
              name="password"
              placeholder={`${language === "RU" ? "Пароль" : "Password"}`}
            />
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />
            <div className="signin__center-form__label">
              <Field type="checkbox" name="rememberMe" id="rememberMe" />
              <label htmlFor="rememberMe">
                {language === "RU" ? "Запомнить меня" : "Remember me"}
              </label>
            </div>
            <button type="submit">
              {language === "RU" ? "Войти" : "Sign In"}
            </button>
          </Form>
        </Formik>
        <div className="signin__center-saved">
          <a href="">
            {language === "RU" ? "Забыли пароль?" : "Forgot Password?"}
          </a>
          <a href="">
            {language === "RU" ? "Войти как тренер" : "Sign in as Trainer"}
          </a>
        </div>
        <div className="signin__center-forgot">
          <a href="">
            {language === "RU" ? "Нет аккаунта?" : "Don't have an account?"}
          </a>
          <a href="">{language === "RU" ? "Зарегистрироваться" : "Register"}</a>
        </div>
        <div className="signin__center-language">
          <button
            className={
              language === "RU" ? "signin__center-language__button--active" : ""
            }
            onClick={() => changeLanguage("RU")}
          >
            RU
          </button>
          <button
            className={
              language === "EN" ? "signin__center-language__button--active" : ""
            }
            onClick={() => changeLanguage("EN")}
          >
            EN
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
