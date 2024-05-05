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
  const { data: carouselData } = useQuery({
    queryKey: ["heroesOnCarousel"],
    queryFn: fetchCarouselHeroes,
  });

  useEffect(() => {
    setHeroesForCarousel(carouselData?.data?.results);
  }, [carouselData]);

  return (
    <>
      <Carousel
        searchTerm={searchTerm}
        heroesForCarousel={heroesForCarousel}
        selectedHeroesList={selectedHeroesList}
        setSelectedHeroesList={setSelectedHeroesList}
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
