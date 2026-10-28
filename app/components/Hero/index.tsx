const Hero = () => {
  return (
    <div className="mx-auto max-w-6xl xl:w-full px-6 pt-8">
      <div className="flex flex-col justify-center h-60 p-14 bg-soft-blue text-accent font-fredoka rounded-xl">
        <h1 className="text-4xl lg:text-5xl font-bold">
          Let's make <span className="text-accent-yellow">togather!</span> :)
        </h1>
        <h2 className="font-poppins mt-3 max-w-lg text-sm lg:text-lg ">
          Here is the showcase for beginner developers. Post your app, get
          feedback from seniors.
        </h2>
      </div>
    </div>
  );
};

export default Hero;
