import React, { useState } from 'react'
// import './style.scss'

function FormLogin() {
    let [msg, setMsg] = useState("");
    let [status, setStatus] = useState(0);
    let [isDisable, setIsDisable] = useState(false);
    let [isLogin, setIsLogin] = useState(false);

  return (
    <div className="content_wrapper">
      <div className="login-wrapper">
        <h1 className="box-title text-center">
            {/* {t('content.title')} */}
            Title
        </h1>
        <div className="form-login">
          <form >
            <div className="form__group field">
              <input
                type="input"
                className="form__field"
                placeholder="Email*"
                name="email"
                id="email"
                required
              />
              <label htmlFor="email" className="form__label">
              {/* {t('content.title__email')} */}
              Email
              </label>
            </div>
            <div className="form__group field">
              <input
                type="password"
                className="form__field"
                placeholder="Password*"
                name="password"
                id="password"
                required
              />
              <label htmlFor="password" className="form__label">
              {/* {t('content.title__password')} */}
              Password
              </label>
            </div>
            <div className="form-footer">
              <div className="text-center pt-3">
                {status != 0 ? (
                  <div className="d-block border border-danger text-danger p-3 my-2" style={{backgroundColor: 'rgba(255, 82, 82, 0.03)', fontSize: '15px'}}>
                    {/* {t('content.error')} */}
                    errors
                  </div>
                ) : (
                  ""
                )}
              </div>
              {true ? (
                <button
                  type="submit"
                  className="w-100 btn-login"
                //   disabled={!isValid}
                >
                  {/* {t('content.button-login')} */}
                  Login
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-100 btn-login primary text-white"
                //   disabled={!isValid}
                >
                  {/* {t('content.button-login')} */}
                  Login
                </button>
              )}
              <div className="text-center">
                <a className="link-forget" href="#">
                {/* {t('content.link__forgot-password')} */}
                forgot?
                </a>
              </div>
              {/* <ChooseLanguage/> */}
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default FormLogin