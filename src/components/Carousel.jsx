import React, { useRef } from "react";
import styles from "./FilterCarousel.module.css";

const Carousel = ({
  searchTerm,
  heroesForCarousel,
  selectedHeroesList,
  setSelectedHeroesList,
}) => {
  const carouselRef = useRef(null);

  const btnpressprev = () => {
    const box = carouselRef.current;
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft - width;
    console.log(width);
  };

  const btnpressnext = () => {
    const box = carouselRef.current;
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft + width;
    console.log(width);
  };

  const handleHeroSelected = (heroId) => {
    const index = selectedHeroesList.indexOf(heroId);
    if (index === -1) {
      setSelectedHeroesList([...selectedHeroesList, heroId]);
    } else {
      const updatedSelectedHeroes = [...selectedHeroesList];
      updatedSelectedHeroes.splice(index, 1);
      setSelectedHeroesList(updatedSelectedHeroes);
    }
  };

  return (
    <div
      className={styles.filterCarousel}
      style={{
        opacity: searchTerm.length > 0 ? 0.5 : 1,
        cursor: searchTerm.length > 0 ? "not-allowed" : "pointer",
      }}
    >
      <button className={styles.carouselButtonR} onClick={btnpressprev}>
        {"<"}
      </button>
      <div
        className={styles.carousel}
        ref={carouselRef}
        style={{
          opacity: searchTerm.length > 0 ? 0.5 : 1,
          cursor: searchTerm.length > 0 ? "not-allowed" : "pointer",
        }}
      >
        {heroesForCarousel?.map((data, index) => (
          <div
            className={styles.heroOuterContainer}
            key={index}
            onClick={() => handleHeroSelected(data?.id)}
          >
            <div
              className={
                selectedHeroesList.includes(data.id)
                  ? styles.heroImgSelected
                  : styles.heroImgContainer
              }
              style={{
                opacity: searchTerm.length > 0 ? 0.5 : 1,
                cursor: searchTerm.length > 0 ? "not-allowed" : "pointer",
              }}
            >
              <img
                src={data?.thumbnail?.path + "." + data?.thumbnail?.extension}
                alt="hero"
                height={100}
                width={100}
                className={styles.hero}
              />
              <p className={styles.heroName}>{data?.name}</p>
            </div>
          </div>
        ))}
      </div>
      <button className={styles.carouselButtonL} onClick={btnpressnext}>
        {">"}
      </button>
    </div>
  );
};

export default Carousel;
