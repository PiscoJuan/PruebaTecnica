import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { increment, reset } from '../context/actions/threeTimesAction.tsx';
import { AppDispatch, RootState } from '../context/store.tsx';


export const useLoginAttempts = () => {
    const dispatch = useDispatch<AppDispatch>();
    const count = useSelector((state: RootState) => state.threeTimes.count);
    const [esperar, setEsperar] = useState<boolean>(false);

    useEffect(() => {
        if (count >= 3) {
            setEsperar(true);
            Alert.alert('Demasiados intentos', 'Espere 1 minuto y para seguir intentando.');
            const timer = setTimeout(() => {
                setEsperar(false);
                dispatch(reset());
            }, 60000);
            return () => clearTimeout(timer);
        }
    }, [count, dispatch]);

    const incrementAttempt = () => {
        dispatch(increment());
    };

    return { esperar, incrementAttempt };
};
