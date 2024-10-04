import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Toast, { notifySuccess } from "../features/ui/Toast";
import { resendOtp, verifyOtp } from "../features/users/userSlice";
import ErrorPage from "./ErrorPage";

function OtpVerification() {
  // OTP state'inin tanımlanması ve sansürlenmiş mail adresinin alınması
  const bluredMail = localStorage.getItem("bluredMail");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // OTP inputlarındaki değişikliklerin takip edilmesi
  const handleChange = (e, index) => {
    const value = e.target.value;
    const newOtp = [...otp];
    newOtp[index] = value;

    // OTP state'ini güncelle
    setOtp(newOtp);
    // Değer sadece bir karakterse (örneğin 0-9) bir sonraki inputa geç
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // OTP'nin doğrulanması
  async function handleSubmit() {
    const otpValue = otp.join(""); // Tüm input değerlerinin birleştirip tek bir string haline getirilmesi

    const result = await dispatch(verifyOtp(otpValue)); // Redux'taki verifyOtp fonksiyonuyla OTP'nin doğrulanması
    const id = localStorage.getItem("id");
    if (result) navigate("/profile/" + id); // OTP doğrulama işlemi başarılıysa kullanıcı profil sayfasına yönlendir
  }

  // OTP'nin yeniden gönderilmesi
  async function handleResendOtp() {
    const result = await dispatch(resendOtp()); // Redux'taki resendOtp fonksiyonuyla OTP'nin yeniden gönderilmesi
    if (result) {
      notifySuccess("Otp resent successfully");
    }
  }

  // Eğer mail adresi yoksa hata sayfasına yönlendir; bu durumda kullanıcı LDAP ile giriş yapmamış demektir.
  if (!bluredMail)
    return (
      <ErrorPage
        code={403}
        header={"Access Denied"}
        message={
          "You need to enter your username and password before accessing the OTP validation page. Please go back and provide your credentials to proceed."
        }
      />
    );

  return (
    <>
      <Toast />
      {/* OTP doğrulama sayfasının tasarımı */}
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-0 pt-10 pb-9 shadow-xl mx-auto w-full max-w-2xl rounded-2xl">
          <div className="mx-auto flex w-full max-w-xl flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email {bluredMail}</p>
              </div>
            </div>

            <div>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-lg">
                  {/* OTP Inputs */}
                  {otp.map((_, index) => (
                    <div className="w-14 h-14 " key={index}>
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        ref={(el) => (inputRefs.current[index] = el)}
                        onChange={(e) => handleChange(e, index)}
                        maxLength={1} // Tek karakter girişi
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-row justify-between space-x-5 mx-10">
                  <button
                    className="w-1/2 px-6 py-2 text-md font-semibold transition duration-500 text-stone-100 bg-sky-700 rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-800 focus:ring-offset-2 cursor-pointer"
                    onClick={() => navigate(-1)}
                  >
                    Go Back
                  </button>
                  <button
                    className="w-1/2 disabled:cursor-not-allowed px-6 py-2 text-md font-semibold transition duration-500 text-stone-100 bg-sky-700 rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-800 focus:ring-offset-2 cursor-pointer disabled:bg-sky-600"
                    onClick={handleSubmit}
                    disabled={otp.includes("")}
                  >
                    Verify Account
                  </button>
                </div>

                <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                  <p>Did not receive code?</p>
                  <button
                    onClick={handleResendOtp}
                    className="flex flex-row items-center text-blue-600"
                  >
                    Resend
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OtpVerification;
