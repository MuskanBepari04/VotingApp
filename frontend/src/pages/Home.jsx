import Button from "../components/Button";

const Home = () => {
  return (
    <div className="sm:flex sm:justify-center sm:items-center">
      <div className="max-h-screen flex flex-col">
        <div className="mx-auto ">
          <img
            src="../images/vote3.jpg"
            alt=""
            className="h-96 sm:h-[25%] w-full object-contain sm:object-cover"
          />
        </div>
        <p className="text-3xl mx-auto text-center">
          Cast Your Vote , Safe Your Future
        </p>
        <div className="flex gap-12 self-center mt-5">
          <Button to={"/auth/signup"} text="Signup" />
          <Button to={"/auth/login"} text="Login" />
        </div>
      </div>
    </div>
  );
};

export default Home;
