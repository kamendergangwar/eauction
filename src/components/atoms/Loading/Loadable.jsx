import { Suspense } from 'react';
import Loading from './Loading';

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Loading isOpen={true}/>}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
