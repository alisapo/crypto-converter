import React from 'react';
import { observer, inject } from 'mobx-react';
import CurrenciesStore from '../../stores/CurrenciesStore';
import ConverterStore from '../../stores/ConverterStore';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';
import { TCoin, TCoinDiff } from '../../types';


type ICryptoTable = {
    classes: any;
    currenciesStore?: CurrenciesStore;
    converterStore?: ConverterStore;
};

const CryptoTable = inject('currenciesStore', 'converterStore')(
    observer(({ classes, currenciesStore, converterStore }: ICryptoTable) => {
        const items: TCoin[] = currenciesStore!.getItems;
        const diffObj: TCoinDiff = currenciesStore!.getDiffObj;

        React.useEffect(() => {
            if (currenciesStore) {
                currenciesStore.fetchCoins();
                setInterval(() => {
                    currenciesStore.fetchCoins();
                }, 30 * 1000);
            }
        }, [currenciesStore]);

        const onClickRow = (coin: TCoin) => {
            if (converterStore) {
                converterStore.setSelectedCurrency(coin);
            }
        };

        return (
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Full name</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Vol. 24 h</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!items.length ? 'Loading...' : items.map((coin: TCoin) => (
                            <TableRow
                                onClick={() => onClickRow(coin)}
                                className={classes.tRow}
                                hover
                                key={coin.name}
                            >
                                <TableCell>
                                    <img className={classes.currencyIcon}
                                        src={coin.imageUrl} alt="Coin icon"
                                    />
                                </TableCell>
                                <TableCell align="left">{coin.name}</TableCell>
                                <TableCell align="left">{coin.fullName}</TableCell>
                                <TableCell
                                    className={diffObj[coin.name] && classes[`${diffObj[coin.name]}`]}
                                    align="left"
                                >
                                    ${coin.price}
                                </TableCell>
                                <TableCell align="left">${coin.v24h}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>)
    }))

export default CryptoTable;