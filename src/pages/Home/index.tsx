import styles from './index.module.less';
import { SvgIcon } from '@/common';
import { throttle } from 'lodash';
import { Button } from 'antd';

function Home() {
  const handleClick = () => {};
  return (
    <div className={styles.container} onClick={throttle(handleClick)}>
      Hello World
      <Button>123123</Button>
      <SvgIcon name={'react'}></SvgIcon>
    </div>
  );
}

export default Home;
