import { Bars } from "react-loader-spinner";
import styles from "./LoadingScreenStyle.module.css";

export default function LoadingScreen() {
  return (
    <div className={styles.page}>
      <Bars
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
