
export default function EventSummary(props) {
    const { event } = props;
    
    return (
        <section className="space-y-6">
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Event Details</h2>
            </header>

            <div className="max-w-xl">
                <div className='grid grid-cols-2 gap-5 font-medium text-gray-900 dark:text-gray-100'>
                    <p>Type:</p>
                    <p>{event.formatted_type}</p>
                    <p>Occasion:</p>
                    <p>{event.formatted_occasion}</p>
                    <p>Cuisines:</p>
                    <p>{event.formatted_cuisines}</p>
                    <p>Diets:</p>
                    <p>{event.formatted_diets}</p>
                    <p>Access Key:</p>
                    <p>{event.token?.name ?? 'GUI'}</p>
                </div>
            </div>
        </section>
    );
}
