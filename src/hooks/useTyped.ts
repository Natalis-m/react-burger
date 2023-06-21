import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../services/store';
import { RelativeRoutingType, To } from 'react-router-dom';

// export interface NavigateFunction {
//   (
//     to: To,
//     options?: {
//       replace?: boolean;
//       state?: any;
//       relative?: RelativeRoutingType;
//     }
//   ): void;
//   (delta: number): void;
// }

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
