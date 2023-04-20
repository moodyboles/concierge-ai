import InputError from '@/Components/InputError';
import Checkbox from '@/Components/Checkbox';
import _ from 'lodash';

export default function CheckboxList({ options, selected, select }) {

    const isSelected = (name) => {
        return _.includes(selected, name);
    }

    const toggleSelect = (name) => {
        if (isSelected(name)) {
            select(_.without(selected, name));
        } else {
            select(_.concat(selected, name));
        }
    }

    return (
        _.map(options, (value, name) => {
            return (
                <label className="items-center" key={name}>
                    <Checkbox
                        name={name}
                        checked={isSelected(name)}
                        onChange={() => toggleSelect(name)}
                    />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{value}</span>
                </label>
            );
        })
    );
}
