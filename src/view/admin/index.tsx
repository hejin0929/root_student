import { useStore } from '@/store/auth';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import AdminStore from './index.store';


const Admin: FC = () => {
    const store = useStore(AdminStore);
    
    return <div>管理页面</div>
}

export default observer(Admin)