function Loader() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5F1FC] dark:bg-[#0A0810]">
      <div className="logo-loader">
        <svg viewBox="0 0 100 100" role="img">
          <path
            className="petal petal-1"
            d="M39.5 25.0A10.5 14 0 1 0 60.5 25.0A10.5 14 0 1 0 39.5 25.0Z"
            fill="#7C6BD4"
          />

          <path
            className="petal drift"
            d="M76.24 30.43A10.5 14 72 1 0 82.73 50.41A10.5 14 72 1 0 76.24 30.43Z"
            fill="#7C6BD4"
            opacity="0.42"
          />

          <path
            className="petal petal-3"
            d="M73.19 64.05A10.5 14 144 1 0 56.2 76.4A10.5 14 144 1 0 73.19 64.05Z"
            fill="#7C6BD4"
          />

          <path
            className="petal petal-4"
            d="M43.8 76.4A10.5 14 216 1 0 26.81 64.05A10.5 14 216 1 0 43.8 76.4Z"
            fill="#7C6BD4"
          />

          <path
            className="petal petal-5"
            d="M22.98 52.26A10.5 14 288 1 0 29.47 32.29A10.5 14 288 1 0 22.98 52.26Z"
            fill="#7C6BD4"
          />

          <circle className="core" cx="50" cy="50" r="8.5" fill="#EFB765" />
        </svg>
      </div>

      <div className="logo-loader-text dark:text-white">
        Creating something awesome...
      </div>

      <div className="logo-loader-tagline dark:text-white">
        “Good things are worth the wait.”
      </div>
    </div>
  );
}

export default Loader;
