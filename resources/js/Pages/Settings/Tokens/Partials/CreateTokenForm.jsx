import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import React, { useEffect } from "react";
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function CreateTokenForm({ className = '' }) {

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: '',
    });

    // Clear the name field when the form is successfully submitted.
    useEffect(() => {
        setData('name', '');
    }, [recentlySuccessful]);

    const submit = (e) => {
        e.preventDefault();
        post(route('tokens.store'), { preserveScroll: true });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Create New Key</h2>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Token Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        placeholder="E.g. personal or organization name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Create</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">Created.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
