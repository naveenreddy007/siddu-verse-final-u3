const CinematicVignetteSection = ({ vignettes, scrollYProgress }) => {
  return (
    <section className="relative h-screen w-full">
      {vignettes &&
        vignettes.map((vignette, index) => (
          <div
            key={index}
            className="absolute top-0 left-0 h-full w-full"
            style={{
              opacity: scrollYProgress >= vignette.start && scrollYProgress <= vignette.end ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <div className="relative h-full w-full">
              <img
                src={vignette.imageUrl || "/placeholder.svg"}
                alt={vignette.altText}
                className="object-cover object-center h-full w-full"
              />
              <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 text-white">
                <h3 className="text-xl font-bold">{vignette.title}</h3>
                <p>{vignette.description}</p>
              </div>
            </div>
          </div>
        ))}
    </section>
  )
}

export default CinematicVignetteSection
