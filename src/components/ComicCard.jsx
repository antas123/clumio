import React from "react";
import styles from './Comics.module.css'

const ComicCard = ({data}) => {
  return <div className={styles.cardContainer}>
    <div>
    <img src={data?.thumbnail?.path + "." + data?.thumbnail?.extension } alt="" height={250} width={220} />
    </div>
    <div>
      <h5>{data?.title}</h5>
    </div>
  </div>;
};

export default ComicCard;
