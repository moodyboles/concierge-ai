import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Table from '@/Components/Table';

export default function Events(props) {
    const { auth, events } = props;

    const renderEvents = () => {
        return (
            <div className="w-100 overflow-x-auto">
                <Table 
                    className="rounded-lg overflow-hidden"
                    heads={['id', 'Type', 'Occasion', 'Cuisines', 'Diets', 'Access Key', '']}
                    rows={events.map((event) => {
                        return [
                            event.id,
                            event.formatted_type,
                            event.formatted_occasion,
                            event.formatted_cuisines,
                            event.formatted_diets,
                            event.token?.name ?? 'GUI',
                            <Link href={route('events.show', event.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </Link>
                        ]
                    })}
                />
            </div>
        );
    }
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">My Events</h2>}
        >
            <Head title="My Events" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">

                        <header>
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-6">My Event</h2>
                        </header>

                        {events && events.length > 0 && renderEvents()}

                        {events && events.length === 0 && (
                            <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-700 sm:rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">You have not created any events yet.</p>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
