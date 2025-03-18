import { Link } from "react-router";
import bgImage from "../assets/homepage-bg.jpg";

function HomePage() {
  return (
    <div
      className="w-screen h-screen bg-cover bg-right-bottom md:bg-left lg:bg-center bg-blend-multiply bg-black/45"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <main className="max-w-screen-2xl h-full mx-auto">
        <div className="h-full max-w-xl  mx-auto flex items-center justify-center flex-col text-white">
          <div className="text-center space-y-5">
            <h1 className="md:text-4xl text-2xl font-bold font-rubik">
              Welcome to HandsOn
            </h1>
            <p className="text-lg w-11/12 mx-auto px-3 font-poppins">
              Connect, volunteer, and make an impact—because changing the world
              starts with a helping hand! 🌍💙
              <br className="mb-4" />
              Discover meaningful opportunities, lend your skills, and be part
              of a community that cares. 🤝✨
            </p>
          </div>
          <div className="space-x-3 text-lg mt-7">
            <Link
              to="/login"
              className="font-semibold bg-accent text-black hover:bg-secondary hover:text-white px-5 py-1  rounded-lg transition duration-300 ease-in-out text-center"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="font-semibold text-black bg-accent hover:bg-secondary hover:text-white px-5 py-1 rounded-lg transition duration-300 ease-in-out text-center"
            >
              Sign up
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
