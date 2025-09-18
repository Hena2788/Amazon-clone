import { ClipLoader } from "react-spinners";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <ClipLoader color="#37d7b7" />
    </div>
  );
};

export default Loader;
