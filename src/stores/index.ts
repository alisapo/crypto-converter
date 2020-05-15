import ConverterStore from './ConverterStore';
import CurrenciesStore from './CurrenciesStore';

const stores = {
    currenciesStore: new CurrenciesStore(),
    converterStore: new ConverterStore(),
}

export default stores;