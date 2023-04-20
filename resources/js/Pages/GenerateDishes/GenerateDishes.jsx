import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EventForm from './Partials/EventForm';
import { Head } from '@inertiajs/react';

export default function GenerateDishes(props) {
    const { auth } = props;
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Generate Dishes</h2>}
        >
            <Head title="Generate Dishes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <EventForm
                            {...props}
                            className="max-w"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
