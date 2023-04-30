import _ from "lodash";

export default function MenuSummary(props) {
    const { menu, index } = props;

    const courses = _.groupBy(menu.dishes, (dish) => dish.course);
    
    return (
        <section className="space-y-6">
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Menu #{index}</h2>
            </header>

            <h2 className="font-medium text-gray-800 dark:text-gray-300">{menu.response}</h2>

            {_.map(courses, (dishes, course) => {
                return (
                    <div className="space-y-6" key={course}>
                        <p className="text-lg font-medium text-gray-900 dark:text-gray-100 capitalize">{course}</p>
                        {dishes.map((dish) => (
                            <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-700 sm:rounded-lg" key={dish}>
                                <div className="flex flex-col space-y-2">
                                    <p className="text-gray-200 dark:text-gray-200"><strong>{dish.dishName}</strong></p>
                                    <p className="text-sm text-gray-200 dark:text-gray-200 ml-0">{dish.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            })}
            
        </section>
    );
}
