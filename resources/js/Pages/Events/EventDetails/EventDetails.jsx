import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import EventSummary from './Partials/EventSummary';
import MenuSummary from './Partials/MenuSummary';
import _ from 'lodash';

export default function EventDetails(props) {
    const { auth, event } = props;
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Event #{event.id}</h2>}
        >
            <Head title={`Event #${event.id}`} />

            <div className="space-y-12 py-12">

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">

                        <EventSummary event={event} />

                    </div>
                </div>

                {event.menus?.length > 0 && _.map(event.menus, (menu, idx) => (
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6" key={idx}>
                        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">

                            <MenuSummary menu={menu} index={idx+1} />

                        </div>
                    </div>
                ))}

            </div>
        </AuthenticatedLayout>
    );
}
