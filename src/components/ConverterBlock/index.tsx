import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';

import { observer, inject } from 'mobx-react';
import CurrenciesStore from '../../stores/CurrenciesStore';
import ConverterStore from '../../stores/ConverterStore';

import { TSelectedCurrency } from '../../types';

type IConverterBlock = {
    classes: any;
    currenciesStore?: CurrenciesStore;
    converterStore?: ConverterStore;
};

type TState = {
    value1: string;
    value2: string;
    inPrice: number;//TSelectedCurrency;
    outPrice: number;
};

type TVAction = {
    type: string;
    payload: string;
};

type TAct = TVAction;

function reducer(state: TState, action: any): TState {
    switch (action.type) {
        case 'SET_VALUE':
            return {
                ...state,
                [action.payload.name]: action.payload.value,
                value2: String((Number(action.payload.value) * state.inPrice) / state.outPrice),
            };
        case 'SET_PRICES':
            return {
                ...state,
                inPrice: action.payload.in,
                outPrice: action.payload.out,
            };
        default:
            return state;
    }
}

const ConverterBlock: React.FC<IConverterBlock> = inject(
    'currenciesStore',
    'converterStore'
)(
    observer(({ classes, currenciesStore, converterStore }) => {
        const [selectedOutCurrency, setSelectedOutCurrency] = React.useState('USD');
        const coins: string[] = currenciesStore!.getItems.map(coin => coin.name);
        const inPrice = Number(converterStore?.getSelectedCurrency.price);
        const outPrice = Number(currenciesStore!.getItems.find(obj => obj.name === selectedOutCurrency)?.price);
        const [state, dispatch] = React.useReducer(reducer, {
            value1: '',
            value2: '',
            inPrice,
            outPrice,
        });
        
        React.useEffect(() => {
            dispatch({
                type: 'SET_PRICES',
                payload: {
                    in: inPrice,
                    out: outPrice,
                },
            });
        }, [inPrice, outPrice]);

        const onUpdateField = (name: string, value: string) => {
            dispatch({
                type: 'SET_VALUE',
                payload: {
                    name,
                    value,
                },
            })
        };

        return (
            <Paper className={classes.paper}>
                <div className={classes.inputCrBox}>
                    <FormControl className={classes.currencyInput}>
                        <TextField
                            type='number'
                            value={state.value1}
                            label="Сумма"
                            onInput={(e: any) => onUpdateField('value1', e.target.value)}
                        />
                    </FormControl>
                    <FormControl className={classes.currencyType}>
                        <InputLabel>
                            Валюта
                </InputLabel>
                        <Select value={converterStore?.getSelectedCurrency.name || ''}>
                            {coins.map(name => <MenuItem value={name}>{name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
                <div className={classes.inputCrBox}>
                    <FormControl className={classes.currencyInput}>
                        <TextField
                            type='number'
                            value={state.value2}
                            label="Сумма"
                        />
                    </FormControl>
                    <FormControl className={classes.currencyType}>
                        <InputLabel>
                            Валюта
                </InputLabel>
                        <Select
                            onChange={e => setSelectedOutCurrency(e.target.value as string)}
                            value={setSelectedOutCurrency}
                        >
                            <MenuItem value="USD">USD</MenuItem>
                            {coins.map(name => <MenuItem value={name}>{name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
            </Paper>
        )
    }))

export default ConverterBlock;

// {/* <MenuItem value="EUR">EUR</MenuItem>
//     <MenuItem value="RUR">RUR</MenuItem>
//     <MenuItem value="GBR">GBR</MenuItem> */}