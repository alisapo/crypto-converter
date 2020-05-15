import { observable, computed, action } from 'mobx';
import { TCoin, TSelectedCurrency } from '../types';

class ConverterStore {

    @observable private selectedCurrency: TSelectedCurrency = {
        name: '',
        price: 0,
    };

    @computed
    get getSelectedCurrency() {
        return this.selectedCurrency;
    };

    @action
    setSelectedCurrency(coin: TCoin) {
        this.selectedCurrency = {
            name: coin.name,
            price: coin.price,
        };
    };
}

export default ConverterStore;