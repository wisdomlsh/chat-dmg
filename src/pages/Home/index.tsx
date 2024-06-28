import styles from './index.module.less';
import { SvgIcon } from "@/common";

function Home() {
  return (
    <div className={styles.container}>
      <SvgIcon name='react' />
    </div>
  );
}

export default Home
