import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import Store from "./index.store"; // 本页面store
import { useStore } from "@store/auth";

const Login: FC = () => {

    const store: Store = useStore(Store);

    return <div>
        登陆页
        <div onClick={()=> store.handleTest()}>点击出发api</div>
    </div>
}
 
export default observer(Login);