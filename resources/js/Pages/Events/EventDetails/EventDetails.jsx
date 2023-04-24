import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import EventSummary from './Partials/EventSummary';

export default function EventDetails(props) {
    const { auth, event } = props;
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Event #{event.id}</h2>}
        >
            <Head title={`Event #${event.id}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">

                        <EventSummary event={event} />

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
