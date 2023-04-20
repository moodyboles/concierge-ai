import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import CheckboxList from '@/Components/CheckboxList';
import SelectBox from '@/Components/SelectBox';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import _ from 'lodash';

export default function EventForm(props) {
    const { className, cuisines, occasions, diets, types } = props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        type: '',
        occasion: '',
        cuisines: [],
        diets: [],
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('generate.dishes'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Event Information</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Let us know more about your event to be able to generate dishes.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <div className='grid grid-cols-2 gap-5'>
                        <div>
                            <InputLabel htmlFor="type" value="Type" />

                            <SelectBox
                                options={types}
                                selected={data.type}
                                select={(value) => setData('type', value)}
                                className="mt-2 block w-full"
                                isFocused
                                required
                            />

                            <InputError className="mt-2" message={errors.type} />
                        </div>
                        <div>
                            <InputLabel htmlFor="occasion" value="Occasion" />

                            <SelectBox 
                                options={occasions} 
                                selected={data.occasion}
                                select={(value) => setData('occasion', value)}
                                className="mt-2 block w-full"
                                required
                            />

                            <InputError className="mt-2" message={errors.occasion} />
                        </div>
                    </div>
                </div>

                <div>
                    <InputLabel htmlFor="cuisines" value="Cuisines" />

                    <div className='grid grid-cols-4 gap-2 mt-2'>
                        <CheckboxList 
                            options={cuisines} 
                            selected={data.cuisines}
                            select={(value) => setData('cuisines', value)}
                        />
                    </div>

                    <InputError className="mt-2" message={errors.cuisines} />
                </div>
                
                <div>
                    <InputLabel htmlFor="diets" value="Diets" />

                    <div className='grid grid-cols-4 gap-2 mt-2'>
                        <CheckboxList
                            options={diets}
                            selected={data.diets}
                            select={(value) => setData('diets', value)}
                        />
                    </div>

                    <InputError className="mt-2" message={errors.diets} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Generate Dishes</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
