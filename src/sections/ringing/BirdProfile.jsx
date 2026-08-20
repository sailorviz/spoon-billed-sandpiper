// export default function BirdProfile({ bird, profileLevel, onClose, onViewRecords }) {

//     return (

//         <div className="bird-profile-overlay">

//             <div className="bird-profile">

//                 {/* Close */}

//                 <button
//                     className="bird-profile-close"
//                     onClick={onClose}
//                 >
//                     ×
//                 </button>


//                 {/* Identity */}

//                 <section className="bird-profile-identity">

//                     <div className="bird-profile-kicker">
//                         INDIVIDUAL BIRD
//                     </div>


//                     <h2 className="bird-profile-id">
//                         {bird.id}
//                     </h2>


//                     <div className="bird-profile-species">
//                         SPOON-BILLED SANDPIPER
//                     </div>


//                     <div className="bird-profile-info">

//                         <div className="bird-profile-info-item">

//                             <span>
//                                 SEX
//                             </span>

//                             <strong>
//                                 {bird.basicInfo.sex || "—"}
//                             </strong>

//                         </div>


//                         <div className="bird-profile-info-item">

//                             <span>
//                                 FIRST RECORDED
//                             </span>

//                             <strong>
//                                 {bird.basicInfo.date || "—"}
//                             </strong>

//                         </div>


//                         <div className="bird-profile-info-item">

//                             <span>
//                                 LOCATION
//                             </span>

//                             <strong>
//                                 {bird.basicInfo.location || "—"}
//                             </strong>

//                         </div>

//                     </div>


//                     {/* Ringing identity */}

//                     <div className="bird-profile-rings">

//                         <div className="bird-profile-section-label">
//                             RINGING ID
//                         </div>


//                         <div className="bird-profile-ring-grid">

//                             <div>

//                                 <span>
//                                     METAL RING
//                                 </span>

//                                 <strong>
//                                     {bird.identity.metalRing || "—"}
//                                 </strong>

//                             </div>


//                             <div>

//                                 <span>
//                                     LEFT
//                                 </span>

//                                 <strong>
//                                     {bird.identity.codesLeft || "—"}
//                                 </strong>

//                             </div>


//                             <div>

//                                 <span>
//                                     RIGHT
//                                 </span>

//                                 <strong>
//                                     {bird.identity.codesRight || "—"}
//                                 </strong>

//                             </div>

//                         </div>

//                     </div>


//                     {/* Continue */}

//                     <button
//                         className="bird-profile-records-button"
//                         onClick={onViewRecords}
//                     >
//                         VIEW RECORDS
//                         <span>→</span>
//                     </button>

//                 </section>

//             </div>

//         </div>
//     );
// }

import { BirdIdentity } from "./birdProfile/BirdIdentity";
import { BirdRecords } from "./birdProfile/BirdRecords";


export default function BirdProfile({
    bird,
    profileLevel,
    onClose,
    onBack,
    onViewRecords,
}) {

    return (

        <div className="bird-profile-overlay">

            <div className="bird-profile">

                <button
                    className="bird-profile-close"
                    onClick={onClose}
                >
                    ×
                </button>


                {profileLevel === "identity" && (

                    <BirdIdentity
                        bird={bird}
                        onViewRecords={onViewRecords}
                    />

                )}


                {profileLevel === "records" && (

                    <BirdRecords
                        bird={bird}
                        onBack={onBack}
                    />

                )}

            </div>

        </div>
    );
}




