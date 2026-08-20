import { BirdRecord } from "./BirdRecord";

// bird records
export function BirdRecords({
    bird,
    onBack,
}) {

    const sightings =
        bird.records?.sightings || [];

    const migration =
        bird.records?.migration || [];


    const records = [
        ...sightings,
        ...migration,
    ];


    return (

        <section className="bird-profile-records">

            <div className="bird-profile-records-header">

                <button
                    className="bird-profile-back"
                    onClick={onBack}
                >
                    ←
                </button>


                <div>

                    <div className="bird-profile-kicker">
                        RECORDS
                    </div>

                    <h2>
                        {bird.id}
                    </h2>

                </div>

            </div>


            <div className="bird-records-timeline">

                {records.map((record) => (

                    <BirdRecord
                        key={record.record}
                        record={record}
                    />

                ))}

            </div>

        </section>
    );
}