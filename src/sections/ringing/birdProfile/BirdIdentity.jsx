// bird identity
export function BirdIdentity({
    bird,
    onViewRecords,
}) {

    return (

        <section className="bird-profile-identity">

            <div className="bird-profile-kicker">
                INDIVIDUAL BIRD
            </div>


            <h2 className="bird-profile-id">
                {bird.id}
            </h2>


            <div className="bird-profile-species">
                SPOON-BILLED SANDPIPER
            </div>


            <div className="bird-profile-info">

                <div className="bird-profile-info-item">

                    <span>
                        SEX
                    </span>

                    <strong>
                        {bird.basicInfo.sex || "—"}
                    </strong>

                </div>


                <div className="bird-profile-info-item">

                    <span>
                        FIRST RECORDED
                    </span>

                    <strong>
                        {bird.basicInfo.date || "—"}
                    </strong>

                </div>


                <div className="bird-profile-info-item">

                    <span>
                        LOCATION
                    </span>

                    <strong>
                        {bird.basicInfo.location || "—"}
                    </strong>

                </div>

            </div>


            <div className="bird-profile-rings">

                <div className="bird-profile-section-label">
                    RINGING ID
                </div>


                <div className="bird-profile-ring-grid">

                    <div>

                        <span>
                            METAL RING
                        </span>

                        <strong>
                            {bird.identity.metalRing || "—"}
                        </strong>

                    </div>


                    <div>

                        <span>
                            LEFT
                        </span>

                        <strong>
                            {bird.identity.codesLeft || "—"}
                        </strong>

                    </div>


                    <div>

                        <span>
                            RIGHT
                        </span>

                        <strong>
                            {bird.identity.codesRight || "—"}
                        </strong>

                    </div>

                </div>

            </div>


            <button
                className="bird-profile-records-button"
                onClick={onViewRecords}
            >
                VIEW RECORDS
                <span>→</span>
            </button>

        </section>
    );
}