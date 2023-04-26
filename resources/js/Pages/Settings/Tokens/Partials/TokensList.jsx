import _ from 'lodash';
import Table from '@/Components/Table';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import moment from 'moment';

export default function TokensList({ tokens, newToken, className = '' }) {

    const [confirmingTokenDeletion, setConfirmingTokenDeletion] = useState(false);

    const { setData, delete: destroy, errors, processing } = useForm({
        token: '',
    });

    // Update request data when confirming token deletion
    useEffect(() => {
        setData('token', confirmingTokenDeletion);
    }, [confirmingTokenDeletion]);

    const deleteToken = () => {
        destroy(route('tokens.destroy'), { 
            preserveScroll: true,
            onSuccess: () => setConfirmingTokenDeletion(false),
        });
    };

    const renderDeleteBtn = (token) => {
        return (
            <button
                onClick={() => setConfirmingTokenDeletion(token.id)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-red-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                {renderDeleteModal(token)}
            </button>
        );
    };

    const renderDeleteModal = (token) => (
        <Modal show={confirmingTokenDeletion === token.id}>
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Are you sure you want to delete this token?
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once you delete this token you will not be able to restore it and all API requests using this token will stop working.
                </p>

                <InputError className="mt-2" message={errors.token} />

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={() => setConfirmingTokenDeletion(false)}>Cancel</SecondaryButton>

                    <DangerButton className="ml-3" 
                        disabled={processing}
                        onClick={() => deleteToken()}
                    >
                        Delete Token
                    </DangerButton>
                </div>
            </div>
        </Modal>
    );

    const renderTokens = () => {
        return (
            <div className="w-100 overflow-x-auto">
                <Table 
                    className="rounded-lg overflow-hidden"
                    heads={['Name', 'Key', 'Created', 'Last Used', '']}
                    rows={tokens.map((token) => {
                        const tokenText = newToken && newToken.id === token.id
                            ? <span className='select-all dark:bg-gray-900 rounded-lg p-3 px-5 border-blue-300 border-2'>{newToken.token}</span>
                            : token.token_hint;
                        return [
                            token.name,
                            tokenText,
                            moment(token.created_at).format('D MMMM YYYY'),
                            token.last_used_at 
                                ? moment(token.last_used_at).format('D MMMM YYYY')
                                : 'Never used',
                            renderDeleteBtn(token)
                        ]
                    })}
                />
            </div>
        )
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Your API Keys</h2>
            </header>

            <div className="mt-6 space-y-6">

                {tokens && tokens.length > 0 && renderTokens()}

                {tokens && tokens.length === 0 && (
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-700 sm:rounded-lg">
                        <div className="flex items-center space-x-4">
                            <p className="text-sm text-gray-500 dark:text-gray-400">You have not created any API keys.</p>
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
}
