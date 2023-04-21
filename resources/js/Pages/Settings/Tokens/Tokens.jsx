import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TokensList from './Partials/TokensList';
import CreateTokenForm from './Partials/CreateTokenForm';
import { Head } from '@inertiajs/react';

export default function Tokens({ auth, tokens, newToken }) {

    return (
        <AuthenticatedLayout
            className='page-tokens'
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">API Keys</h2>}
        >
            <Head title="API Keys" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <TokensList
                            tokens={tokens}
                            newToken={newToken}
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <CreateTokenForm
                            className="max-w-xl"
                        />
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
