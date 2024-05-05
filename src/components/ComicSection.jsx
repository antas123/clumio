import React, { useState, useEffect } from "react";
import styles from "./FilterCarousel.module.css";
import ComicCard from "./ComicCard";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCarouselHeroes,
} from "../utils/helpers";
import Pagination from "./Pagination";
import Carousel from "./Carousel";

const ComicSection = ({
  searchFilteredData,
  searchTerm,
  setSearchTerm,
  pageComicData,
  isPageLoading,
  selectedHeroesList,
  setSelectedHeroesList,
  page,
  setPage,
  pageData,
  setPageData,
  totalPages,
  setTotalpages,
}) => {
  const [heroesForCarousel, setHeroesForCarousel] = useState([]); //used for displaying heroes on carousel
  const [dataFilteredByCarousel, setDataFilteredByCarousel] = useState([]); //to display filtered data , filtered by carousel heroes selection
  const [carouselRightPosition, setCarouselRightPosition] = useState(false)
  const [carouselPage, setCarouselPage] = useState(1)
  const removeFilters = () => {
    setSearchTerm("");
    setDataFilteredByCarousel([]);
    setSelectedHeroesList([]);
    setPageData(pageComicData?.data?.results);
    const numberOfPages = Math.ceil(
      pageComicData?.data?.total / pageComicData?.data?.count
    );
    setTotalpages(numberOfPages);
  };

  //useQuerY for data fetching========================================================================
  const { data: carouselData, isLoading: isCarouselLoading } = useQuery({
    queryKey: ["heroesOnCarousel", carouselRightPosition,carouselPage],
    queryFn: ()=>fetchCarouselHeroes(carouselPage,setCarouselRightPosition),
    // enabled: !carouselRightPosition 
  });

  useEffect(() => {
    if (carouselData?.data?.results) {
      // Spread the new results into heroesForCarousel
      console.log('aaa', heroesForCarousel, carouselData.data.results)
      const newArr = [...heroesForCarousel, ...carouselData.data.results];
      setHeroesForCarousel(newArr);
    }
  }, [carouselData]);

  return (
    <>
      <Carousel
        searchTerm={searchTerm}
        heroesForCarousel={heroesForCarousel}
        selectedHeroesList={selectedHeroesList}
        setSelectedHeroesList={setSelectedHeroesList}
        setCarouselRightPosition={setCarouselRightPosition}
        setCarouselPage={setCarouselPage}
        carouselPage={carouselPage}
        isCarouselLoading={isCarouselLoading}
      />
      <div className={styles.container}>
        {isPageLoading ? (
          <div style={{ height: "100vh", color: "white" }}>
            Loading please wait....
            <div className={styles.loader}></div>
          </div>
        ) : (
          <>
            {pageComicData?.data?.count ? (
              <>
                {" "}
                <Pagination
                  page={page}
                  setPage={setPage}
                  totalPages={totalPages}
                />
                <div className={styles.filterBtn} >
                  <button
                    className={styles.removeFilter}
                    onClick={removeFilters}
                  >
                    remove all filters
                  </button>
                </div>
                <div className={styles.subContainer}>
                  {searchFilteredData
                    ? searchFilteredData?.map((data, index) => (
                        <ComicCard data={data} key={index} />
                      ))
                    : dataFilteredByCarousel
                    ? dataFilteredByCarousel?.map((data, index) => (
                        <ComicCard data={data} key={index} />
                      ))
                    : pageData?.map((data, index) => (
                        <ComicCard data={data} key={index} />
                      ))}
                </div>
                <Pagination
                  page={page}
                  setPage={setPage}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <div style={{color:'white'}} >
                <h2>Sorry!!, we don't have the comic you searched for <br /> please try something else... </h2>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ComicSection;
