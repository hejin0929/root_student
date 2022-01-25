import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import StyleCss from './index.module.scss';


const Loading: FC = () => {
    return <div className={StyleCss.LoadingBox}> 
            
    </div>
}

export default observer(Loading);